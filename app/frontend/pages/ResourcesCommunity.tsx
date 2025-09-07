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
  MessageCircle,
  Users,
  Lightbulb,
  Trophy,
  Heart,
} from 'lucide-react';

interface ResourcesCommunityProps {
  page: {
    title: string;
    content: string;
    excerpt: string;
  } | null;
  user?: {
    name: string;
    email: string;
    avatar_url?: string;
  };
}

export default function ResourcesCommunity({
  page,
  user,
}: ResourcesCommunityProps) {
  // Provide default values and merge with page data to handle null fields
  const pageData = {
    title: page?.title || 'Community',
    content:
      page?.content ||
      '<h1>Join Our Developer Community</h1><p>Connect with developers from around the world, share knowledge, and grow together in our supportive community.</p>',
    excerpt:
      page?.excerpt ||
      'Join our vibrant developer community to connect, learn, and grow together.',
  };

  const communityFeatures = [
    {
      title: 'Discussion Forums',
      description: 'Join conversations with developers from around the world',
      icon: MessageCircle,
      color: 'from-blue-600 to-purple-600',
    },
    {
      title: 'Knowledge Base',
      description: 'Access shared knowledge and best practices',
      icon: Lightbulb,
      color: 'from-green-600 to-blue-600',
    },
    {
      title: 'Showcase',
      description: 'Share your projects and get inspired by others',
      icon: Trophy,
      color: 'from-purple-600 to-pink-600',
    },
    {
      title: 'Mentorship',
      description: 'Connect with experienced developers for guidance',
      icon: Heart,
      color: 'from-orange-600 to-red-600',
    },
  ];

  const stats = [
    { label: 'Active Members', value: '10,000+' },
    { label: 'Daily Discussions', value: '500+' },
    { label: 'Projects Shared', value: '2,500+' },
    { label: 'Countries', value: '120+' },
  ];

  return (
    <PageLayout
      user={user}
      title={pageData.title}
      description={pageData.excerpt}
    >
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pb-24 pt-12 overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {pageData.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {pageData.excerpt}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              onClick={() =>
                (window.location.href = 'https://forum.example.com')
              }
            >
              Join Discussion
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-purple-600 text-purple-600 hover:bg-purple-50"
              onClick={() =>
                (window.location.href = 'https://discord.gg/example')
              }
            >
              Join Discord
              <Users className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(stat => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Community Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {communityFeatures.map(feature => {
              const IconComponent = feature.icon;
              return (
                <Card
                  key={feature.title}
                  className="group hover:shadow-lg transition-shadow duration-300"
                >
                  <CardHeader className="text-center">
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-600 text-sm">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Getting Started */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Getting Started in Our Community
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Sign Up
              </h3>
              <p className="text-gray-600">
                Create your account and complete your profile to get started.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Explore
              </h3>
              <p className="text-gray-600">
                Browse forums, read discussions, and find topics that interest
                you.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Participate
              </h3>
              <p className="text-gray-600">
                Join discussions, ask questions, and share your knowledge with
                others.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-8">
              <div
                className="prose prose-gray max-w-none"
                dangerouslySetInnerHTML={{ __html: pageData.content }}
              />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Community Guidelines */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Community Guidelines
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Heart className="w-5 h-5 mr-2 text-red-600" />
                  Be Respectful
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Treat all community members with respect and kindness. We're
                  all here to learn and grow together.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Lightbulb className="w-5 h-5 mr-2 text-yellow-600" />
                  Share Knowledge
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Help others by sharing your knowledge and experience. Everyone
                  starts somewhere!
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2 text-blue-600" />
                  Stay On Topic
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Keep discussions relevant and use appropriate channels for
                  different types of conversations.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Trophy className="w-5 h-5 mr-2 text-purple-600" />
                  Be Constructive
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Provide constructive feedback and focus on solutions rather
                  than problems.
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
            Join Our Community Today
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Connect with developers, share ideas, and grow together in our
            supportive community.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            onClick={() => (window.location.href = 'https://forum.example.com')}
          >
            Get Started
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>
    </PageLayout>
  );
}
