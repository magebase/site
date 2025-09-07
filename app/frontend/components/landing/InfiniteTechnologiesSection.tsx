import { InfiniteMovingCards } from "../ui/infinite-moving-cards";

export function InfiniteTechnologiesSection() {
  const technologies = [
    {
      image: "https://commons.wikimedia.org/wiki/File:React-icon.svg",
      name: "React",
      alt: "React Logo",
    },
    {
      image: "https://en.wikipedia.org/wiki/File:Ruby_On_Rails_Logo.svg",
      name: "Ruby on Rails",
      alt: "Ruby on Rails Logo",
    },
    {
      image: "https://seeklogo.com/vector-logo/428028/github-actions",
      name: "GitHub Actions",
      alt: "GitHub Actions Logo",
    },
    {
      image: "https://commons.wikimedia.org/wiki/File:Kubernetes_logo.svg",
      name: "Kubernetes",
      alt: "Kubernetes Logo",
    },
    {
      image:
        "https://commons.wikimedia.org/wiki/File:Amazon_Web_Services_Logo.svg",
      name: "AWS",
      alt: "Amazon Web Services Logo",
    },
    {
      image: "https://commons.wikimedia.org/wiki/File:Cloudflare_Logo.svg",
      name: "Cloudflare",
      alt: "Cloudflare Logo",
    },
    {
      image: "https://commons.wikimedia.org/wiki/File:Terraform_Logo.svg",
      name: "Terraform",
      alt: "Terraform Logo",
    },
    {
      image: "https://www.docker.com/company/newsroom/media-resources/",
      name: "Docker",
      alt: "Docker Logo",
    },
    {
      image: "https://commons.wikimedia.org/wiki/File:Logo_PostgreSQL.png",
      name: "PostgreSQL",
      alt: "PostgreSQL Logo",
    },
    {
      image: "https://techicons.dev/icons/argocd",
      name: "ArgoCD",
      alt: "ArgoCD Logo",
    },
    {
      image: "https://commons.wikimedia.org/wiki/File:Grafana_logo.png",
      name: "Grafana",
      alt: "Grafana Logo",
    },
    {
      image:
        "https://images.seeklogo.com/logo-png/43/1/vitest-logo-png_seeklogo-434979.png",
      name: "Vitest",
      alt: "Vitest Logo",
    },
    {
      image: "https://logo.svgcdn.com/d/rspec-original-wordmark.png",
      name: "RSpec",
      alt: "RSpec Logo",
    },
    {
      image:
        "https://images.seeklogo.com/logo-png/43/1/playwright-logo-png_seeklogo-435674.png",
      name: "Playwright",
      alt: "Playwright Logo",
    },
    {
      image:
        "https://images.seeklogo.com/logo-png/29/1/stripe-logo-png_seeklogo-290635.png",
      name: "Stripe",
      alt: "Stripe Logo",
    },
    {
      image:
        "https://images.seeklogo.com/logo-png/24/1/paypal-logo-png_seeklogo-249214.png",
      name: "PayPal",
      alt: "PayPal Logo",
    },
    {
      image:
        "https://images.seeklogo.com/logo-png/26/1/shopify-logo-png_seeklogo-267188.png",
      name: "Shopify",
      alt: "Shopify Logo",
    },
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Technologies We Work With
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Modern tech stack for cutting-edge solutions
          </p>
        </div>

        <div className="h-[40rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
          <InfiniteMovingCards
            items={technologies}
            direction="right"
            speed="slow"
          />
        </div>
      </div>
    </section>
  );
}
