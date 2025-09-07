import PageLayout from '../components/PageLayout';
import { Button } from '../components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import {
  ArrowRight,
  BookOpen,
  HelpCircle,
  Users,
  Video,
  FileText,
} from 'lucide-react';

interface ResourcesIndexProps {
  user?: {
    name: string;
    email: string;
    avatar_url?: string;
  };
}

export default function ResourcesIndex({ user }: ResourcesIndexProps) {
  const resources = [
    {
      title: 'Documentation',
      description:
        'Comprehensive guides and API documentation to help you build with our platform.',
      icon: BookOpen,
      href: '/documentation',
      color: 'from-blue-600 to-purple-600',
    },
    {
      title: 'Help Center',
      description:
        'Find answers to common questions and get support for your projects.',
      icon: HelpCircle,
      href: '/help-center',
      color: 'from-green-600 to-blue-600',
    },
    {
      title: 'Community',
      description:
        'Connect with other developers, share knowledge, and get inspired by the community.',
      icon: Users,
      href: '/community',
      color: 'from-purple-600 to-pink-600',
    },
    {
      title: 'Webinars',
      description:
        'Watch expert-led sessions on the latest technologies and best practices.',
      icon: Video,
      href: '/webinars',
      color: 'from-orange-600 to-red-600',
    },
    {
      title: 'Templates',
      description:
        'Download pre-built templates and boilerplates to accelerate your development.',
      icon: FileText,
      href: '/templates',
      color: 'from-indigo-600 to-purple-600',
    },
  ];

  return (
    <PageLayout
      user={user}
      title="Resources | Documentation, Help & Community"
      description="Access comprehensive documentation, help center, community forums, webinars, and templates to support your development journey."
    >
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pb-24 overflow-hidden bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Developer Resources
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to succeed with our platform. From comprehensive
            documentation to community support and expert-led webinars.
          </p>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.map(resource => {
              const IconComponent = resource.icon;
              return (
                <Card
                  key={resource.title}
                  className="group hover:shadow-lg transition-shadow duration-300"
                >
                  <CardHeader>
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${resource.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                      {resource.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-6">{resource.description}</p>
                    <Button
                      variant="outline"
                      className="w-full group-hover:bg-blue-50 group-hover:border-blue-200"
                      onClick={() => (window.location.href = resource.href)}
                    >
                      Explore {resource.title}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Quick Access
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                API Docs
              </h3>
              <Button
                variant="link"
                className="text-blue-600 hover:text-blue-800"
                onClick={() =>
                  (window.location.href = '/resources/documentation/api')
                }
              >
                View API Reference
              </Button>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <HelpCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Support
              </h3>
              <Button
                variant="link"
                className="text-blue-600 hover:text-blue-800"
                onClick={() => (window.location.href = '/resources/help')}
              >
                Get Help
              </Button>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Forum
              </h3>
              <Button
                variant="link"
                className="text-blue-600 hover:text-blue-800"
                onClick={() => (window.location.href = '/resources/community')}
              >
                Join Discussion
              </Button>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Video className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Tutorials
              </h3>
              <Button
                variant="link"
                className="text-blue-600 hover:text-blue-800"
                onClick={() => (window.location.href = '/resources/webinars')}
              >
                Watch Videos
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Need More Help?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Our support team is here to help you succeed with your projects.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            onClick={() => (window.location.href = '/contact')}
          >
            Contact Support
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>
    </PageLayout>
  );
}
