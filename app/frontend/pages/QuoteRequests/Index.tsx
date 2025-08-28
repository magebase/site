import { Head, Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface QuoteRequest {
  id: number;
  project_name: string;
  project_description: string;
  use_case: string;
  estimated_cost: number;
  status: string;
  created_at: string;
  client: {
    company_name: string;
    contact_name: string;
    email: string;
  };
}

interface Props {
  quote_requests: QuoteRequest[];
}

export default function Index({ quote_requests }: Props) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "bg-gray-500";
      case "quoted":
        return "bg-blue-500";
      case "contracted":
        return "bg-green-500";
      case "deposit_paid":
        return "bg-yellow-500";
      case "in_development":
        return "bg-purple-500";
      case "completed":
        return "bg-green-600";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <>
      <Head title="Quote Requests" />

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Quote Requests</h1>
            <p className="text-gray-600 mt-2">
              Manage your project quotes and proposals
            </p>
          </div>
          <Link href="/quote_requests/new">
            <Button className="bg-blue-600 hover:bg-blue-700">
              New Quote Request
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {quote_requests.map((quote) => (
            <Card key={quote.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">
                    {quote.project_name}
                  </CardTitle>
                  <Badge
                    className={`${getStatusColor(quote.status)} text-white`}
                  >
                    {quote.status.replace("_", " ")}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">
                  {quote.client.company_name}
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 mb-4 line-clamp-3">
                  {quote.project_description}
                </p>
                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                  <span>{quote.use_case}</span>
                  <span>
                    ${quote.estimated_cost?.toLocaleString() || "TBD"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">
                    {format(new Date(quote.created_at), "MMM dd, yyyy")}
                  </span>
                  <Link href={`/quote_requests/${quote.id}`}>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {quote_requests.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No quote requests yet</p>
            <Link href="/quote_requests/new">
              <Button className="mt-4 bg-blue-600 hover:bg-blue-700">
                Create Your First Quote Request
              </Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
