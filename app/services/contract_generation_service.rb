class ContractGenerationService
  def initialize(quote_request)
    @quote_request = quote_request
  end

  def generate_contract
    # Get AI-generated contract terms
    ai_contract_terms = get_ai_contract_terms

    contract_data = {
      title: "#{@quote_request.project_name} Development Contract",
      client_id: @quote_request.client_id,
      quote_request_id: @quote_request.id,
      total_amount: @quote_request.estimated_cost,
      deposit_amount: @quote_request.deposit_amount,
      monthly_retainer: @quote_request.monthly_retainer,
      contract_terms: ai_contract_terms.present? ? ai_contract_terms : generate_contract_terms,
      deliverables: @quote_request.project_plan_json["deliverables"] || [],
      timeline_months: @quote_request.project_plan_json["timeline_months"] || 3,
      payment_schedule: generate_payment_schedule,
      status: "draft",
      ai_generated: ai_contract_terms.present?
    }

    contract = Contract.create!(contract_data)

    # Create initial payment record for deposit
    Payment.create!(
      contract_id: contract.id,
      amount: @quote_request.deposit_amount,
      payment_type: "deposit",
      status: "pending",
      due_date: Date.today + 7.days
    )

    contract
  end

  private

  def generate_contract_terms
    terms = []

    terms << {
      section: "Project Scope",
      content: "The Contractor agrees to develop #{@quote_request.project_name} as described in the project specifications. This includes the following features: #{format_features}."
    }

    terms << {
      section: "Timeline",
      content: "The project will be completed within #{@quote_request.project_plan_json['timeline_months'] || 3} months from the contract signing date, following the agreed-upon milestones."
    }

    terms << {
      section: "Payment Terms",
      content: "Client agrees to pay a deposit of $#{format_currency(@quote_request.deposit_amount)} upon contract signing. The remaining balance will be paid according to the payment schedule outlined below."
    }

    terms << {
      section: "Intellectual Property",
      content: "Upon full payment, all intellectual property rights for the developed software will be transferred to the Client."
    }

    terms << {
      section: "Warranty",
      content: "The Contractor warrants that the software will be free from defects for 90 days after delivery. Any bugs discovered during this period will be fixed at no additional cost."
    }

    terms << {
      section: "Confidentiality",
      content: "Both parties agree to maintain confidentiality of proprietary information shared during the project."
    }

    terms << {
      section: "Termination",
      content: "Either party may terminate this contract with 30 days written notice. Client will be responsible for payment of work completed up to the termination date."
    }

    terms
  end

  def generate_payment_schedule
    schedule = []

    # Deposit payment
    schedule << {
      milestone: "Contract Signing",
      amount: @quote_request.deposit_amount,
      percentage: ((@quote_request.deposit_amount / @quote_request.estimated_cost) * 100).round(1),
      due_date: Date.today + 7.days,
      description: "Initial deposit to begin project work"
    }

    # Milestone payments
    remaining_amount = @quote_request.estimated_cost - @quote_request.deposit_amount
    milestones = @quote_request.project_milestones.order(:order)

    if milestones.any?
      milestone_payment = remaining_amount / milestones.count

      milestones.each_with_index do |milestone, index|
        schedule << {
          milestone: milestone.name,
          amount: milestone_payment,
          percentage: ((milestone_payment / @quote_request.estimated_cost) * 100).round(1),
          due_date: Date.today + ((index + 1) * 2).weeks,
          description: "Payment upon completion of #{milestone.name.downcase}"
        }
      end
    else
      # Default payment schedule if no milestones
      half_payment = remaining_amount / 2

      schedule << {
        milestone: "Mid-Project",
        amount: half_payment,
        percentage: 50,
        due_date: Date.today + 4.weeks,
        description: "Payment at project midpoint"
      }

      schedule << {
        milestone: "Project Completion",
        amount: half_payment,
        percentage: 50,
        due_date: Date.today + 8.weeks,
        description: "Final payment upon project completion"
      }
    end

    schedule
  end

  def format_features
    features = @quote_request.selected_features
    if features.any?
      features.map(&:name).map { |name| name.humanize.downcase }.join(", ")
    else
      "custom software development services"
    end
  end

  def format_currency(amount)
    ActionController::Base.helpers.number_to_currency(amount, precision: 0)
  end

  private

  def get_ai_contract_terms
    return nil unless ENV["GOOGLE_STUDIO_API_KEY"].present? || ENV["OPENAI_API_KEY"].present? || ENV["ANTHROPIC_API_KEY"].present?

    begin
      llm_service = LlmService.new
      llm_service.generate_contract_terms(@quote_request)
    rescue => e
      Rails.logger.error("AI contract generation failed: #{e.message}")
      nil
    end
  end
end
