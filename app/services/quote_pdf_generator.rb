# frozen_string_literal: true

require 'prawn'
require 'prawn/table'

class QuotePdfGenerator
  include Prawn::View

  def initialize(quote_request)
    @quote_request = quote_request
    @client = quote_request.client
    setup_document
  end

  def generate
    render_header
    render_project_summary
    render_selected_features
    render_timeline_and_cost
    render_terms_and_conditions
    render_footer

    self
  end

  private

  def setup_document
    @document = Prawn::Document.new(
      page_size: 'A4',
      margin: [50, 50, 50, 50],
      info: {
        Title: "Project Scope - #{@quote_request.project_name}",
        Author: 'Magebase',
        Subject: 'Project Quote and Scope Document',
        Creator: 'Magebase Quote System'
      }
    )
  end

  def render_header
    # Company logo/header
    bounding_box([0, cursor], width: 500, height: 80) do
      text 'Magebase', size: 24, style: :bold, color: '2563eb'
      move_down 5
      text 'Custom Software Development', size: 12, color: '666666'
      text 'Wyoming LLC • Professional Ruby on Rails Development', size: 10, color: '666666'
    end

    # Quote details
    bounding_box([300, cursor + 80], width: 250, height: 80) do
      text 'SCOPE DOCUMENT', size: 14, style: :bold, color: '2563eb'
      move_down 10
      text "Quote ID: QR-#{@quote_request.id.to_s.rjust(4, '0')}", size: 10
      text "Date: #{Time.current.strftime('%B %d, %Y')}", size: 10
      text "Valid Until: #{30.days.from_now.strftime('%B %d, %Y')}", size: 10
    end

    move_down 30
  end

  def render_project_summary
    text 'PROJECT SUMMARY', size: 16, style: :bold, color: '2563eb'
    move_down 10

    # Client information
    if @client
      table_data = [
        ['Client Name:', @client.company_name || @client.contact_name || 'N/A'],
        ['Contact Email:', @client.email],
        ['Phone:', @client.phone || 'N/A']
      ]

      table(table_data, width: 500, cell_style: { borders: [], padding: [5, 10] }) do
        cells.style do |cell|
          cell.border_width = 0
          cell.font_style = :bold if cell.column == 0
        end
      end
    end

    move_down 20

    # Project details
    table_data = [
      ['Project Name:', @quote_request.project_name],
      ['Project Description:', @quote_request.project_description],
      ['Use Case:', @quote_request.use_case],
      ['Selected Features:', @quote_request.selected_features.count.to_s]
    ]

    table(table_data, width: 500, cell_style: { borders: [], padding: [5, 10] }) do
      cells.style do |cell|
        cell.border_width = 0
        cell.font_style = :bold if cell.column == 0
      end
    end

    move_down 30
  end

  def render_selected_features
    text 'SELECTED FEATURES & SCOPE', size: 16, style: :bold, color: '2563eb'
    move_down 10

    features_data = @quote_request.selected_features.map do |feature|
      [
        feature.name,
        feature.description.truncate(100),
        feature.category.titleize,
        feature.complexity_level.to_s
      ]
    end

    if features_data.any?
      table(
        [['Feature', 'Description', 'Category', 'Complexity']] + features_data,
        header: true,
        width: 500,
        cell_style: { padding: [8, 10], size: 9 }
      ) do
        row(0).style(
          background_color: '2563eb',
          text_color: 'ffffff',
          font_style: :bold
        )
      end
    end

    move_down 30
  end

  def render_timeline_and_cost
    text 'TIMELINE & COST ESTIMATION', size: 16, style: :bold, color: '2563eb'
    move_down 10

    # Timeline information
    timeline_data = [
      ['Estimated Timeline:', "#{@quote_request.ai_pricing_data&.dig('timeline_days') || 30} working days"],
      ['Project Start:', 'Within 5 business days of deposit'],
      ['Milestone Deliveries:', 'Bi-weekly progress updates'],
      ['Final Delivery:', 'Complete project delivery with documentation']
    ]

    table(timeline_data, width: 500, cell_style: { borders: [], padding: [5, 10] }) do
      cells.style do |cell|
        cell.border_width = 0
        cell.font_style = :bold if cell.column == 0
      end
    end

    move_down 20

    # Cost breakdown
    cost_data = [
      ['Development Cost:', "$#{@quote_request.estimated_cost&.to_i || 15000}"],
      ['Monthly Retainer:', "$#{@quote_request.monthly_retainer&.to_i || 500}"],
      ['Deposit Required:', "$#{(@quote_request.estimated_cost&.to_f * 0.3)&.to_i || 4500}"],
      ['Payment Terms:', '50% milestone, 50% completion']
    ]

    table(cost_data, width: 500, cell_style: { borders: [], padding: [5, 10] }) do
      cells.style do |cell|
        cell.border_width = 0
        cell.font_style = :bold if cell.column == 0
      end
    end

    move_down 30
  end

  def render_terms_and_conditions
    text 'TERMS & CONDITIONS', size: 16, style: :bold, color: '2563eb'
    move_down 10

    terms = [
      "• This quote is valid for 30 days from the date of issuance",
      "• All work is governed by Wyoming jurisdiction and law",
      "• 30% deposit required to commence work",
      "• Payment terms: 50% upon completion of major milestones, 50% upon final delivery",
      "• Timeline begins after deposit receipt and requirements finalization",
      "• Changes to scope may affect timeline and cost",
      "• Client retains rights to final deliverables upon full payment",
      "• Magebase retains rights to use project in portfolio (with client permission)",
      "• All intellectual property rights transfer to client upon full payment"
    ]

    terms.each do |term|
      text term, size: 9, leading: 3
    end

    move_down 30
  end

  def render_footer
    # Footer with contact information
    bounding_box([0, 50], width: 500, height: 40) do
      stroke_horizontal_rule
      move_down 10

      text 'Magebase LLC', size: 8, align: :center, color: '666666'
      text 'Wyoming-based Software Development • www.magebase.site', size: 8, align: :center, color: '666666'
      text 'Contact: hello@magebase.site • Phone: +61 412 345 678', size: 8, align: :center, color: '666666'
    end
  end
end
