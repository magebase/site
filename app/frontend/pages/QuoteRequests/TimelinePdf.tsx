import { Head } from '@inertiajs/react';
import { usePDF } from '@react-pdf/renderer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, ArrowLeft } from 'lucide-react';
import { Link } from '@inertiajs/react';
import TimelinePDF from '@/components/TimelinePDF';
import { useEffect } from 'react';

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
    base_cost: number;
  }>;
  project_milestones: Array<{
    id: number;
    name: string;
    description: string;
    due_date: string;
    status: string;
    milestone_data?: {
      duration_weeks?: number;
      deliverables?: string[];
      order?: number;
    };
  }>;
}

interface Props {
  quote_request: QuoteRequest;
}

export default function TimelinePdf({ quote_request }: Props) {
  const [instance, updateInstance] = usePDF({
    document: <TimelinePDF quoteRequest={quote_request} />,
  });

  useEffect(() => {
    // Trigger download automatically when PDF is ready
    if (instance.url && !instance.loading && !instance.error) {
      const link = document.createElement('a');
      link.href = instance.url;
      link.download = `${quote_request.project_name.replace(
        /\s+/g,
        '_'
      )}_timeline.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, [
    instance.url,
    instance.loading,
    instance.error,
    quote_request.project_name,
  ]);

  const handleDownload = () => {
    if (instance.url) {
      const link = document.createElement('a');
      link.href = instance.url;
      link.download = `${quote_request.project_name.replace(
        /\s+/g,
        '_'
      )}_timeline.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <>
      <Head title={`Timeline PDF - ${quote_request.project_name}`} />

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {quote_request.project_name}
            </h1>
            <p className="text-gray-600 mt-2">Timeline PDF Generation</p>
          </div>
          <div className="flex gap-2">
            <Link href={`/quote_requests/${quote_request.id}`}>
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Quote
              </Button>
            </Link>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>PDF Generation Status</CardTitle>
          </CardHeader>
          <CardContent>
            {instance.loading && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Generating PDF...</p>
              </div>
            )}

            {instance.error && (
              <div className="text-center py-8">
                <p className="text-red-600 mb-4">
                  Error generating PDF: {instance.error}
                </p>
                <Button
                  onClick={() =>
                    updateInstance(<TimelinePDF quoteRequest={quote_request} />)
                  }
                >
                  Try Again
                </Button>
              </div>
            )}

            {instance.url && !instance.loading && !instance.error && (
              <div className="text-center py-8">
                <div className="text-green-600 mb-4">
                  <svg
                    className="w-16 h-16 mx-auto mb-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-lg font-semibold">
                    PDF Generated Successfully!
                  </p>
                </div>
                <p className="text-gray-600 mb-6">
                  Your timeline PDF has been generated and should download
                  automatically. If it doesn't download, click the button below.
                </p>
                <Button
                  onClick={handleDownload}
                  className="bg-blue-600 hover:bg-blue-700"
                  size="lg"
                >
                  <Download className="h-5 w-5 mr-2" />
                  Download PDF
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
