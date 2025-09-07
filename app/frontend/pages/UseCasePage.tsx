import PageLayout from '../components/PageLayout';
import MarketingPageTemplate from '../components/marketing/MarketingPageTemplate';
import { getUseCaseBySlug } from '../data/useCaseData';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Clock, Users, Target, CheckCircle } from 'lucide-react';

interface UseCasePageProps {
  slug: string;
  user?: {
    name: string;
    email: string;
    avatar_url?: string;
  };
}

export default function UseCasePage({ slug, user }: UseCasePageProps) {
  const useCase = getUseCaseBySlug(slug);

  if (!useCase) {
    return (
      <PageLayout
        user={user}
        title="Use Case Not Found"
        description="The requested use case could not be found."
      >
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Use Case Not Found
            </h1>
            <p className="text-gray-600">
              The requested use case could not be found.
            </p>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      user={user}
      title={`${useCase.title} Development Services`}
      description={useCase.description}
    >
      <MarketingPageTemplate
        title={useCase.title}
        subtitle={useCase.subtitle}
        description={useCase.description}
        features={useCase.features}
        ctaText={useCase.ctaText}
        useCase={useCase.slug}
      />

      {/* Additional Sections */}
      <div className="py-24 sm:py-32 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Why Choose Our {useCase.title} Solution?
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Comprehensive development approach tailored to{' '}
              {useCase.targetAudience.toLowerCase()}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Project Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  Project Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Estimated Duration</span>
                    <Badge variant="secondary">
                      {useCase.estimatedTimeline}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Complexity Level</span>
                    <Badge
                      variant={
                        useCase.complexity === 'Low'
                          ? 'default'
                          : useCase.complexity === 'Medium'
                            ? 'secondary'
                            : 'destructive'
                      }
                    >
                      {useCase.complexity}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Category</span>
                    <Badge variant="outline">{useCase.category}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Target Audience */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  Target Audience
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{useCase.targetAudience}</p>
                <CardDescription>
                  Our solution is specifically designed to meet the unique needs
                  and challenges faced by {useCase.targetAudience.toLowerCase()}
                  .
                </CardDescription>
              </CardContent>
            </Card>

            {/* Key Benefits */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  Key Benefits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {useCase.keyBenefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Technical Requirements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                  Technical Requirements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {useCase.technicalRequirements.map((requirement, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Success Metrics */}
          <div className="mt-16">
            <Card>
              <CardHeader>
                <CardTitle>Expected Success Metrics</CardTitle>
                <CardDescription>
                  Measurable outcomes you can expect from our{' '}
                  {useCase.title.toLowerCase()} solution
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {useCase.successMetrics.map((metric, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg"
                    >
                      <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
                      <span className="text-gray-700">{metric}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
