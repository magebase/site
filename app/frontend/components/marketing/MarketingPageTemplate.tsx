interface MarketingPageTemplateProps {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  ctaText: string;
  useCase: string;
}

function MarketingPageTemplate({
  title,
  subtitle,
  description,
  features,
  ctaText
}: MarketingPageTemplateProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
      <p>{description}</p>
      <ul>
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      <button>{ctaText}</button>
    </div>
  );
}

export default MarketingPageTemplate;
