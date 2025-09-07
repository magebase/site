import PageLayout from '../components/PageLayout';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import {
  ArrowRight,
  Mail,
  Linkedin,
  Twitter,
  Github,
  Users,
} from 'lucide-react';

interface TeamMember {
  id: number;
  name: string;
  position: string;
  bio: string;
  email: string;
  phone: string;
  linkedin_url: string;
  twitter_url: string;
  github_url: string;
  profile_image_url: string;
}

interface CompanyTeamProps {
  teamMembers: TeamMember[];
  user?: {
    name: string;
    email: string;
    avatar_url?: string;
  };
}

export default function CompanyTeam({ teamMembers, user }: CompanyTeamProps) {
  return (
    <PageLayout
      user={user}
      title="Our Team | Meet the Experts Behind Your Success"
      description="Meet our talented team of developers, designers, and strategists who are passionate about delivering exceptional digital solutions."
    >
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pb-24 overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 pt-48">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Meet Our Team
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our diverse team of experts brings together years of experience in
            development, design, and digital strategy to deliver exceptional
            results for our clients.
          </p>
        </div>
      </section>

      {/* Team Members Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {teamMembers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map(member => (
                <Card
                  key={member.id}
                  className="group hover:shadow-lg transition-shadow duration-300"
                >
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                        {member.profile_image_url ? (
                          <img
                            src={member.profile_image_url}
                            alt={member.name}
                            className="w-24 h-24 rounded-full object-cover"
                          />
                        ) : (
                          <span className="text-2xl font-bold text-white">
                            {member.name.charAt(0)}
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {member.name}
                      </h3>
                      <p className="text-blue-600 font-medium mb-4">
                        {member.position}
                      </p>
                      <p className="text-gray-600 text-sm mb-6">{member.bio}</p>

                      {/* Social Links */}
                      <div className="flex justify-center space-x-3">
                        {member.email && (
                          <a
                            href={`mailto:${member.email}`}
                            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-100 transition-colors"
                          >
                            <Mail className="w-4 h-4 text-gray-600" />
                          </a>
                        )}
                        {member.linkedin_url && (
                          <a
                            href={member.linkedin_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-100 transition-colors"
                          >
                            <Linkedin className="w-4 h-4 text-gray-600" />
                          </a>
                        )}
                        {member.twitter_url && (
                          <a
                            href={member.twitter_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-100 transition-colors"
                          >
                            <Twitter className="w-4 h-4 text-gray-600" />
                          </a>
                        )}
                        {member.github_url && (
                          <a
                            href={member.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-100 transition-colors"
                          >
                            <Github className="w-4 h-4 text-gray-600" />
                          </a>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Meet Our Team
              </h3>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                Our talented team of developers, designers, and strategists work
                together to deliver exceptional digital solutions. Check back
                soon to meet the experts behind your success.
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                onClick={() => (window.location.href = '/careers')}
              >
                Join Our Team
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Join Our Team Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Join Our Growing Team
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            We're always looking for talented individuals who share our passion
            for creating exceptional digital experiences.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            onClick={() => (window.location.href = '/careers')}
          >
            View Open Positions
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
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
            onClick={() => (window.location.href = '/#quote-form')}
          >
            Start Your Project
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>
    </PageLayout>
  );
}
