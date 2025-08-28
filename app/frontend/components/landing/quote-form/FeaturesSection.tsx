import { Checkbox } from "../../ui/checkbox";
import { Label } from "../../ui/label";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";
import { Info } from "lucide-react";

interface FeaturesSectionProps {
  selectedFeatures: string[];
  onFeatureToggle: (feature: string) => void;
  featureLabels: { [key: string]: string };
  features: string[];
}

export function FeaturesSection({
  selectedFeatures,
  onFeatureToggle,
  featureLabels,
  features,
}: FeaturesSectionProps) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Label className="block text-sm font-medium text-gray-700">
          Select features you need ({selectedFeatures.length} selected)
        </Label>
        <Tooltip>
          <TooltipTrigger asChild>
            <Info className="w-4 h-4 text-gray-400 cursor-help" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Choose the features your app needs</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {features.map((feature) => (
          <div key={feature} className="flex items-center space-x-2">
            <Checkbox
              id={feature}
              checked={selectedFeatures.includes(feature)}
              onCheckedChange={() => onFeatureToggle(feature)}
            />
            <Label htmlFor={feature} className="text-sm">
              {featureLabels[feature] || feature}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}
