import { Head } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Home } from "lucide-react";
import { Link } from "@inertiajs/react";

export default function Expired() {
  return (
    <>
      <Head title="Proposal Expired" />

      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                Proposal Link Expired
              </CardTitle>
            </CardHeader>

            <CardContent className="text-center">
              <p className="text-gray-600 mb-6">
                This proposal link has expired and is no longer available.
                Proposal links are valid for 7 days from creation for security
                reasons.
              </p>

              <p className="text-sm text-gray-500 mb-8">
                If you need access to this proposal, please contact us and we'll
                send you a new link.
              </p>

              <div className="space-y-4">
                <Button asChild className="w-full">
                  <Link href="/">
                    <Home className="h-4 w-4 mr-2" />
                    Return to Homepage
                  </Link>
                </Button>

                <div className="text-sm text-gray-500">
                  Need help? Contact us at{" "}
                  <a
                    href="mailto:hello@magebase.site"
                    className="text-blue-600 hover:text-blue-500"
                  >
                    hello@magebase.site
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
