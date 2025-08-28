import { Head } from "@inertiajs/react";
import PageLayout from "../components/PageLayout";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  ArrowRight,
  Video,
  Calendar,
  Clock,
  User,
  Download,
} from "lucide-react";

interface Webinar {
  id: number;
  title: string;
  description: string;
  speaker_name: string;
  speaker_bio: string;
  scheduled_at: string;
  duration_minutes: number;
  registration_url: string;
  recording_url: string;
  slides_url: string;
  is_upcoming: boolean;
  slug: string;
}

interface ResourcesWebinarDetailProps {
  webinar: Webinar;
  user?: {
    name: string;
    email: string;
    avatar_url?: string;
  };
}

export default function ResourcesWebinarDetail({
  webinar,
  user,
}: ResourcesWebinarDetailProps) {
  return (
    <PageLayout user={user}>
      <Head>
        <title>{webinar.title} | Webinar</title>
        <meta
          name="description"
          content={`${webinar.title} - ${webinar.description.substring(
            0,
            150
          )}...`}
        />
      </Head>

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pb-24 overflow-hidden bg-gradient-to-br from-orange-50 to-red-50">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            <span
              className={`px-3 py-1 text-sm rounded-full ${
                webinar.is_upcoming
                  ? "bg-green-100 text-green-800"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              {webinar.is_upcoming ? "Upcoming" : "Recorded"}
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
              Webinar
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {webinar.title}
          </h1>

          <p className="text-xl text-gray-600 mb-8">{webinar.description}</p>

          <div className="flex flex-col sm:flex-row gap-4">
            {webinar.is_upcoming ? (
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                onClick={() => window.open(webinar.registration_url, "_blank")}
              >
                Register Now
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                onClick={() => window.open(webinar.recording_url, "_blank")}
              >
                Watch Recording
                <Video className="w-4 h-4 ml-2" />
              </Button>
            )}
            <Button
              size="lg"
              variant="outline"
              className="border-orange-600 text-orange-600 hover:bg-orange-50"
              onClick={() => (window.location.href = "/webinars")}
            >
              View All Webinars
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Webinar Details */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Speaker Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="w-6 h-6 mr-3 text-blue-600" />
                    About the Speaker
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xl font-bold text-white">
                        {webinar.speaker_name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {webinar.speaker_name}
                      </h3>
                      <p className="text-gray-600">{webinar.speaker_bio}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Webinar Content */}
              {!webinar.is_upcoming && webinar.recording_url && (
                <Card>
                  <CardHeader>
                    <CardTitle>Watch the Webinar</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                      <Video className="w-16 h-16 text-gray-400" />
                    </div>
                    <Button
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      onClick={() =>
                        window.open(webinar.recording_url, "_blank")
                      }
                    >
                      Watch Full Recording
                      <Video className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Resources */}
              {!webinar.is_upcoming && webinar.slides_url && (
                <Card>
                  <CardHeader>
                    <CardTitle>Resources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {webinar.slides_url && (
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                          onClick={() =>
                            window.open(webinar.slides_url, "_blank")
                          }
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download Slides
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Webinar Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Date & Time</p>
                    <p className="font-medium flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(webinar.scheduled_at).toLocaleDateString(
                        "en-US",
                        {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Duration</p>
                    <p className="font-medium flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      {webinar.duration_minutes} minutes
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Speaker</p>
                    <p className="font-medium">{webinar.speaker_name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <p
                      className={`font-medium ${
                        webinar.is_upcoming ? "text-green-600" : "text-blue-600"
                      }`}
                    >
                      {webinar.is_upcoming ? "Upcoming" : "Recorded"}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Related Webinars */}
              <Card>
                <CardHeader>
                  <CardTitle>More Webinars</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() =>
                      (window.location.href = "/resources/webinars")
                    }
                  >
                    View All Webinars
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {webinar.is_upcoming
              ? "Don't Miss This Webinar"
              : "Enjoyed This Webinar?"}
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            {webinar.is_upcoming
              ? "Register now to secure your spot and get notified when it starts."
              : "Check out our other webinars and continue learning with our community."}
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white"
            onClick={() => (window.location.href = "/resources/webinars")}
          >
            {webinar.is_upcoming ? "Register for More" : "Watch More Webinars"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>
    </PageLayout>
  );
}
