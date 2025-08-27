import { InfiniteMovingCards } from "../ui/infinite-moving-cards";

export function InfiniteTechnologiesSection() {
  const technologies = [
    {
      quote: "React 18+ with TypeScript",
      name: "Frontend Framework",
      title: "Modern Development",
    },
    {
      quote: "Next.js & Inertia.js",
      name: "Full-Stack Solutions",
      title: "Seamless Integration",
    },
    {
      quote: "PostgreSQL & Redis",
      name: "Database & Caching",
      title: "High Performance",
    },
    {
      quote: "Tailwind CSS & Shadcn/ui",
      name: "Styling & Components",
      title: "Beautiful Design",
    },
    {
      quote: "Stripe & Payment APIs",
      name: "Payment Processing",
      title: "Secure Transactions",
    },
    {
      quote: "AWS & Cloud Services",
      name: "Cloud Infrastructure",
      title: "Scalable Solutions",
    },
    {
      quote: "Docker & Kubernetes",
      name: "Containerization",
      title: "Deployment Ready",
    },
    {
      quote: "RESTful APIs & GraphQL",
      name: "API Development",
      title: "Flexible Integration",
    },
    {
      quote: "CI/CD & DevOps",
      name: "Automation",
      title: "Fast Delivery",
    },
    {
      quote: "Testing & Quality Assurance",
      name: "Code Quality",
      title: "Reliable Software",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Technologies We Use
          </h2>
          <p className="text-gray-600">
            Modern tech stack for cutting-edge solutions
          </p>
        </div>

        <div className="h-[300px] rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden">
          <InfiniteMovingCards
            items={technologies}
            direction="left"
            speed="normal"
          />
        </div>
      </div>
    </section>
  );
}
