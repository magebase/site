import { Head, Link } from "@inertiajs/react";
import { TenantSidebar } from "../../../components/TenantSidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { FileText, Plus, Download, Upload, Calendar, User } from "lucide-react";

interface DocumentsIndexProps {
  tenant: {
    name: string;
    subdomain: string;
  };
  documents: Array<{
    id: number;
    name: string;
    file_path: string;
    file_type: string;
    created_at: string;
    user: {
      name: string;
      email: string;
    };
  }>;
}

export default function DocumentsIndex({
  tenant,
  documents,
}: DocumentsIndexProps) {
  return (
    <>
      <Head title={`${tenant.name} - Documents`} />
      <div className="flex h-screen bg-gray-100">
        <TenantSidebar tenant={tenant} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
            <div className="max-w-7xl mx-auto">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    Project Documents
                  </h1>
                  <p className="text-gray-600 mt-2">
                    Upload and manage your project files
                  </p>
                </div>
                <Button asChild>
                  <Link href={`/${tenant.subdomain}/documents/new`}>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Document
                  </Link>
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {documents.map((document) => (
                  <Card
                    key={document.id}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <FileText className="h-8 w-8 text-blue-600" />
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                      <CardTitle className="text-lg">{document.name}</CardTitle>
                      <CardDescription>{document.file_type}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>{document.user.name}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {new Date(document.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full mt-4"
                        asChild
                      >
                        <Link
                          href={`/${tenant.subdomain}/documents/${document.id}`}
                        >
                          View Details
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
                {documents.length === 0 && (
                  <Card className="col-span-full">
                    <CardContent className="text-center py-12">
                      <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 mb-4">
                        No documents uploaded yet
                      </p>
                      <Button asChild>
                        <Link href={`/${tenant.subdomain}/documents/new`}>
                          <Plus className="h-4 w-4 mr-2" />
                          Upload Your First Document
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
