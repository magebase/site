interface TimelineItem {
  day: number;
  scope: string;
  deliverables: string[];
}

interface QuoteRequest {
  id: number;
  project_name: string;
  project_description: string;
  use_case: string;
  estimated_cost: number;
  monthly_retainer: number;
  deposit_amount: number;
  status: string;
  created_at: string;
  project_plan_json: {
    timeline?: TimelineItem[];
  };
  client: {
    company_name: string;
    contact_name: string;
    email: string;
    phone: string;
  };
  selected_features: Array<{
    id: number;
    name: string;
    description: string;
    category: string;
  }>;
}

export const generateTimelineCSV = (quote_request: QuoteRequest): string => {
  const timeline = quote_request.project_plan_json?.timeline || [];

  // CSV Header
  const headers = [
    'Project Name',
    'Client Company',
    'Client Contact',
    'Client Email',
    'Day',
    'Scope',
    'Deliverables',
    'Estimated Cost',
    'Monthly Retainer',
    'Deposit Amount',
    'Status',
    'Created Date',
  ];

  // CSV Rows
  const rows = timeline.map(item => [
    quote_request.project_name,
    quote_request.client.company_name,
    quote_request.client.contact_name,
    quote_request.client.email,
    item.day.toString(),
    `"${item.scope.replace(/"/g, '""')}"`, // Escape quotes in CSV
    `"${item.deliverables.map(d => d.replace(/"/g, '""')).join('; ')}"`, // Join deliverables with semicolon
    quote_request.estimated_cost?.toString() || '',
    quote_request.monthly_retainer?.toString() || '',
    quote_request.deposit_amount?.toString() || '',
    quote_request.status,
    quote_request.created_at,
  ]);

  // Combine headers and rows
  const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');

  return csvContent;
};

export const downloadCSV = (quote_request: QuoteRequest): void => {
  const csvContent = generateTimelineCSV(quote_request);
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');

  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute(
      'download',
      `${quote_request.project_name.replace(/\s+/g, '_')}_timeline.csv`
    );
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export const generateProjectSummaryCSV = (
  quote_request: QuoteRequest
): string => {
  const headers = [
    'Project Name',
    'Description',
    'Use Case',
    'Client Company',
    'Client Contact',
    'Client Email',
    'Client Phone',
    'Estimated Cost',
    'Monthly Retainer',
    'Deposit Amount',
    'Status',
    'Total Days',
    'Selected Features',
    'Created Date',
  ];

  const featuresList = quote_request.selected_features
    .map(feature => {
      const displayName =
        feature.name === '5_high_converting_seo_marketing_pages'
          ? '5 High Converting, SEO Optimized Marketing Pages'
          : feature.name
              .replace(/_/g, ' ')
              .replace(/\b\w/g, l => l.toUpperCase());
      return `${displayName} (${feature.category})`;
    })
    .join('; ');

  const timeline = quote_request.project_plan_json?.timeline || [];

  const row = [
    quote_request.project_name,
    `"${quote_request.project_description.replace(/"/g, '""')}"`,
    quote_request.use_case,
    quote_request.client.company_name,
    quote_request.client.contact_name,
    quote_request.client.email,
    quote_request.client.phone || '',
    quote_request.estimated_cost?.toString() || '',
    quote_request.monthly_retainer?.toString() || '',
    quote_request.deposit_amount?.toString() || '',
    quote_request.status,
    timeline.length.toString(),
    `"${featuresList.replace(/"/g, '""')}"`,
    quote_request.created_at,
  ];

  const csvContent = [headers, row].map(row => row.join(',')).join('\n');

  return csvContent;
};

export const downloadProjectSummaryCSV = (
  quote_request: QuoteRequest
): void => {
  const csvContent = generateProjectSummaryCSV(quote_request);
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');

  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute(
      'download',
      `${quote_request.project_name.replace(/\s+/g, '_')}_summary.csv`
    );
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
