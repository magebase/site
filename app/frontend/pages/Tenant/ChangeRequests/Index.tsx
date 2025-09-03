import { Head, Link } from "@inertiajs/react";
import { TenantSidebar } from "../../../components/TenantSidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Plus, Calendar, User } from "lucide-react";

interface ChangeRequestsIndexProps {
  tenant: {
    name: string;
    subdomain: string;
  };
  changeRequests: Array<{
    id: number;
    title: string;
    description: string;
    status: string;
    priority: string;
    created_at: string;
    user: {
      name: string;
      email: string;
    };
  }>;
}

export default function ChangeRequestsIndex({
  tenant,
  changeRequests,
}: ChangeRequestsIndexProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800";
      case "high":
        return "bg-orange-100 text-orange-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      <Head title={`${tenant.name} - Change Requests`} />
      <div className="flex h-screen bg-gray-100">
        <TenantSidebar tenant={tenant} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
            <div className="max-w-7xl mx-auto">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    Change Requests
                  </h1>
                  <p className="text-gray-600 mt-2">
                    Manage your project change requests
                  </p>
                </div>
                <Button asChild>
                  <Link href={`/${tenant.subdomain}/change_requests/new`}>
                    <Plus className="h-4 w-4 mr-2" />
                    New Request
                  </Link>
                </Button>
              </div>

              <div className="space-y-4">
                {changeRequests.map((request) => (
                  <Card
                    key={request.id}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg">
                            {request.title}
                          </CardTitle>
                          <CardDescription className="mt-2">
                            {request.description.length > 200
                              ? `${request.description.substring(0, 200)}...`
                              : request.description}
                          </CardDescription>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Badge className={getPriorityColor(request.priority)}>
                            {request.priority}
                          </Badge>
                          <Badge className={getStatusColor(request.status)}>
                            {request.status.replace("_", " ")}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            <span>{request.user.name}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {new Date(
                                request.created_at,
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <Link
                            href={`/${tenant.subdomain}/change_requests/${request.id}`}
                          >
                            View Details
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {changeRequests.length === 0 && (
                  <Card>
                    <CardContent className="text-center py-12">
                      <p className="text-gray-500">No change requests yet</p>
                      <Button asChild className="mt-4">
                        <Link href={`/${tenant.subdomain}/change_requests/new`}>
                          <Plus className="h-4 w-4 mr-2" />
                          Create Your First Request
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
