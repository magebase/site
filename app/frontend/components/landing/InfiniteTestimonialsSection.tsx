import { InfiniteMovingCards } from "../ui/infinite-moving-cards";

export function InfiniteTestimonialsSection() {
  const testimonials = [
    {
      quote:
        "Magebase delivered our e-commerce platform on time and it exceeded our expectations. Great communication and professional team!",
      name: "John Smith",
      title: "CEO, TechCorp",
    },
    {
      quote:
        "Transparent pricing and modern development practices. Will definitely work with them again for our mobile app. The team was very knowledgeable!",
      name: "Sarah Johnson",
      title: "Founder, StartupXYZ",
    },
    {
      quote:
        "Excellent web application development. Quick response time and well-structured code. Highly recommended for any software project!",
      name: "Mike Chen",
      title: "CTO, InnovateLab",
    },
    {
      quote:
        "Outstanding service! The application launched exactly when promised and the pricing was very competitive. Great company to work with.",
      name: "Lisa Rodriguez",
      title: "Director, DataFlow",
    },
    {
      quote:
        "Fast development, reliable code, and exceptional service. They delivered exactly what we needed within our timeline and budget.",
      name: "David Kim",
      title: "Product Manager, InnovateCo",
    },
    {
      quote:
        "The team at Magebase is professional and delivers high-quality work. Our SaaS platform is running smoothly thanks to their expertise.",
      name: "Emma Wilson",
      title: "Founder, SaaSFlow",
    },
    {
      quote:
        "Impressed by their technical skills and project management. They kept us updated throughout the development process.",
      name: "Robert Brown",
      title: "CTO, DataTech",
    },
    {
      quote:
        "Best development experience we've had. Clean code, great communication, and delivered on time. Highly recommend!",
      name: "Jennifer Lee",
      title: "CEO, AppWorks",
    },
    {
      quote:
        "Their attention to detail and commitment to quality is outstanding. The mobile app they built for us has been a game changer.",
      name: "Alex Thompson",
      title: "Founder, MobileFirst",
    },
    {
      quote:
        "Professional, reliable, and innovative. They understood our vision perfectly and brought it to life with exceptional quality.",
      name: "Maria Garcia",
      title: "CEO, InnovateNow",
    },
    {
      quote:
        "The web application they developed has significantly improved our operational efficiency. Great work!",
      name: "Chris Anderson",
      title: "Operations Director, BizTech",
    },
    {
      quote:
        "Fast, efficient, and professional. They delivered our complex platform ahead of schedule and within budget.",
      name: "Rachel Green",
      title: "CTO, PlatformPro",
    },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What our clients say
          </h2>
          <p className="text-xl text-gray-600">
            Trusted by businesses worldwide
          </p>
        </div>

        <div className="h-[400px] rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden">
          <InfiniteMovingCards
            items={testimonials}
            direction="right"
            speed="slow"
          />
        </div>
      </div>
    </section>
  );
}
