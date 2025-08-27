# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

# Create sample blog posts
blog_posts = [
  {
    title: "The Ultimate Guide to Generator Hire for Construction Sites",
    content: "<h2>Why Construction Sites Need Reliable Power</h2><p>Construction sites require consistent, reliable power for tools, lighting, and equipment. Without proper generator hire, projects can face costly delays and safety issues.</p><h2>Choosing the Right Generator Size</h2><p>The size of your generator depends on your power requirements. Our team helps you calculate the exact kVA needed for your specific equipment.</p><h2>Benefits of Professional Generator Hire</h2><ul><li>24/7 maintenance and support</li><li>Fuel delivery service</li><li>Emergency response team</li><li>Competitive pricing</li></ul>",
    excerpt: "Learn everything you need to know about hiring generators for construction sites, from sizing to maintenance.",
    published: true,
    author_name: "Sarah Mitchell",
    author_title: "Senior Generator Specialist",
    author_profile_picture: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  },
  {
    title: "Emergency Power Solutions: Be Prepared for Power Outages",
    content: "<h2>Common Causes of Power Outages</h2><p>Power outages can occur due to storms, equipment failure, or planned maintenance. Being prepared ensures your business continues operating smoothly.</p><h2>Types of Emergency Generators</h2><p>We offer portable, standby, and mobile generators to suit different emergency scenarios and power requirements.</p><h2>Why Choose Our Emergency Services</h2><p>Our emergency response team is available 24/7, with generators delivered within 1 hour of your call.</p>",
    excerpt: "Discover how to protect your business from power outages with our comprehensive emergency generator solutions.",
    published: true,
    author_name: "Mike Johnson",
    author_title: "Emergency Response Manager",
    author_profile_picture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    title: "Generator Maintenance: Keep Your Equipment Running Smoothly",
    content: "<h2>Importance of Regular Maintenance</h2><p>Regular generator maintenance prevents breakdowns and extends equipment lifespan. Our certified technicians perform comprehensive inspections.</p><h2>Maintenance Checklist</h2><ul><li>Oil and filter changes</li><li>Fuel system cleaning</li><li>Battery testing</li><li>Load bank testing</li><li>Control panel inspection</li></ul><h2>Scheduled Maintenance Plans</h2><p>We offer flexible maintenance plans tailored to your usage patterns and requirements.</p>",
    excerpt: "Learn about the importance of generator maintenance and how our service keeps your equipment in top condition.",
    published: true,
    author_name: "David Chen",
    author_title: "Lead Technician",
    author_profile_picture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  }
]

# Create blog posts
blog_posts.each do |post_data|
  BlogPost.find_or_create_by!(title: post_data[:title]) do |post|
    post.content = post_data[:content]
    post.excerpt = post_data[:excerpt]
    post.published = post_data[:published]
    post.author_name = post_data[:author_name]
    post.author_title = post_data[:author_title]
    post.author_profile_picture = post_data[:author_profile_picture]
  end
end

blog_posts.each do |post_data|
  BlogPost.find_or_create_by!(title: post_data[:title]) do |post|
    post.content = post_data[:content]
    post.excerpt = post_data[:excerpt]
    post.published = post_data[:published]
    post.published_at = Time.current if post_data[:published]
  end
end

puts "Created #{blog_posts.size} sample blog posts"
