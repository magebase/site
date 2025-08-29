import PageLayout from "../components/PageLayout";
import { Button } from "../components/ui/button";
import { ArrowRight, Users, Target, Award } from "lucide-react";

interface Page {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  meta_title: string;
  meta_description: string;
}

interface CompanyAboutProps {
  page: Page;
  user?: {
    name: string;
    email: string;
    avatar_url?: string;
  };
}

export default function CompanyAbout({ page, user }: CompanyAboutProps) {
  // Handle null page case
  if (!page) {
    return (
      <PageLayout user={user}>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Page Not Found
            </h1>
            <p className="text-gray-600">
              The requested page could not be found.
            </p>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      user={user}
      title={page.meta_title || page.title}
      description={page.meta_description || page.excerpt}
    >
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pb-24 pt-12 overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Users className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {page.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {page.excerpt}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: page.content }} />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Excellence
              </h3>
              <p className="text-gray-600">
                We strive for excellence in every project, delivering solutions
                that exceed expectations.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Collaboration
              </h3>
              <p className="text-gray-600">
                We believe in transparent communication and collaborative
                partnerships with our clients.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Innovation
              </h3>
              <p className="text-gray-600">
                We embrace cutting-edge technologies and innovative approaches
                to solve complex challenges.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Work With Us?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Let's discuss how we can help bring your vision to life.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            onClick={() => (window.location.href = "/#quote-form")}
          >
            Start Your Project
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>
    </PageLayout>
  );
}
