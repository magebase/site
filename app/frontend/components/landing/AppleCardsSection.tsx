import { Carousel, Card } from '../ui/apple-cards-carousel';
import { Code, Smartphone, Globe, Zap, Shield, Users } from 'lucide-react';

export function AppleCardsSection() {
  const cards = [
    {
      src: '/images/apple-cards/web-applications.jpg',
      title: 'Web Applications',
      category: 'Full-Stack Development',
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Globe className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Modern Web Apps</h3>
              <p className="text-sm text-gray-600">React, Next.js, Vue.js</p>
            </div>
          </div>
          <p className="text-gray-700">
            Build scalable web applications with modern frameworks. From MVPs to
            enterprise solutions, we deliver fast, responsive, and user-friendly
            applications.
          </p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>SEO Optimized</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Mobile Responsive</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Performance Focused</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Cloud Ready</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      src: '/images/apple-cards/mobile-apps.jpg',
      title: 'Mobile Apps',
      category: 'iOS & Android Development',
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Smartphone className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                Native Mobile Apps
              </h3>
              <p className="text-sm text-gray-600">React Native, Flutter</p>
            </div>
          </div>
          <p className="text-gray-700">
            Create engaging mobile experiences that users love. We develop
            cross-platform apps that work seamlessly on both iOS and Android
            devices.
          </p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>App Store Ready</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Push Notifications</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Offline Support</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>In-App Purchases</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      src: '/images/apple-cards/api-development.jpg',
      title: 'API Development',
      category: 'Backend & Microservices',
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Code className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Robust APIs</h3>
              <p className="text-sm text-gray-600">REST, GraphQL, WebSockets</p>
            </div>
          </div>
          <p className="text-gray-700">
            Build powerful APIs that scale. From RESTful services to real-time
            WebSocket connections, we create backend solutions that your
            frontend can rely on.
          </p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Auto Documentation</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Rate Limiting</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Authentication</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Caching Layer</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      src: '/images/apple-cards/ai-integration.jpg',
      title: 'AI Integration',
      category: 'Machine Learning & Automation',
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                AI-Powered Features
              </h3>
              <p className="text-sm text-gray-600">ChatGPT, Custom ML Models</p>
            </div>
          </div>
          <p className="text-gray-700">
            Integrate cutting-edge AI capabilities into your applications. From
            chatbots to predictive analytics, we help you leverage the power of
            artificial intelligence.
          </p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Chatbots</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Content Generation</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Data Analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Automation</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      src: '/images/apple-cards/security-compliance.jpg',
      title: 'Security & Compliance',
      category: 'Enterprise-Grade Security',
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Secure by Design</h3>
              <p className="text-sm text-gray-600">OWASP, GDPR, HIPAA</p>
            </div>
          </div>
          <p className="text-gray-700">
            Security-first development approach. We implement industry best
            practices and compliance standards to protect your data and your
            users.
          </p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>OWASP Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>GDPR Ready</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>SSL/TLS</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Data Encryption</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      src: '/images/apple-cards/team-collaboration.jpg',
      title: 'Team Collaboration',
      category: 'Agile Development Process',
      content: (
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Agile Methodology</h3>
              <p className="text-sm text-gray-600">
                Scrum, Kanban, Daily Standups
              </p>
            </div>
          </div>
          <p className="text-gray-700">
            Transparent development process with regular updates and
            collaboration. We keep you involved throughout the entire
            development lifecycle.
          </p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Daily Updates</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Weekly Demos</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Slack Integration</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Project Tracking</span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-white via-gray-50 to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 text-slate-700 px-6 py-3 rounded-full text-sm font-medium mb-6 border border-blue-200/50 shadow-sm"
            data-aos="fade-down"
            data-aos-duration="600"
          >
            <Code
              className="w-4 h-4 text-blue-600"
              data-aos="fade-in"
              data-aos-duration="600"
              data-aos-delay="100"
            />
            <span>Technical Excellence</span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight tracking-tight"
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-delay="200"
          >
            Our{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Expertise
            </span>
          </h2>
          <p
            className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light"
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-delay="400"
          >
            We specialize in cutting-edge technologies and modern development
            practices to build exceptional digital products that scale and
            perform.
          </p>
        </div>

        <div data-aos="fade-up" data-aos-duration="800" data-aos-delay="600">
          <Carousel
            items={cards.map((card, index) => (
              <Card key={index} card={card} index={index} />
            ))}
          />
        </div>
      </div>
    </section>
  );
}
