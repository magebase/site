import { Head } from "@inertiajs/react";
import { TenantSidebar } from "../../../components/TenantSidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { CreditCard, Calendar, DollarSign, ExternalLink } from "lucide-react";

interface BillingIndexProps {
  tenant: {
    name: string;
    subdomain: string;
  };
  billingInfo: {
    current_plan: string;
    next_billing_date: string;
    monthly_cost: number;
  };
}

export default function BillingIndex({
  tenant,
  billingInfo,
}: BillingIndexProps) {
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

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Current Plan */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Current Plan
                    </CardTitle>
                    <CardDescription>
                      Your active subscription details
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Plan</span>
                      <span className="font-semibold">
                        {billingInfo.current_plan}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        Monthly Cost
                      </span>
                      <span className="font-semibold">
                        ${billingInfo.monthly_cost}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        Next Billing Date
                      </span>
                      <span className="font-semibold">
                        {new Date(
                          billingInfo.next_billing_date,
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>
                      Manage your billing settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start" variant="outline">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Open Stripe Customer Portal
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Update Payment Method
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <DollarSign className="h-4 w-4 mr-2" />
                      View Billing History
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Billing History */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Recent Billing History
                  </CardTitle>
                  <CardDescription>
                    Your recent payments and invoices
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-gray-500">
                    <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No billing history available</p>
                    <p className="text-sm">
                      Billing history will appear here once you have payments
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
