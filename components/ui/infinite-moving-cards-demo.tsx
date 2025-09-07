'use client';

import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards';

export function InfiniteMovingCardsDemo() {
  return (
    <div className="h-[40rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <h2 className="text-3xl font-bold text-center mb-8 text-neutral-800 dark:text-white">
        Technologies We Work With
      </h2>
      <InfiniteMovingCards
        items={[
          {
            image: 'https://commons.wikimedia.org/wiki/File:React-icon.svg',
            name: 'React',
            alt: 'React Logo',
          },
          {
            image: 'https://en.wikipedia.org/wiki/File:Ruby_On_Rails_Logo.svg',
            name: 'Ruby on Rails',
            alt: 'Ruby on Rails Logo',
          },
          {
            image: 'https://seeklogo.com/vector-logo/428028/github-actions',
            name: 'GitHub Actions',
            alt: 'GitHub Actions Logo',
          },
          {
            image:
              'https://commons.wikimedia.org/wiki/File:Kubernetes_logo.svg',
            name: 'Kubernetes',
            alt: 'Kubernetes Logo',
          },
          {
            image:
              'https://commons.wikimedia.org/wiki/File:Amazon_Web_Services_Logo.svg',
            name: 'AWS',
            alt: 'Amazon Web Services Logo',
          },
          {
            image:
              'https://commons.wikimedia.org/wiki/File:Cloudflare_Logo.svg',
            name: 'Cloudflare',
            alt: 'Cloudflare Logo',
          },
          {
            image: 'https://commons.wikimedia.org/wiki/File:Terraform_Logo.svg',
            name: 'Terraform',
            alt: 'Terraform Logo',
          },
          {
            image: 'https://www.docker.com/company/newsroom/media-resources/',
            name: 'Docker',
            alt: 'Docker Logo',
          },
          {
            image:
              'https://commons.wikimedia.org/wiki/File:Logo_PostgreSQL.png',
            name: 'PostgreSQL',
            alt: 'PostgreSQL Logo',
          },
          {
            image: 'https://techicons.dev/icons/argocd',
            name: 'ArgoCD',
            alt: 'ArgoCD Logo',
          },
          {
            image: 'https://commons.wikimedia.org/wiki/File:Grafana_logo.png',
            name: 'Grafana',
            alt: 'Grafana Logo',
          },
        ]}
        direction="right"
        speed="slow"
      />
    </div>
  );
}
