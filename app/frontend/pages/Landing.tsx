import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";
import {
  Zap,
  Shield,
  Truck,
  Wrench,
  CheckCircle,
  MapPin,
  Star,
  ArrowRight,
  Phone,
  Mail,
  User,
  Calendar,
  FileText,
  ChevronDown,
  DollarSign,
} from "lucide-react";

export default function Landing() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    equipmentType: "",
    rentalDuration: "",
    deliveryAddress: "",
    specialRequirements: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    AOS.init({ once: true, duration: 700 });
  }, []);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  }

  function getCompletedFieldsCount() {
    const requiredFields = [
      "name",
      "email",
      "phone",
      "equipmentType",
      "rentalDuration",
      "deliveryAddress",
    ];
    return requiredFields.filter(
      (field) => formState[field as keyof typeof formState].trim() !== ""
    ).length;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    fetch("/quote_requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token":
          document
            .querySelector('meta[name="csrf-token"]')
            ?.getAttribute("content") || "",
      },
      body: JSON.stringify({ quote_request: formState }),
    })
      .then((response) => {
        if (response.ok) {
          setSubmitted(true);
        } else {
          throw new Error("Failed to submit quote request");
        }
      })
      .catch((error) => {
        console.error("Error submitting quote request:", error);
        alert(
          "There was an error submitting your quote request. Please try again."
        );
      });
  }

  return (
    <div className="font-sans text-gray-900 bg-white min-h-screen">
      <Header />

      {/* Announcement Bar */}
      <div
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-3 px-4"
        data-aos="fade-down"
        data-aos-duration="600"
      >
        <div className="flex items-center justify-center gap-2 text-sm">
          <Zap className="w-4 h-4" />
          <span>Limited time: 20% off first rental + free delivery</span>
        </div>
      </div>

      <main className="w-full">
        {/* Hero */}
        <section className="px-4 sm:px-6 lg:px-8 pt-16 pb-24">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div
                className="inline-flex items-center gap-2 bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm font-medium mb-8"
                data-aos="fade-down"
                data-aos-delay="200"
              >
                <Zap className="w-4 h-4" />
                Power solutions for Brisbane businesses
              </div>

              <h1
                className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                Reliable generator rentals
                <br />
                <span className="text-gray-600">when you need them most</span>
              </h1>

              <p
                className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
                data-aos="fade-up"
                data-aos-delay="600"
              >
                Professional equipment, fast delivery, and 24/7 support across
                Brisbane. Get powered up in under 2 hours.
              </p>

              <div
                className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
                data-aos="fade-up"
                data-aos-delay="800"
              >
                <a
                  href="#quote-form"
                  className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                >
                  Get instant quote
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="tel:+61412345678"
                  className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Call now
                </a>
              </div>

              <div
                className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
                data-aos="fade-up"
                data-aos-delay="1000"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">Same-day delivery</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">Fully insured equipment</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">24/7 emergency support</span>
                </div>
              </div>
            </div>

            {/* Quote Form */}
            <div
              id="quote-form"
              className="max-w-4xl mx-auto"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 md:p-12">
                <div
                  className="text-center mb-8"
                  data-aos="fade-down"
                  data-aos-delay="400"
                >
                  <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Get your quote
                  </h2>
                  <p className="text-gray-600">
                    Fill out the form below and we'll get back to you within 1
                    hour
                  </p>
                </div>

                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Quote request submitted
                    </h3>
                    <p className="text-gray-600">
                      We'll follow up within one business hour with your
                      personalized quote.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Progress indicator */}
                    <div className="mb-8">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">
                          Form progress
                        </span>
                        <span className="text-sm text-gray-500">
                          {getCompletedFieldsCount()}/6 fields completed
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gray-900 h-2 rounded-full transition-all duration-300"
                          style={{
                            width: `${(getCompletedFieldsCount() / 6) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    {/* Form fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            name="name"
                            value={formState.name}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-colors"
                            placeholder="Your full name"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email address *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            name="email"
                            type="email"
                            value={formState.email}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-colors"
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone number *
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            name="phone"
                            type="tel"
                            value={formState.phone}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-colors"
                            placeholder="+61 XXX XXX XXX"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Equipment type *
                        </label>
                        <div className="relative">
                          <select
                            name="equipmentType"
                            value={formState.equipmentType}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-colors appearance-none"
                          >
                            <option value="">Select equipment type</option>
                            <option value="portable-5kva">
                              Portable 5 kVA
                            </option>
                            <option value="standby-20kva">
                              Standby 20 kVA
                            </option>
                            <option value="mobile-100kva">
                              Mobile 100 kVA
                            </option>
                            <option value="other">
                              Other - please specify below
                            </option>
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Rental duration *
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <select
                            name="rentalDuration"
                            value={formState.rentalDuration}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-colors appearance-none"
                          >
                            <option value="">Select duration</option>
                            <option value="1-day">1 Day</option>
                            <option value="3-days">3 Days</option>
                            <option value="1-week">1 Week</option>
                            <option value="2-weeks">2 Weeks</option>
                            <option value="1-month">1 Month+</option>
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Delivery address *
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                          <input
                            name="deliveryAddress"
                            value={formState.deliveryAddress}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-colors"
                            placeholder="Street address, suburb, Brisbane QLD"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Special requirements
                      </label>
                      <textarea
                        name="specialRequirements"
                        value={formState.specialRequirements}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-colors"
                        placeholder="Any special requirements, setup needs, or additional information..."
                      />
                    </div>

                    <div className="text-center pt-4">
                      <button
                        type="submit"
                        className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-gray-900 text-white px-12 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                      >
                        Get instant quote
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <p className="text-sm text-gray-500 mt-3">
                        No commitment required • Response within 1 hour
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section
          className="px-4 sm:px-6 lg:px-8 py-24 bg-gray-50"
          data-aos="fade-up"
        >
          <div className="max-w-7xl mx-auto">
            <div
              className="text-center mb-16"
              data-aos="fade-down"
              data-aos-delay="200"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                How it works
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Get powered up in three simple steps
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div
                className="text-center"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <div className="w-16 h-16 bg-gray-900 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Request a quote
                </h3>
                <p className="text-gray-600">
                  Fill out our simple form with your requirements and location
                  details.
                </p>
              </div>

              <div
                className="text-center"
                data-aos="fade-up"
                data-aos-delay="600"
              >
                <div className="w-16 h-16 bg-gray-900 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Confirm booking
                </h3>
                <p className="text-gray-600">
                  Review your quote and confirm delivery date and time.
                </p>
              </div>

              <div
                className="text-center"
                data-aos="fade-up"
                data-aos-delay="800"
              >
                <div className="w-16 h-16 bg-gray-900 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Receive equipment
                </h3>
                <p className="text-gray-600">
                  We'll deliver and set up your generator when you need it.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section
          className="px-4 sm:px-6 lg:px-8 py-24 bg-white"
          data-aos="fade-up"
        >
          <div className="max-w-7xl mx-auto">
            <div
              className="text-center mb-16"
              data-aos="fade-down"
              data-aos-delay="200"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why choose Genfix?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Professional generator hire with reliable service you can trust
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div
                className="text-center"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Reliable equipment
                </h3>
                <p className="text-gray-600">
                  Well-maintained generators from leading manufacturers,
                  regularly serviced and tested.
                </p>
              </div>

              <div
                className="text-center"
                data-aos="fade-up"
                data-aos-delay="600"
              >
                <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  24/7 support
                </h3>
                <p className="text-gray-600">
                  Round-the-clock technical support and emergency assistance
                  when you need it most.
                </p>
              </div>

              <div
                className="text-center"
                data-aos="fade-up"
                data-aos-delay="800"
              >
                <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <Truck className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Fast delivery
                </h3>
                <p className="text-gray-600">
                  Quick response times and flexible delivery scheduling to meet
                  your project timelines.
                </p>
              </div>

              <div
                className="text-center"
                data-aos="fade-up"
                data-aos-delay="1000"
              >
                <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Fully insured
                </h3>
                <p className="text-gray-600">
                  Complete insurance coverage for equipment and operations,
                  giving you peace of mind.
                </p>
              </div>

              <div
                className="text-center"
                data-aos="fade-up"
                data-aos-delay="1200"
              >
                <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <Wrench className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Expert setup
                </h3>
                <p className="text-gray-600">
                  Professional installation and commissioning by qualified
                  technicians.
                </p>
              </div>

              <div
                className="text-center"
                data-aos="fade-up"
                data-aos-delay="1400"
              >
                <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mx-auto mb-6">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Competitive rates
                </h3>
                <p className="text-gray-600">
                  Transparent pricing with no hidden fees and flexible rental
                  terms.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section
          className="px-4 sm:px-6 lg:px-8 py-24 bg-gray-50"
          data-aos="fade-up"
        >
          <div className="max-w-7xl mx-auto">
            <div
              className="text-center mb-16"
              data-aos="fade-down"
              data-aos-delay="200"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                What our customers say
              </h2>
              <p className="text-xl text-gray-600">
                Trusted by Brisbane businesses
              </p>
            </div>

            <div
              className="max-w-4xl mx-auto"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <Carousel className="w-full">
                <CarouselContent>
                  <CarouselItem className="md:basis-1/2">
                    <div className="bg-white p-8 rounded-lg border border-gray-200">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center text-white font-bold text-lg mr-4">
                          J
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">
                            John Smith
                          </div>
                          <div className="text-gray-500 text-sm">
                            Construction Manager
                          </div>
                        </div>
                      </div>
                      <div className="flex text-yellow-400 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <p className="text-gray-700">
                        "Genfix delivered our generator on time and it worked
                        perfectly for our construction site. Great service and
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
                          <div className="font-semibold text-gray-900">
                            Sarah Wilson
                          </div>
                          <div className="text-gray-500 text-sm">
                            Event Coordinator
                          </div>
                        </div>
                      </div>
                      <div className="flex text-yellow-400 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <p className="text-gray-700">
                        "Reliable equipment and transparent pricing. Will
                        definitely use again for our events. The team was very
                        helpful!"
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
                          <div className="font-semibold text-gray-900">
                            Mike Johnson
                          </div>
                          <div className="text-gray-500 text-sm">
                            Facility Manager
                          </div>
                        </div>
                      </div>
                      <div className="flex text-yellow-400 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <p className="text-gray-700">
                        "Excellent emergency backup power solution. Quick
                        response time and well-maintained equipment. Highly
                        recommended!"
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
                          <div className="font-semibold text-gray-900">
                            Lisa Brown
                          </div>
                          <div className="text-gray-500 text-sm">
                            Business Owner
                          </div>
                        </div>
                      </div>
                      <div className="flex text-yellow-400 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <p className="text-gray-700">
                        "Outstanding service! The generators arrived exactly
                        when promised and the pricing was very competitive.
                        Great company to work with."
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

        {/* Equipment */}
        <section className="px-4 sm:px-6 lg:px-8 py-24" data-aos="fade-up">
          <div className="max-w-7xl mx-auto">
            <div
              className="text-center mb-16"
              data-aos="fade-down"
              data-aos-delay="200"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our generator fleet
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Professional-grade equipment for every power requirement
              </p>
            </div>

            <div
              className="max-w-5xl mx-auto"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <Carousel className="w-full">
                <CarouselContent>
                  <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                    <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
                      <div className="w-full h-48 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                        <Zap className="w-16 h-16 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Portable 5 kVA
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        Perfect for small tools and lighting
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          Available
                        </span>
                      </div>
                    </div>
                  </CarouselItem>

                  <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                    <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
                      <div className="w-full h-48 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                        <Zap className="w-16 h-16 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Standby 20 kVA
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        For larger sites and events
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          Available
                        </span>
                      </div>
                    </div>
                  </CarouselItem>

                  <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                    <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
                      <div className="w-full h-48 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                        <Zap className="w-16 h-16 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Mobile 100 kVA
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        For large events and temporary power
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                          Limited
                        </span>
                      </div>
                    </div>
                  </CarouselItem>

                  <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                    <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
                      <div className="w-full h-48 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                        <Shield className="w-16 h-16 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Emergency backup
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        24/7 emergency power solutions
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          On call
                        </span>
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

        {/* FAQ */}
        <section
          className="px-4 sm:px-6 lg:px-8 py-24 bg-gray-50"
          data-aos="fade-up"
        >
          <div className="max-w-4xl mx-auto">
            <div
              className="text-center mb-16"
              data-aos="fade-down"
              data-aos-delay="200"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Frequently asked questions
              </h2>
              <p className="text-xl text-gray-600">
                Everything you need to know about our service
              </p>
            </div>

            <div className="space-y-6">
              <div
                className="bg-white p-6 rounded-lg border border-gray-200"
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  How quickly can you deliver?
                </h3>
                <p className="text-gray-600">
                  Same-day or next-day delivery across Brisbane depending on
                  availability and location.
                </p>
              </div>

              <div
                className="bg-white p-6 rounded-lg border border-gray-200"
                data-aos="fade-up"
                data-aos-delay="600"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Do you provide setup and installation?
                </h3>
                <p className="text-gray-600">
                  Yes, our team handles delivery, setup, and basic installation.
                  Advanced electrical work may require a licensed electrician.
                </p>
              </div>

              <div
                className="bg-white p-6 rounded-lg border border-gray-200"
                data-aos="fade-up"
                data-aos-delay="800"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  What areas do you service?
                </h3>
                <p className="text-gray-600">
                  We service all Brisbane suburbs and surrounding areas. Contact
                  us for delivery to regional Queensland.
                </p>
              </div>

              <div
                className="bg-white p-6 rounded-lg border border-gray-200"
                data-aos="fade-up"
                data-aos-delay="1000"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Are the generators insured?
                </h3>
                <p className="text-gray-600">
                  Yes, all our equipment is fully insured and regularly
                  maintained with detailed service records available.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section
          className="px-4 sm:px-6 lg:px-8 py-24 bg-gray-900 text-white"
          data-aos="fade-up"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2
              className="text-3xl font-bold mb-4"
              data-aos="fade-down"
              data-aos-delay="200"
            >
              Ready to power your project?
            </h2>
            <p
              className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              Get reliable generator rental in Brisbane today with
              lightning-fast service.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              <a
                href="#quote-form"
                className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Get instant quote
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="tel:+61412345678"
                className="inline-flex items-center gap-2 bg-gray-300 text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call now
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
