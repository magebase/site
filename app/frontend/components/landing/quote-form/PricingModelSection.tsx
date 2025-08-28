import { Label } from "../../ui/label";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";
import { Info } from "lucide-react";

interface PricingModel {
  value: string;
  label: string;
  description: string;
}

interface PricingModelSectionProps {
  pricingModel: string;
  onSelectChange: (name: string, value: string) => void;
  pricingModels: PricingModel[];
}

export function PricingModelSection({
  pricingModel,
  onSelectChange,
  pricingModels,
}: PricingModelSectionProps) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Label className="block text-sm font-medium text-gray-700">
          Pricing Model *
        </Label>
        <Tooltip>
          <TooltipTrigger asChild>
            <Info className="w-4 h-4 text-gray-400 cursor-help" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Choose how you'd like to pay for your project</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="space-y-3">
        {pricingModels.map((model) => (
          <label
            key={model.value}
            className="flex items-start space-x-3 cursor-pointer"
          >
            <input
              type="radio"
              name="pricingModel"
              value={model.value}
              checked={pricingModel === model.value}
              onChange={(e) => onSelectChange("pricingModel", e.target.value)}
              className="mt-1"
            />
            <div>
              <div className="font-medium text-gray-900">{model.label}</div>
              <div className="text-sm text-gray-500">{model.description}</div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
