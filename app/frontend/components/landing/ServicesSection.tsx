import { Zap, Shield } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

export function ServicesSection() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Our services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Professional software development services for every project type
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Carousel className="w-full">
            <CarouselContent>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
                  <div className="w-full h-48 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                    <Zap className="w-16 h-16 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Web Applications
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Custom web applications built with modern technologies and
                    best practices
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">From $5,000</span>
                    <span className="text-sm text-blue-600">Learn more →</span>
                  </div>
                </div>
              </CarouselItem>

              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
                  <div className="w-full h-48 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                    <Zap className="w-16 h-16 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Mobile Apps
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Native and cross-platform mobile applications for iOS and
                    Android
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">From $8,000</span>
                    <span className="text-sm text-blue-600">Learn more →</span>
                  </div>
                </div>
              </CarouselItem>

              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
                  <div className="w-full h-48 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                    <Zap className="w-16 h-16 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Cloud Solutions
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Scalable cloud infrastructure and deployment services
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">From $3,000</span>
                    <span className="text-sm text-blue-600">Learn more →</span>
                  </div>
                </div>
              </CarouselItem>

              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
                  <div className="w-full h-48 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                    <Shield className="w-16 h-16 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    API Development
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    RESTful APIs and backend services development
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">From $2,500</span>
                    <span className="text-sm text-blue-600">Learn more →</span>
                  </div>
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
