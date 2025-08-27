import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

export function TestimonialsSection() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What our clients say
          </h2>
          <p className="text-xl text-gray-600">
            Trusted by businesses worldwide
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Carousel className="w-full">
            <CarouselContent>
              <CarouselItem className="md:basis-1/2">
                <div className="bg-white p-8 rounded-lg border border-gray-200">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center text-white font-bold text-lg mr-4">
                      J
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">John Smith</p>
                      <p className="text-gray-500 text-sm">CEO, TechCorp</p>
                    </div>
                  </div>
                  <div className="flex text-yellow-400 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700">
                    "Magebase delivered our e-commerce platform on time and it
                    exceeded our expectations. Great communication and
                    professional team!"
                  </p>
                </div>
              </CarouselItem>

              <CarouselItem className="md:basis-1/2">
                <div className="bg-white p-8 rounded-lg border border-gray-200">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center text-white font-bold text-lg mr-4">
                      S
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        Sarah Johnson
                      </p>
                      <p className="text-gray-500 text-sm">
                        Founder, StartupXYZ
                      </p>
                    </div>
                  </div>
                  <div className="flex text-yellow-400 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700">
                    "Transparent pricing and modern development practices. Will
                    definitely work with them again for our mobile app. The team
                    was very knowledgeable!"
                  </p>
                </div>
              </CarouselItem>

              <CarouselItem className="md:basis-1/2">
                <div className="bg-white p-8 rounded-lg border border-gray-200">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center text-white font-bold text-lg mr-4">
                      M
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Mike Chen</p>
                      <p className="text-gray-500 text-sm">CTO, InnovateLab</p>
                    </div>
                  </div>
                  <div className="flex text-yellow-400 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700">
                    "Excellent web application development. Quick response time
                    and well-structured code. Highly recommended for any
                    software project!"
                  </p>
                </div>
              </CarouselItem>

              <CarouselItem className="md:basis-1/2">
                <div className="bg-white p-8 rounded-lg border border-gray-200">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center text-white font-bold text-lg mr-4">
                      L
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        Lisa Rodriguez
                      </p>
                      <p className="text-gray-500 text-sm">
                        Director, DataFlow
                      </p>
                    </div>
                  </div>
                  <div className="flex text-yellow-400 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700">
                    "Outstanding service! The application launched exactly when
                    promised and the pricing was very competitive. Great company
                    to work with."
                  </p>
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
