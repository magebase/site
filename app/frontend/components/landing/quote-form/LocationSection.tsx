import { MapPin } from "lucide-react";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";
import { Info } from "lucide-react";

interface LocationSectionProps {
  deliveryAddress: string;
  onChange: (field: string, value: string) => void;
}

export function LocationSection({
  deliveryAddress,
  onChange,
}: LocationSectionProps) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <Label className="block text-sm font-medium text-gray-700">
          Company location *
        </Label>
        <Tooltip>
          <TooltipTrigger asChild>
            <Info className="w-4 h-4 text-gray-400 cursor-help" />
          </TooltipTrigger>
          <TooltipContent>
            <p>
              Used for timezone coordination and legal compliance (GDPR, etc.)
            </p>
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="relative">
        <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
        <Input
          name="deliveryAddress"
          value={deliveryAddress}
          onChange={(e) => onChange("deliveryAddress", e.target.value)}
          required
          className="pl-10"
          placeholder="City, State/Country or 'Remote'"
        />
      </div>
    </div>
  );
}
