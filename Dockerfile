# syntax=docker/dockerfile:1
# check=error=true

# This Dockerfile is designed for production, not development. Use with Kamal or build'n'run by hand:
# docker build -t genfix_2 .
# docker run -d -p 80:80 -e RAILS_MASTER_KEY=<value from config/master.key> --name genfix_2 genfix_2

# For a containerized dev environment, see Dev Containers: https://guides.rubyonrails.org/getting_started_with_devcontainer.html

# Make sure RUBY_VERSION matches the Ruby version in .ruby-version
ARG RUBY_VERSION=3.4.5
FROM docker.io/library/ruby:$RUBY_VERSION-slim AS base

# Rails app lives here
WORKDIR /rails

# Install base packages with security updates in a single layer
RUN apt-get update -qq && \
    apt-get upgrade -y && \
    apt-get install --no-install-recommends -y \
        curl \
        libjemalloc2 \
        libvips \
        postgresql-client \
        ca-certificates \
        && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# Install JavaScript dependencies
ARG NODE_VERSION=22.14.0
ENV PATH=/usr/local/node/bin:$PATH
RUN curl -sL https://github.com/nodenv/node-build/archive/master.tar.gz | tar xz -C /tmp/ && \
    /tmp/node-build-master/bin/node-build "${NODE_VERSION}" /usr/local/node && \
    rm -rf /tmp/node-build-master

# Set production environment
ENV RAILS_ENV="production" \
    BUNDLE_DEPLOYMENT="1" \
    BUNDLE_PATH="/usr/local/bundle" \
    BUNDLE_WITHOUT="development"

# Throw-away build stage to reduce size of final image
FROM base AS build

# Install packages needed to build gems and clean up in single layer
RUN apt-get update -qq && \
    apt-get upgrade -y && \
    apt-get install --no-install-recommends -y \
        build-essential \
        git \
        libpq-dev \
        libyaml-dev \
        pkg-config \
        imagemagick \
        libmagickcore-dev \
        libmagickwand-dev \
        && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# Copy dependency files first for better caching
COPY Gemfile Gemfile.lock ./

# Install application gems and clean up caches
RUN bundle install && \
    rm -rf ~/.bundle/ "${BUNDLE_PATH}"/ruby/*/cache "${BUNDLE_PATH}"/ruby/*/bundler/gems/*/.git && \
    bundle exec bootsnap precompile --gemfile

# Copy package files and install node modules
COPY package.json package-lock.json ./
RUN npm install --production && \
    npm cache clean --force && \
    rm -rf ~/.npm

# Copy application code
COPY . .

# Ensure bin files are executable and clean up
RUN chmod +x bin/* && \
    bundle install && \
    rm -rf ~/.bundle/ "${BUNDLE_PATH}"/ruby/*/cache "${BUNDLE_PATH}"/ruby/*/bundler/gems/*/.git

# Precompile bootsnap code for faster boot times
RUN bundle exec bootsnap precompile app/ lib/

# Precompiling assets for production without requiring secret RAILS_MASTER_KEY
RUN SECRET_KEY_BASE_DUMMY=1 RAILS_MASTER_KEY=dummy_key_for_build RAILS_ENV=production bundle exec rails assets:precompile

# Prepare database after assets are compiled (when Rails is fully set up)
RUN SECRET_KEY_BASE_DUMMY=1 RAILS_MASTER_KEY=dummy_key_for_build RAILS_ENV=production bundle exec rails db:prepare || echo "Database preparation deferred to runtime"

# Clean up build artifacts to reduce image size
RUN rm -rf /tmp/* /var/tmp/* && \
    find /usr/local/bundle -name "*.gem" -delete && \
    find /usr/local/bundle -name "*.o" -delete && \
    find /usr/local/bundle -name "*.c" -delete

# Final stage for app image
FROM base

# Install minimal runtime packages and clean up
RUN apt-get update -qq && \
    apt-get upgrade -y && \
    apt-get install --no-install-recommends -y \
        imagemagick \
        && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# Create rails user and set permissions
RUN groupadd --system --gid 1000 rails && \
    useradd rails --uid 1000 --gid 1000 --create-home --shell /bin/bash && \
    mkdir -p db log storage tmp && \
    chown -R rails:rails db log storage tmp
USER 1000:1000

# Copy built artifacts: gems, application
COPY --from=build --chown=rails:rails "${BUNDLE_PATH}" "${BUNDLE_PATH}"
COPY --from=build --chown=rails:rails /rails /rails

# Entrypoint prepares the database.
ENTRYPOINT ["/rails/bin/docker-entrypoint"]

# Start server via Thruster by default, this can be overwritten at runtime
EXPOSE 80
CMD ["./bin/thrust", "./bin/rails", "server"]
