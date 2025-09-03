import { Head } from "@inertiajs/react";
import { TenantSidebar } from "../../components/TenantSidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { FileText, Plus, Clock, AlertCircle } from "lucide-react";

interface TenantDashboardProps {
  tenant: {
    name: string;
    subdomain: string;
  };
  changeRequests: Array<{
    id: number;
    title: string;
    status: string;
    priority: string;
    created_at: string;
  }>;
  documents: Array<{
    id: number;
    name: string;
    file_type: string;
    created_at: string;
  }>;
  recentActivity: Array<{
    id: number;
    title?: string;
    name?: string;
    created_at: string;
  }>;
}

export default function TenantDashboard({
  tenant,
  changeRequests,
  documents,
  recentActivity,
}: TenantDashboardProps) {
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
      <Head title={`${tenant.name} Dashboard`} />
      <div className="flex h-screen bg-gray-100">
        <TenantSidebar tenant={tenant} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
            <div className="max-w-7xl mx-auto">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">
                  Welcome to {tenant.name}
                </h1>
                <p className="text-gray-600 mt-2">
                  Manage your projects, change requests, and documents
                </p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Change Requests
                    </CardTitle>
                    <AlertCircle className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {changeRequests.length}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {
                        changeRequests.filter((cr) => cr.status === "pending")
                          .length
                      }{" "}
                      pending
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Documents
                    </CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{documents.length}</div>
                    <p className="text-xs text-muted-foreground">
                      Project files uploaded
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Recent Activity
                    </CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {recentActivity.length}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Items in the last 30 days
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Change Requests */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Recent Change Requests</CardTitle>
                        <CardDescription>
                          Your latest project change requests
                        </CardDescription>
                      </div>
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        New Request
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {changeRequests.slice(0, 5).map((request) => (
                        <div
                          key={request.id}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">
                              {request.title}
                            </h4>
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(
                                request.created_at,
                              ).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Badge
                              className={getPriorityColor(request.priority)}
                            >
                              {request.priority}
                            </Badge>
                            <Badge className={getStatusColor(request.status)}>
                              {request.status.replace("_", " ")}
                            </Badge>
                          </div>
                        </div>
                      ))}
                      {changeRequests.length === 0 && (
                        <p className="text-gray-500 text-center py-4">
                          No change requests yet
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Documents */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Recent Documents</CardTitle>
                        <CardDescription>
                          Your latest project documents
                        </CardDescription>
                      </div>
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Upload
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {documents.slice(0, 5).map((document) => (
                        <div
                          key={document.id}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <FileText className="h-4 w-4 text-gray-400" />
                            <div>
                              <h4 className="font-medium text-sm">
                                {document.name}
                              </h4>
                              <p className="text-xs text-gray-500">
                                {document.file_type} •{" "}
                                {new Date(
                                  document.created_at,
                                ).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                      {documents.length === 0 && (
                        <p className="text-gray-500 text-center py-4">
                          No documents uploaded yet
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
