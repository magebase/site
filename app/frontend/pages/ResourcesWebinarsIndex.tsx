import PageLayout from '../components/PageLayout';
import { Button } from '../components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { ArrowRight, Video, Calendar, Clock, User } from 'lucide-react';

interface Webinar {
  id: number;
  title: string;
  description: string;
  speaker_name: string;
  speaker_bio: string;
  scheduled_at: string;
  duration_minutes: number;
  registration_url: string;
  is_upcoming: boolean;
  slug: string;
}

interface ResourcesWebinarsIndexProps {
  webinars: Webinar[];
  user?: {
    name: string;
    email: string;
    avatar_url?: string;
  };
}

export default function ResourcesWebinarsIndex({
  webinars,
  user,
}: ResourcesWebinarsIndexProps) {
  const upcomingWebinars = webinars.filter(w => w.is_upcoming);
  const pastWebinars = webinars.filter(w => !w.is_upcoming);

  return (
    <PageLayout
      user={user}
      title="Webinars | Expert-Led Sessions & Tutorials"
      description="Join our expert-led webinars covering the latest technologies, best practices, and industry insights to accelerate your development journey."
    >
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pb-24 overflow-hidden bg-gradient-to-br from-orange-50 to-red-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Expert Webinars
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join our expert-led sessions covering the latest technologies, best
            practices, and industry insights to accelerate your development
            journey.
          </p>
        </div>
      </section>

      {/* Upcoming Webinars */}
      {upcomingWebinars.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12">
              Upcoming Webinars
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingWebinars.map(webinar => (
                <Card
                  key={webinar.id}
                  className="group hover:shadow-xl transition-all duration-300"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                        Upcoming
                      </span>
                      <Video className="w-5 h-5 text-gray-400" />
                    </div>
                    <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                      {webinar.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {webinar.description}
                    </p>

                    <div className="space-y-2 mb-6">
                      <div className="flex items-center text-sm text-gray-600">
                        <User className="w-4 h-4 mr-2" />
                        <span className="font-medium">
                          {webinar.speaker_name}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(webinar.scheduled_at).toLocaleDateString(
                          'en-US',
                          {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          }
                        )}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-2" />
                        {webinar.duration_minutes} minutes
                      </div>
                    </div>

                    <Button
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      onClick={() =>
                        window.open(webinar.registration_url, '_blank')
                      }
                    >
                      Register Now
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Past Webinars */}
      {pastWebinars.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12">
              Past Webinars
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pastWebinars.map(webinar => (
                <Card
                  key={webinar.id}
                  className="group hover:shadow-lg transition-shadow duration-300"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
                        Recorded
                      </span>
                      <Video className="w-5 h-5 text-gray-400" />
                    </div>
                    <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                      {webinar.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {webinar.description}
                    </p>

                    <div className="space-y-2 mb-6">
                      <div className="flex items-center text-sm text-gray-600">
                        <User className="w-4 h-4 mr-2" />
                        <span className="font-medium">
                          {webinar.speaker_name}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(webinar.scheduled_at).toLocaleDateString(
                          'en-US',
                          {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          }
                        )}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-2" />
                        {webinar.duration_minutes} minutes
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full group-hover:bg-blue-50 group-hover:border-blue-200"
                      onClick={() =>
                        (window.location.href = `/webinars/${webinar.slug}`)
                      }
                    >
                      Watch Recording
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Webinar Topics */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Popular Topics
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Getting Started
                </h3>
                <p className="text-gray-600 text-sm">
                  Quick start guides and basic concepts
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Advanced Techniques
                </h3>
                <p className="text-gray-600 text-sm">
                  Deep dives into complex topics
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔧</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Best Practices
                </h3>
                <p className="text-gray-600 text-sm">
                  Industry standards and recommendations
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔮</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Future Trends
                </h3>
                <p className="text-gray-600 text-sm">
                  What's coming next in technology
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Host Your Own Webinar
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Share your expertise with our community. We're always looking for
            speakers!
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white"
            onClick={() => (window.location.href = '/contact')}
          >
            Become a Speaker
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>
    </PageLayout>
  );
}
