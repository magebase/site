import { Head, Link, useForm } from '@inertiajs/react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { ArrowLeft, Building } from 'lucide-react';

interface TenantNewProps {
  errors?: Record<string, string>;
}

export default function TenantNew({ errors }: TenantNewProps) {
  const { data, setData, post, processing } = useForm({
    name: '',
    subdomain: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/tenants');
  };

  const handleSubdomainChange = (value: string) => {
    // Auto-generate subdomain from name
    const subdomain = value.toLowerCase().replace(/[^a-z0-9]/g, '');
    setData({ ...data, name: value, subdomain });
  };

  return (
    <>
      <Head title="Create New Tenant" />
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <Building className="h-12 w-12 text-blue-600" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create New Tenant
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Set up a new tenant workspace for your project
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <Card>
            <CardHeader>
              <CardTitle>Tenant Details</CardTitle>
              <CardDescription>
                Enter the details for your new tenant workspace
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Tenant Name</Label>
                  <Input
                    id="name"
                    type="text"
                    required
                    value={data.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleSubdomainChange(e.target.value)
                    }
                    placeholder="My Awesome Project"
                  />
                  {errors?.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="subdomain">Subdomain</Label>
                  <Input
                    id="subdomain"
                    type="text"
                    required
                    value={data.subdomain}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setData(
                        'subdomain',
                        e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '')
                      )
                    }
                    placeholder="myawesomeproject"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    This will be your tenant URL: {data.subdomain}
                    .yourdomain.com
                  </p>
                  {errors?.subdomain && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.subdomain}
                    </p>
                  )}
                </div>

                <div className="flex gap-3">
                  <Button
                    type="submit"
                    disabled={processing}
                    className="flex-1"
                  >
                    {processing ? 'Creating...' : 'Create Tenant'}
                  </Button>
                  <Button type="button" variant="outline" asChild>
                    <Link href="/">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back
                    </Link>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
