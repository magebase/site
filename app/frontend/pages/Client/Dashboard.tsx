import { Head } from '@inertiajs/react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import {
  FileText,
  Download,
  Share2,
  Calendar,
  DollarSign,
  Clock,
  ExternalLink,
} from 'lucide-react';

interface ClientDashboardProps {
  quoteRequests: Array<{
    id: number;
    project_name: string;
    status: string;
    estimated_cost: number;
    monthly_retainer: number;
    deposit_amount: number;
    created_at: string;
    client: {
      company_name: string;
      contact_name: string;
      email: string;
    };
    selected_features: Array<{
      name: string;
    }>;
    project_milestones: Array<{
      title: string;
      due_date: string;
    }>;
    tenant?: {
      name: string;
      subdomain: string;
    };
  }>;
  tenant?: {
    name: string;
    subdomain: string;
  };
  currentUser: {
    name: string;
    email: string;
  };
}

export default function ClientDashboard({
  quoteRequests,
  tenant,
  currentUser,
}: ClientDashboardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'quoted':
        return 'bg-green-100 text-green-800';
      case 'contracted':
        return 'bg-blue-100 text-blue-800';
      case 'deposit_paid':
        return 'bg-purple-100 text-purple-800';
      case 'in_development':
        return 'bg-orange-100 text-orange-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const generateShareableLink = (quoteRequestId: number) => {
    return `${window.location.origin}/quote_requests/${quoteRequestId}`;
  };

  const downloadQuotePdf = (quoteRequestId: number) => {
    window.open(`/quote_requests/${quoteRequestId}/generate_pdf`, '_blank');
  };

  const downloadTimelinePdf = (quoteRequestId: number) => {
    window.open(`/quote_requests/${quoteRequestId}/timeline_pdf`, '_blank');
  };

  return (
    <>
      <Head title="Client Dashboard" />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {currentUser.name}
            </h1>
            <p className="text-gray-600 mt-2">
              Manage your project quotes and documentation
            </p>
          </div>

          {/* Tenant Access Card */}
          {tenant && (
            <Card className="mb-8 border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-900">
                  <ExternalLink className="h-5 w-5" />
                  Access Your Project Dashboard
                </CardTitle>
                <CardDescription>
                  You have full access to your project management dashboard
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild>
                  <a
                    href={`https://${tenant.subdomain}.magebase.site/dashboard`}
                    target="_blank"
                  >
                    Open {tenant.name} Dashboard
                  </a>
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Quote Requests */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Your Project Quotes
            </h2>

            {quoteRequests.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No quotes available yet</p>
                  <p className="text-sm text-gray-500">
                    Your project quotes will appear here once they're ready
                  </p>
                </CardContent>
              </Card>
            ) : (
              quoteRequests.map(quote => (
                <Card
                  key={quote.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl">
                          {quote.project_name}
                        </CardTitle>
                        <CardDescription>
                          {quote.client.company_name ||
                            quote.client.contact_name}{' '}
                          • {quote.client.email}
                        </CardDescription>
                      </div>
                      <Badge className={getStatusColor(quote.status)}>
                        {quote.status.replace('_', ' ')}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Total Cost</p>
                          <p className="font-semibold">
                            {formatCurrency(quote.estimated_cost)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Deposit</p>
                          <p className="font-semibold">
                            {formatCurrency(quote.deposit_amount)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <div>
                          <p className="text-sm text-gray-500">Created</p>
                          <p className="font-semibold">
                            {new Date(quote.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    {quote.selected_features &&
                      quote.selected_features.length > 0 && (
                        <div className="mb-4">
                          <p className="text-sm font-medium text-gray-700 mb-2">
                            Selected Features:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {quote.selected_features
                              .slice(0, 5)
                              .map((feature, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {feature.name ===
                                  '5_high_converting_seo_marketing_pages'
                                    ? '5 High Converting, SEO Optimized Marketing Pages'
                                    : feature.name
                                        .replace(/_/g, ' ')
                                        .replace(/\b\w/g, l => l.toUpperCase())}
                                </Badge>
                              ))}
                            {quote.selected_features.length > 5 && (
                              <Badge variant="outline" className="text-xs">
                                +{quote.selected_features.length - 5} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3 pt-4 border-t">
                      <Button
                        onClick={() => downloadQuotePdf(quote.id)}
                        variant="outline"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download Quote PDF
                      </Button>

                      <Button
                        onClick={() => downloadTimelinePdf(quote.id)}
                        variant="outline"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download Timeline PDF
                      </Button>

                      <Button
                        onClick={() =>
                          navigator.share({
                            title: `${quote.project_name} - Project Quote`,
                            text: `Check out this project quote for ${quote.project_name}`,
                            url: generateShareableLink(quote.id),
                          })
                        }
                        variant="outline"
                      >
                        <Share2 className="h-4 w-4 mr-2" />
                        Share Link
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
