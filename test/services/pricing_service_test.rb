require "test_helper"

class PricingServiceTest < ActiveSupport::TestCase
  setup do
    @tenant = tenants(:one)
    MultiTenant.current_tenant = @tenant

    @feature = Feature.create!(
      name: "User Authentication",
      description: "Secure user authentication system",
      base_cost: 2000,
      complexity_level: 2,
      category: "security"
    )

    @quote_request = QuoteRequest.create!(
      project_name: "Test Project",
      project_description: "A test project for pricing",
      use_case: "web_app",
      email: "test@example.com",
      selected_features: [ @feature ],
      tenant: @tenant
    )
    @pricing_service = PricingService.new(@quote_request)
  end

  teardown do
    if @quote_request && @quote_request.persisted?
      @quote_request.destroy
    end
    if @feature && @feature.persisted?
      @feature.destroy
    end
  end

  test "should calculate price successfully" do
    assert_nothing_raised do
      @pricing_service.calculate_price
    end

    @quote_request.reload
    assert_not_nil @quote_request.estimated_cost
    assert_not_nil @quote_request.monthly_retainer
    assert_not_nil @quote_request.deposit_amount
  end

  test "should include stripe product recommendations" do
    @pricing_service.calculate_price
    @quote_request.reload

    ai_pricing = @quote_request.ai_pricing_json
    assert_not_nil ai_pricing
    assert_not_nil ai_pricing["stripe_product_recommendations"]

    recommendations = ai_pricing["stripe_product_recommendations"]
    assert_kind_of Array, recommendations

    # Should always include maintenance retainer and devops starter
    maintenance_retainer = recommendations.find { |r| r["product_id"] == "maintenance_retainer" }
    devops_starter = recommendations.find { |r| r["product_id"] == "managed_devops_starter" }

    assert_not_nil maintenance_retainer
    assert_not_nil devops_starter
    assert maintenance_retainer["recommended"]
    assert devops_starter["recommended"]
  end

  test "should fetch stripe products for AI analysis" do
    # Skip this test if Stripe is not configured
    skip "Stripe not configured" unless ENV["STRIPE_API_KEY"].present?

    products = @pricing_service.send(:fetch_stripe_products_for_ai)
    assert_kind_of Array, products

    # If products exist, they should have the expected structure
    if products.any?
      product = products.first
      assert product.key?(:id)
      assert product.key?(:name)
      assert product.key?(:description)
      assert product.key?(:prices)
      assert_kind_of Array, product[:prices]
    end
  end

  test "should build product recommendation prompt" do
    # Create a mock feature using a simple struct
    MockFeature = Struct.new(:name, :description)
    feature = MockFeature.new("User Authentication", "Secure user authentication system")
    features = [ feature ]
    use_case = "web_app"
    estimated_cost = 15000

    stripe_products = [
      {
        id: "test_product_1",
        name: "Test Managed Service",
        description: "A test managed service",
        prices: [
          { id: "price_1", amount: 500, currency: "usd", interval: "month", tier: "starter" }
        ]
      }
    ]

    prompt = @pricing_service.send(:build_product_recommendation_prompt, features, use_case, estimated_cost, stripe_products)

    assert_not_nil prompt
    assert_includes prompt, use_case
    assert_includes prompt, estimated_cost.to_s
    assert_includes prompt, "Test Managed Service"
    assert_includes prompt, "User Authentication"
  end
end
