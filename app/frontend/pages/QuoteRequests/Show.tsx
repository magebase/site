import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Download, Calendar, ChevronRight, FileText } from 'lucide-react';
import { useState } from 'react';

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
    timeline?: Array<{
      day: number;
      scope: string;
      deliverables: string[];
    }>;
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

interface Props {
  quote_request: QuoteRequest;
}

export default function Show({ quote_request }: Props) {
  const [showFullTimeline, setShowFullTimeline] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-500';
      case 'quoted':
        return 'bg-blue-500';
      case 'contracted':
        return 'bg-green-500';
      case 'deposit_paid':
        return 'bg-yellow-500';
      case 'in_development':
        return 'bg-purple-500';
      case 'completed':
        return 'bg-green-600';
      default:
        return 'bg-gray-500';
    }
  };

  const timeline = quote_request.project_plan_json?.timeline || [];
  const visibleTimeline = showFullTimeline ? timeline : timeline.slice(0, 3);

  const handleDownloadTimeline = () => {
    router.visit(`/quote_requests/${quote_request.id}/timeline_pdf`);
  };

  const handleDownloadCSV = () => {
    window.open(`/quote_requests/${quote_request.id}/timeline_csv`, '_blank');
  };

  const handleViewFullPDF = () => {
    router.visit(`/quote_requests/${quote_request.id}/timeline_pdf`);
  };

  return (
    <>
      <Head title={`Quote Request: ${quote_request.project_name}`} />

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {quote_request.project_name}
            </h1>
            <p className="text-gray-600 mt-2">
              {quote_request.client.company_name}
            </p>
          </div>
          <div className="flex gap-2">
            <Badge
              className={`${getStatusColor(quote_request.status)} text-white`}
            >
              {quote_request.status.replace('_', ' ')}
            </Badge>
            <Link href="/quote_requests">
              <Button variant="outline">Back to Quotes</Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Project Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Project Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900">Description</h3>
                  <p className="text-gray-700 mt-1">
                    {quote_request.project_description}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">Use Case</h3>
                    <p className="text-gray-700">{quote_request.use_case}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Created</h3>
                    <p className="text-gray-700">
                      {format(
                        new Date(quote_request.created_at),
                        'MMM dd, yyyy'
                      )}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Selected Features */}
            <Card>
              <CardHeader>
                <CardTitle>Selected Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 md:grid-cols-2">
                  {quote_request.selected_features.map(feature => (
                    <div key={feature.id} className="p-3 border rounded-lg">
                      <h4 className="font-semibold text-gray-900">
                        {feature.name ===
                        '5_high_converting_seo_marketing_pages'
                          ? '5 High Converting, SEO Optimized Marketing Pages'
                          : feature.name
                              .replace(/_/g, ' ')
                              .replace(/\b\w/g, l => l.toUpperCase())}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {feature.description}
                      </p>
                      <Badge variant="outline" className="mt-2">
                        {feature.category}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Project Timeline Teaser */}
            {timeline.length > 0 && (
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Project Timeline
                    </CardTitle>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleDownloadCSV}
                        className="flex items-center gap-1"
                      >
                        <FileText className="h-4 w-4" />
                        CSV
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleDownloadTimeline}
                        className="flex items-center gap-1"
                      >
                        <Download className="h-4 w-4" />
                        PDF
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {visibleTimeline.map((item, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                            {item.day}
                          </div>
                          {index < visibleTimeline.length - 1 && (
                            <div className="w-0.5 h-16 bg-blue-200 mt-2"></div>
                          )}
                        </div>
                        <div className="flex-1 pb-8">
                          <h4 className="font-semibold text-gray-900">
                            Day {item.day}
                          </h4>
                          <p className="text-gray-700 mt-1">{item.scope}</p>
                          {item.deliverables &&
                            item.deliverables.length > 0 && (
                              <ul className="mt-2 space-y-1">
                                {item.deliverables
                                  .slice(0, 2)
                                  .map((deliverable, idx) => (
                                    <li
                                      key={idx}
                                      className="text-sm text-gray-600 flex items-center gap-1"
                                    >
                                      <ChevronRight className="h-3 w-3" />
                                      {deliverable}
                                    </li>
                                  ))}
                                {item.deliverables.length > 2 && (
                                  <li className="text-sm text-blue-600">
                                    +{item.deliverables.length - 2} more
                                    deliverables
                                  </li>
                                )}
                              </ul>
                            )}
                        </div>
                      </div>
                    ))}

                    {timeline.length > 3 && !showFullTimeline && (
                      <div className="text-center pt-4">
                        <Button
                          variant="outline"
                          onClick={() => setShowFullTimeline(true)}
                          className="mr-2"
                        >
                          See More
                        </Button>
                        <Button
                          onClick={handleViewFullPDF}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          View Full Timeline PDF
                        </Button>
                      </div>
                    )}

                    {showFullTimeline && (
                      <div className="text-center pt-4">
                        <Button
                          onClick={handleViewFullPDF}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          View Full Timeline PDF
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing Plans */}
            <Card>
              <CardHeader>
                <CardTitle>Pricing Plans</CardTitle>
                <p className="text-sm text-gray-600">
                  Choose the plan that best fits your needs
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-3">
                  {/* Basic Plan */}
                  <div className="border rounded-lg p-6">
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Basic
                      </h3>
                      <p className="text-3xl font-bold text-blue-600 mt-2">
                        ${(quote_request.estimated_cost * 0.8).toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        One-time payment
                      </p>
                    </div>
                    <ul className="mt-4 space-y-2">
                      <li className="flex items-center text-sm">
                        <ChevronRight className="h-4 w-4 text-green-500 mr-2" />
                        Core features included
                      </li>
                      <li className="flex items-center text-sm">
                        <ChevronRight className="h-4 w-4 text-green-500 mr-2" />
                        2 weeks delivery
                      </li>
                      <li className="flex items-center text-sm">
                        <ChevronRight className="h-4 w-4 text-green-500 mr-2" />
                        Email support
                      </li>
                    </ul>
                    <Button className="w-full mt-4" variant="outline">
                      Select Basic
                    </Button>
                  </div>

                  {/* Standard Plan */}
                  <div className="border-2 border-blue-500 rounded-lg p-6 relative">
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Recommended
                      </span>
                    </div>
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Standard
                      </h3>
                      <p className="text-3xl font-bold text-blue-600 mt-2">
                        $
                        {quote_request.estimated_cost?.toLocaleString() ||
                          'TBD'}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        One-time payment
                      </p>
                    </div>
                    <ul className="mt-4 space-y-2">
                      <li className="flex items-center text-sm">
                        <ChevronRight className="h-4 w-4 text-green-500 mr-2" />
                        All features included
                      </li>
                      <li className="flex items-center text-sm">
                        <ChevronRight className="h-4 w-4 text-green-500 mr-2" />
                        4 weeks delivery
                      </li>
                      <li className="flex items-center text-sm">
                        <ChevronRight className="h-4 w-4 text-green-500 mr-2" />
                        Priority support
                      </li>
                      <li className="flex items-center text-sm">
                        <ChevronRight className="h-4 w-4 text-green-500 mr-2" />
                        3 months maintenance
                      </li>
                    </ul>
                    <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                      Select Standard
                    </Button>
                  </div>

                  {/* Premium Plan */}
                  <div className="border rounded-lg p-6">
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Premium
                      </h3>
                      <p className="text-3xl font-bold text-blue-600 mt-2">
                        ${(quote_request.estimated_cost * 1.3).toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        One-time payment
                      </p>
                    </div>
                    <ul className="mt-4 space-y-2">
                      <li className="flex items-center text-sm">
                        <ChevronRight className="h-4 w-4 text-green-500 mr-2" />
                        All features + extras
                      </li>
                      <li className="flex items-center text-sm">
                        <ChevronRight className="h-4 w-4 text-green-500 mr-2" />
                        6 weeks delivery
                      </li>
                      <li className="flex items-center text-sm">
                        <ChevronRight className="h-4 w-4 text-green-500 mr-2" />
                        24/7 support
                      </li>
                      <li className="flex items-center text-sm">
                        <ChevronRight className="h-4 w-4 text-green-500 mr-2" />
                        6 months maintenance
                      </li>
                      <li className="flex items-center text-sm">
                        <ChevronRight className="h-4 w-4 text-green-500 mr-2" />
                        Advanced analytics
                      </li>
                    </ul>
                    <Button className="w-full mt-4" variant="outline">
                      Select Premium
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Client Information */}
            <Card>
              <CardHeader>
                <CardTitle>Client Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <p className="text-sm text-gray-600">Company</p>
                  <p className="font-semibold">
                    {quote_request.client.company_name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Contact</p>
                  <p className="font-semibold">
                    {quote_request.client.contact_name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-semibold">{quote_request.client.email}</p>
                </div>
                {quote_request.client.phone && (
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-semibold">
                      {quote_request.client.phone}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={handleDownloadTimeline}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Timeline PDF
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleDownloadCSV}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Download Timeline CSV
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
