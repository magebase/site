import { Head } from '@inertiajs/react';
import { TenantSidebar } from '../../../components/TenantSidebar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../../components/ui/accordion';
import { Button } from '../../../components/ui/button';
import {
  Calendar,
  DollarSign,
  ExternalLink,
  TrendingUp,
  FileText,
  Package,
  ArrowUp,
  Settings,
} from 'lucide-react';
import { useState } from 'react';

interface Subscription {
  id: string;
  status: string;
  current_period_start: number;
  current_period_end: number;
  items: {
    data: Array<{
      price: {
        product: string;
        unit_amount: number;
        currency: string;
        recurring: {
          interval: string;
        };
      };
      quantity: number;
    }>;
  };
}

interface Invoice {
  id: string;
  number: string;
  status: string;
  amount_due: number;
  currency: string;
  created: number;
  hosted_invoice_url?: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  active: boolean;
  metadata: Record<string, string>;
}

interface AvailableProduct {
  name: string;
  products: Product[];
  prices: any[];
  current_tier: string;
  portal_configuration_id: string;
}

interface BillingIndexProps {
  tenant: {
    name: string;
    subdomain: string;
  };
  tenantPath: string; // The actual path identifier used in URLs
  billingData: {
    subscriptions: Subscription[];
    invoices: Invoice[];
    total_monthly: number;
    next_billing_date: number | null;
    subscription_count: number;
  };
  availableProducts: AvailableProduct[];
  portalBaseUrl: string;
}

export default function BillingIndex({
  tenant,
  tenantPath,
  billingData,
  availableProducts,
  portalBaseUrl,
}: BillingIndexProps) {
  const [loadingPortal, setLoadingPortal] = useState<string | null>(null);

  const handlePortalRedirect = async (productId?: string) => {
    setLoadingPortal(productId || 'general');

    try {
      const response = await fetch(
        productId
          ? `/${tenantPath}/billing/create_product_portal_session`
          : `/${tenantPath}/billing/create_portal_session`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token':
              document
                .querySelector('meta[name="csrf-token"]')
                ?.getAttribute('content') || '',
          },
          body: JSON.stringify({
            product_id: productId,
            return_url: `${portalBaseUrl}/${tenant.subdomain}/billing`,
          }),
        }
      );

      const data = await response.json();

      if (data.portal_url) {
        window.location.href = data.portal_url;
      } else {
        alert('Failed to create portal session. Please try again.');
      }
    } catch (error) {
      console.error('Error creating portal session:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setLoadingPortal(null);
    }
  };

  const formatCurrency = (amount: number, currency = 'usd') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount / 100);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString();
  };

  return (
    <>
      <Head title={`${tenant.name} - Billing`} />
      <div className="flex h-screen bg-gray-100">
        <TenantSidebar tenant={tenant} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
            <div className="max-w-7xl mx-auto">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">
                  Billing & Subscription
                </h1>
                <p className="text-gray-600 mt-2">
                  Manage your billing and payment methods
                </p>
              </div>

              {/* Billing Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Active Subscriptions
                    </CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {billingData.subscription_count}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Total active subscriptions
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Monthly Total
                    </CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      ${billingData.total_monthly.toFixed(2)}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Total monthly recurring charges
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Next Billing Date
                    </CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {billingData.next_billing_date
                        ? formatDate(billingData.next_billing_date)
                        : 'No upcoming billing'}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Next payment due date
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Invoices */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Recent Invoices
                  </CardTitle>
                  <CardDescription>
                    Your recent payments and invoices
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {billingData.invoices.length > 0 ? (
                    <div className="space-y-4">
                      {billingData.invoices.slice(0, 5).map(invoice => (
                        <div
                          key={invoice.id}
                          className="flex items-center justify-between p-4 border rounded-lg"
                        >
                          <div>
                            <p className="font-medium">
                              Invoice {invoice.number || invoice.id.slice(-8)}
                            </p>
                            <p className="text-sm text-gray-600">
                              {formatDate(invoice.created)} • {invoice.status}
                            </p>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="font-semibold">
                              {formatCurrency(
                                invoice.amount_due,
                                invoice.currency
                              )}
                            </span>
                            {invoice.hosted_invoice_url && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  window.open(
                                    invoice.hosted_invoice_url,
                                    '_blank'
                                  )
                                }
                              >
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>No invoices available</p>
                      <p className="text-sm">
                        Invoices will appear here once you have payments
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Available Products */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Available Products & Services
                  </CardTitle>
                  <CardDescription>
                    Explore and manage your subscriptions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {availableProducts.map((productGroup, index) => (
                      <AccordionItem key={index} value={`product-${index}`}>
                        <AccordionTrigger className="hover:no-underline">
                          <div className="flex items-center justify-between w-full mr-4">
                            <div>
                              <h3 className="font-semibold text-left">
                                {productGroup.name}
                              </h3>
                              <p className="text-sm text-gray-600 text-left">
                                {productGroup.products.length} tier
                                {productGroup.products.length > 1
                                  ? 's'
                                  : ''}{' '}
                                available
                              </p>
                            </div>
                            {productGroup.current_tier !== 'none' && (
                              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                                {productGroup.current_tier} active
                              </span>
                            )}
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4 pt-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {productGroup.products.map(product => (
                                <Card key={product.id} className="border-2">
                                  <CardHeader>
                                    <CardTitle className="text-lg">
                                      {product.name}
                                    </CardTitle>
                                    <CardDescription>
                                      {product.description}
                                    </CardDescription>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="flex gap-2">
                                      <Button
                                        onClick={() =>
                                          handlePortalRedirect(product.id)
                                        }
                                        disabled={loadingPortal === product.id}
                                        className="flex-1"
                                      >
                                        {loadingPortal === product.id ? (
                                          'Loading...'
                                        ) : (
                                          <>
                                            <ArrowUp className="h-4 w-4 mr-2" />
                                            Upgrade
                                          </>
                                        )}
                                      </Button>
                                      <Button
                                        variant="outline"
                                        onClick={() =>
                                          handlePortalRedirect(product.id)
                                        }
                                        disabled={loadingPortal === product.id}
                                        className="flex-1"
                                      >
                                        {loadingPortal === product.id ? (
                                          'Loading...'
                                        ) : (
                                          <>
                                            <Settings className="h-4 w-4 mr-2" />
                                            Manage
                                          </>
                                        )}
                                      </Button>
                                    </div>
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>

                  {availableProducts.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Package className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>No products available</p>
                      <p className="text-sm">
                        Products will appear here once configured
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* General Portal Access */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Stripe Customer Portal</CardTitle>
                  <CardDescription>
                    Manage all your billing settings in one place
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={() => handlePortalRedirect()}
                    disabled={loadingPortal === 'general'}
                    className="w-full"
                  >
                    {loadingPortal === 'general' ? (
                      'Loading...'
                    ) : (
                      <>
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Open Stripe Customer Portal
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
