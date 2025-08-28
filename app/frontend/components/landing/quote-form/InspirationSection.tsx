import { Textarea } from "../../ui/textarea";
import { Label } from "../../ui/label";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";
import { Info } from "lucide-react";

interface InspirationSectionProps {
  inspiration: string;
  onChange: (field: string, value: string) => void;
}

export function InspirationSection({
  inspiration,
  onChange,
}: InspirationSectionProps) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <Label
          htmlFor="inspiration"
          className="block text-sm font-medium text-gray-700"
        >
          Design Inspiration (Optional)
        </Label>
        <Tooltip>
          <TooltipTrigger asChild>
            <Info className="w-4 h-4 text-gray-400 cursor-help" />
          </TooltipTrigger>
          <TooltipContent>
            <p>
              Share websites, apps, or designs you like. We'll match your
              vision.
            </p>
          </TooltipContent>
        </Tooltip>
      </div>
      <Textarea
        id="inspiration"
        name="inspiration"
        value={inspiration}
        onChange={(e) => onChange("inspiration", e.target.value)}
        rows={3}
        placeholder="Describe websites, apps, or designs you like. Include URLs if possible (e.g., 'I love the clean design of airbnb.com and the user experience of stripe.com')"
      />
    </div>
  );
}
