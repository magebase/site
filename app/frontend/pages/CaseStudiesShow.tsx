import { Head } from "@inertiajs/react";
import PageLayout from "../components/PageLayout";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { ArrowRight, TrendingUp, Target, CheckCircle } from "lucide-react";

interface CaseStudy {
  id: number;
  title: string;
  client_name: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string;
  slug: string;
  featured_image_url: string;
  published_at: string;
}

interface CaseStudiesShowProps {
  caseStudy: CaseStudy;
  user?: {
    name: string;
    email: string;
    avatar_url?: string;
  };
}

export default function CaseStudiesShow({
  caseStudy,
  user,
}: CaseStudiesShowProps) {
  return (
    <PageLayout user={user}>
      <Head>
        <title>{caseStudy.title} | Case Study</title>
        <meta
          name="description"
          content={`${
            caseStudy.client_name
          } case study: ${caseStudy.challenge.substring(0, 150)}...`}
        />
      </Head>

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pb-24 overflow-hidden bg-gradient-to-br from-orange-50 to-red-50 pt-48">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
              {caseStudy.industry}
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
              Case Study
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {caseStudy.title}
          </h1>

          <p className="text-xl text-gray-600 mb-8">
            How we helped {caseStudy.client_name} overcome their challenges and
            achieve remarkable results.
          </p>

          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            onClick={() =>
              document
                .getElementById("results")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            View Results
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>

      {/* Featured Image */}
      {caseStudy.featured_image_url && (
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <img
              src={caseStudy.featured_image_url}
              alt={caseStudy.title}
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        </section>
      )}

      {/* Case Study Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Challenge */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="w-6 h-6 mr-3 text-red-600" />
                    The Challenge
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-gray max-w-none">
                    {caseStudy.challenge.split("\n").map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Solution */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CheckCircle className="w-6 h-6 mr-3 text-blue-600" />
                    Our Solution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-gray max-w-none">
                    {caseStudy.solution.split("\n").map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Results */}
              <Card id="results">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-6 h-6 mr-3 text-green-600" />
                    The Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-gray max-w-none">
                    {caseStudy.results.split("\n").map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Project Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Project Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Client</p>
                    <p className="font-medium">{caseStudy.client_name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Industry</p>
                    <p className="font-medium">{caseStudy.industry}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Published</p>
                    <p className="font-medium">
                      {new Date(caseStudy.published_at).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Key Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle>Key Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        Success Rate
                      </span>
                      <span className="font-medium text-green-600">95%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Timeline</span>
                      <span className="font-medium">3 months</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">ROI</span>
                      <span className="font-medium text-green-600">300%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* CTA */}
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                onClick={() => (window.location.href = "/#quote-form")}
              >
                Start Similar Project
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Related Case Studies */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            More Success Stories
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Discover how we've helped other businesses achieve their goals.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            onClick={() => (window.location.href = "/case-studies")}
          >
            View All Case Studies
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Achieve Similar Results?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Let's discuss how we can help your business reach new heights.
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
