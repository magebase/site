import { Label } from "../../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";
import { Info } from "lucide-react";

interface RedesignSectionProps {
  redesignCount: number;
  onSelectChange: (name: string, value: string) => void;
}

export function RedesignSection({
  redesignCount,
  onSelectChange,
}: RedesignSectionProps) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <Label className="block text-sm font-medium text-gray-700">
          Number of UI redesign iterations needed
        </Label>
        <Tooltip>
          <TooltipTrigger asChild>
            <Info className="w-4 h-4 text-gray-400 cursor-help" />
          </TooltipTrigger>
          <TooltipContent>
            <p>How many times do you want to revise the design?</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <Select
        value={redesignCount.toString()}
        onValueChange={(value) => onSelectChange("redesignCount", value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select redesign count" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0">0 (Use our design)</SelectItem>
          <SelectItem value="1">1 iteration</SelectItem>
          <SelectItem value="2">2 iterations</SelectItem>
          <SelectItem value="3">3 iterations</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
