import { Star, Quote } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "John Smith",
      company: "TechCorp",
      text: "Magebase delivered our e-commerce platform on time and it exceeded our expectations. Great communication and professional team!",
      rating: 5,
      avatar: "JS",
      gradient: "from-blue-500 to-purple-500",
      role: "CEO",
    },
    {
      name: "Sarah Johnson",
      company: "StartupXYZ",
      text: "Transparent pricing and modern development practices. Will definitely work with them again for our mobile app. The team was very knowledgeable!",
      rating: 5,
      avatar: "SJ",
      gradient: "from-emerald-500 to-teal-500",
      role: "Founder",
    },
    {
      name: "Mike Chen",
      company: "InnovateLab",
      text: "Excellent web application development. Quick response time and well-structured code. Highly recommended for any software project!",
      rating: 5,
      avatar: "MC",
      gradient: "from-orange-500 to-red-500",
      role: "CTO",
    },
    {
      name: "Lisa Rodriguez",
      company: "DataFlow",
      text: "Outstanding service! The application launched exactly when promised and the pricing was very competitive. Great company to work with.",
      rating: 5,
      avatar: "LR",
      gradient: "from-purple-500 to-pink-500",
      role: "Director",
    },
  ];

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-24 bg-gradient-to-br from-white via-gray-50/50 to-purple-50/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238B5CF6' fill-opacity='0.05'%3E%3Cpath d='M50 50c0-16.569-13.431-30-30-30s-30 13.431-30 30 13.431 30 30 30 30-13.431 30-30zm30 0c0-16.569-13.431-30-30-30s-30 13.431-30 30 13.431 30 30 30 30-13.431 30-30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <div
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 text-slate-700 px-6 py-3 rounded-full text-sm font-medium mb-6 border border-purple-200/50 shadow-sm"
            data-aos="fade-down"
            data-aos-duration="600"
          >
            <Quote className="w-4 h-4 text-purple-600" />
            <span>Client Success Stories</span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight tracking-tight"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="200"
          >
            What Our
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {" "}
              Clients Say
            </span>
          </h2>
          <p
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="400"
          >
            Real feedback from real businesses who've experienced success with
            our development services
          </p>
        </div>

        <div
          className="max-w-6xl mx-auto"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-delay="600"
        >
          <Carousel className="w-full">
            <CarouselContent className="-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem
                  key={index}
                  className="md:basis-1/2 pl-4"
                  data-aos="fade-up"
                  data-aos-duration="600"
                  data-aos-delay={index * 200 + 800}
                >
                  <div className="group relative h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-orange-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
                    <div className="relative h-full bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-lg group-hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-200/50">
                      {/* Quote Icon */}
                      <div
                        className="absolute top-6 right-6 w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center opacity-20 group-hover:opacity-30 transition-opacity duration-300"
                        data-aos="fade-in"
                        data-aos-duration="600"
                        data-aos-delay={index * 200 + 900}
                      >
                        <Quote className="w-5 h-5 text-white" />
                      </div>

                      {/* Avatar and Info */}
                      <div
                        className="flex items-center mb-6"
                        data-aos="fade-right"
                        data-aos-duration="600"
                        data-aos-delay={index * 200 + 1000}
                      >
                        <div
                          className={`w-16 h-16 bg-gradient-to-br ${testimonial.gradient} rounded-2xl flex items-center justify-center text-white font-bold text-lg mr-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                        >
                          {testimonial.avatar}
                        </div>
                        <div>
                          <p
                            className="font-bold text-gray-900 text-lg group-hover:text-purple-600 transition-colors duration-300"
                            data-aos="fade-up"
                            data-aos-duration="600"
                            data-aos-delay={index * 200 + 1100}
                          >
                            {testimonial.name}
                          </p>
                          <p
                            className="text-gray-600 text-sm font-medium"
                            data-aos="fade-up"
                            data-aos-duration="600"
                            data-aos-delay={index * 200 + 1200}
                          >
                            {testimonial.role}
                          </p>
                          <p
                            className="text-gray-500 text-xs"
                            data-aos="fade-up"
                            data-aos-duration="600"
                            data-aos-delay={index * 200 + 1300}
                          >
                            {testimonial.company}
                          </p>
                        </div>
                      </div>

                      {/* Rating */}
                      <div
                        className="flex text-yellow-400 mb-6"
                        data-aos="fade-up"
                        data-aos-duration="600"
                        data-aos-delay={index * 200 + 1400}
                      >
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-5 h-5 fill-current group-hover:scale-110 transition-transform duration-300"
                            style={{ animationDelay: `${i * 100}ms` }}
                          />
                        ))}
                      </div>

                      {/* Testimonial Text */}
                      <p
                        className="text-gray-700 leading-relaxed font-medium text-lg"
                        data-aos="fade-up"
                        data-aos-duration="600"
                        data-aos-delay={index * 200 + 1500}
                      >
                        "{testimonial.text}"
                      </p>

                      {/* Decorative Element */}
                      <div
                        className="absolute bottom-6 left-6 w-12 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-300"
                        data-aos="fade-in"
                        data-aos-duration="600"
                        data-aos-delay={index * 200 + 1600}
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious
              className="left-4 bg-white/90 backdrop-blur-sm border-gray-200/50 hover:bg-white"
              data-aos="fade-left"
              data-aos-duration="600"
              data-aos-delay="1000"
            />
            <CarouselNext
              className="right-4 bg-white/90 backdrop-blur-sm border-gray-200/50 hover:bg-white"
              data-aos="fade-right"
              data-aos-duration="600"
              data-aos-delay="1000"
            />
          </Carousel>
        </div>

        {/* Trust Indicator */}
        <div
          className="text-center mt-16"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-delay="1200"
        >
          <div
            className="inline-flex items-center gap-4 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-gray-200/50 shadow-sm"
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-delay="1300"
          >
            <div
              className="flex -space-x-2"
              data-aos="fade-right"
              data-aos-duration="600"
              data-aos-delay="1400"
            >
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className={`w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold`}
                  data-aos="fade-right"
                  data-aos-duration="500"
                  data-aos-delay={1400 + i * 100}
                >
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <span
              className="text-sm font-medium text-gray-700"
              data-aos="fade-left"
              data-aos-duration="600"
              data-aos-delay="1500"
            >
              Trusted by 50+ companies
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
