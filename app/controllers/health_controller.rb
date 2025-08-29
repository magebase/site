class HealthController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    # Basic health check
    database_status = check_database
    redis_status = check_redis

    status = :ok
    checks = {
      status: 'healthy',
      timestamp: Time.current.iso8601,
      services: {
        database: database_status,
        redis: redis_status,
        application: 'healthy'
      }
    }

    # If any service is unhealthy, return error status
    if database_status == 'unhealthy' || redis_status == 'unhealthy'
      status = :service_unavailable
      checks[:status] = 'unhealthy'
    end

    render json: checks, status: status
  end

  private

  def check_database
    begin
      # Simple database connectivity check
      ActiveRecord::Base.connection.execute('SELECT 1')
      'healthy'
    rescue StandardError => e
      Rails.logger.error("Database health check failed: #{e.message}")
      'unhealthy'
    end
  end

  def check_redis
    begin
      # Simple Redis connectivity check
      redis = Redis.new(url: ENV.fetch('CACHE_DATABASE_URL', 'redis://localhost:6379/0'))
      redis.ping
      'healthy'
    rescue StandardError => e
      Rails.logger.error("Redis health check failed: #{e.message}")
      'unhealthy'
    end
  end
end
