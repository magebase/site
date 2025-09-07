import { Zap, Shield } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';

export function ServicesSection() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className="text-3xl font-bold text-gray-900 mb-4"
            data-aos="fade-down"
            data-aos-duration="600"
          >
            Our services
          </h2>
          <p
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-delay="200"
          >
            Professional software development services for every project type
          </p>
        </div>

        <div
          className="max-w-5xl mx-auto"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-delay="400"
        >
          <Carousel className="w-full">
            <CarouselContent>
              <CarouselItem
                className="md:basis-1/2 lg:basis-1/3"
                data-aos="fade-up"
                data-aos-duration="600"
                data-aos-delay="500"
              >
                <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
                  <div
                    className="w-full h-48 bg-gray-100 rounded-lg mb-4 flex items-center justify-center"
                    data-aos="fade-in"
                    data-aos-duration="600"
                    data-aos-delay="600"
                  >
                    <Zap
                      className="w-16 h-16 text-gray-400"
                      data-aos="fade-in"
                      data-aos-duration="600"
                      data-aos-delay="700"
                    />
                  </div>
                  <h3
                    className="text-lg font-semibold text-gray-900 mb-2"
                    data-aos="fade-up"
                    data-aos-duration="600"
                    data-aos-delay="800"
                  >
                    Web Applications
                  </h3>
                  <p
                    className="text-gray-600 text-sm mb-4"
                    data-aos="fade-up"
                    data-aos-duration="600"
                    data-aos-delay="900"
                  >
                    Custom web applications built with modern technologies and
                    best practices
                  </p>
                  <div
                    className="flex items-center justify-between"
                    data-aos="fade-up"
                    data-aos-duration="600"
                    data-aos-delay="1000"
                  >
                    <span
                      className="text-sm text-gray-500"
                      data-aos="fade-right"
                      data-aos-duration="600"
                      data-aos-delay="1100"
                    >
                      From $5,000
                    </span>
                    <span
                      className="text-sm text-blue-600"
                      data-aos="fade-left"
                      data-aos-duration="600"
                      data-aos-delay="1100"
                    >
                      Learn more →
                    </span>
                  </div>
                </div>
              </CarouselItem>

              <CarouselItem
                className="md:basis-1/2 lg:basis-1/3"
                data-aos="fade-up"
                data-aos-duration="600"
                data-aos-delay="600"
              >
                <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
                  <div
                    className="w-full h-48 bg-gray-100 rounded-lg mb-4 flex items-center justify-center"
                    data-aos="fade-in"
                    data-aos-duration="600"
                    data-aos-delay="700"
                  >
                    <Zap
                      className="w-16 h-16 text-gray-400"
                      data-aos="fade-in"
                      data-aos-duration="600"
                      data-aos-delay="800"
                    />
                  </div>
                  <h3
                    className="text-lg font-semibold text-gray-900 mb-2"
                    data-aos="fade-up"
                    data-aos-duration="600"
                    data-aos-delay="900"
                  >
                    Mobile Apps
                  </h3>
                  <p
                    className="text-gray-600 text-sm mb-4"
                    data-aos="fade-up"
                    data-aos-duration="600"
                    data-aos-delay="1000"
                  >
                    Native and cross-platform mobile applications for iOS and
                    Android
                  </p>
                  <div
                    className="flex items-center justify-between"
                    data-aos="fade-up"
                    data-aos-duration="600"
                    data-aos-delay="1100"
                  >
                    <span
                      className="text-sm text-gray-500"
                      data-aos="fade-right"
                      data-aos-duration="600"
                      data-aos-delay="1200"
                    >
                      From $8,000
                    </span>
                    <span
                      className="text-sm text-blue-600"
                      data-aos="fade-left"
                      data-aos-duration="600"
                      data-aos-delay="1200"
                    >
                      Learn more →
                    </span>
                  </div>
                </div>
              </CarouselItem>

              <CarouselItem
                className="md:basis-1/2 lg:basis-1/3"
                data-aos="fade-up"
                data-aos-duration="600"
                data-aos-delay="700"
              >
                <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
                  <div
                    className="w-full h-48 bg-gray-100 rounded-lg mb-4 flex items-center justify-center"
                    data-aos="fade-in"
                    data-aos-duration="600"
                    data-aos-delay="800"
                  >
                    <Zap
                      className="w-16 h-16 text-gray-400"
                      data-aos="fade-in"
                      data-aos-duration="600"
                      data-aos-delay="900"
                    />
                  </div>
                  <h3
                    className="text-lg font-semibold text-gray-900 mb-2"
                    data-aos="fade-up"
                    data-aos-duration="600"
                    data-aos-delay="1000"
                  >
                    Cloud Solutions
                  </h3>
                  <p
                    className="text-gray-600 text-sm mb-4"
                    data-aos="fade-up"
                    data-aos-duration="600"
                    data-aos-delay="1100"
                  >
                    Scalable cloud infrastructure and deployment services
                  </p>
                  <div
                    className="flex items-center justify-between"
                    data-aos="fade-up"
                    data-aos-duration="600"
                    data-aos-delay="1200"
                  >
                    <span
                      className="text-sm text-gray-500"
                      data-aos="fade-right"
                      data-aos-duration="600"
                      data-aos-delay="1300"
                    >
                      From $3,000
                    </span>
                    <span
                      className="text-sm text-blue-600"
                      data-aos="fade-left"
                      data-aos-duration="600"
                      data-aos-delay="1300"
                    >
                      Learn more →
                    </span>
                  </div>
                </div>
              </CarouselItem>

              <CarouselItem
                className="md:basis-1/2 lg:basis-1/3"
                data-aos="fade-up"
                data-aos-duration="600"
                data-aos-delay="800"
              >
                <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
                  <div
                    className="w-full h-48 bg-gray-100 rounded-lg mb-4 flex items-center justify-center"
                    data-aos="fade-in"
                    data-aos-duration="600"
                    data-aos-delay="900"
                  >
                    <Shield
                      className="w-16 h-16 text-gray-400"
                      data-aos="fade-in"
                      data-aos-duration="600"
                      data-aos-delay="1000"
                    />
                  </div>
                  <h3
                    className="text-lg font-semibold text-gray-900 mb-2"
                    data-aos="fade-up"
                    data-aos-duration="600"
                    data-aos-delay="1100"
                  >
                    API Development
                  </h3>
                  <p
                    className="text-gray-600 text-sm mb-4"
                    data-aos="fade-up"
                    data-aos-duration="600"
                    data-aos-delay="1200"
                  >
                    RESTful APIs and backend services development
                  </p>
                  <div
                    className="flex items-center justify-between"
                    data-aos="fade-up"
                    data-aos-duration="600"
                    data-aos-delay="1300"
                  >
                    <span
                      className="text-sm text-gray-500"
                      data-aos="fade-right"
                      data-aos-duration="600"
                      data-aos-delay="1400"
                    >
                      From $2,500
                    </span>
                    <span
                      className="text-sm text-blue-600"
                      data-aos="fade-left"
                      data-aos-duration="600"
                      data-aos-delay="1400"
                    >
                      Learn more →
                    </span>
                  </div>
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious
              className="left-4"
              data-aos="fade-left"
              data-aos-duration="600"
              data-aos-delay="1500"
            />
            <CarouselNext
              className="right-4"
              data-aos="fade-right"
              data-aos-duration="600"
              data-aos-delay="1500"
            />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
