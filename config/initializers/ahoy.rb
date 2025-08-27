class Ahoy::Store < Ahoy::DatabaseStore
end

# set to true for JavaScript tracking
Ahoy.api = false

# better user agent parsing
Ahoy.user_agent_parser = :device_detector

# GDPR compliance
Ahoy.mask_ips = true

# Track bot traffic
Ahoy.track_bots = true
