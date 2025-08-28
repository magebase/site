import { Textarea } from "../../ui/textarea";
import { Label } from "../../ui/label";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";

interface RequirementsSectionProps {
  specialRequirements: string;
  onChange: (field: string, value: string) => void;
  getWordCount: (text: string) => number;
  isValidWordCount: (text: string) => boolean;
}

export function RequirementsSection({
  specialRequirements,
  onChange,
  getWordCount,
  isValidWordCount,
}: RequirementsSectionProps) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <Label
          htmlFor="specialRequirements"
          className="block text-sm font-medium text-gray-700"
        >
          Project requirements *
        </Label>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="w-4 h-4 text-gray-400 cursor-help">?</div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Describe your project in detail (minimum 25 words)</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <Textarea
        id="specialRequirements"
        name="specialRequirements"
        value={specialRequirements}
        onChange={(e) => onChange("specialRequirements", e.target.value)}
        rows={4}
        placeholder="Describe your project requirements, features, technologies you prefer, or any specific needs..."
        className={
          getWordCount(specialRequirements) > 0 &&
          !isValidWordCount(specialRequirements)
            ? "border-red-300 focus:border-red-500"
            : ""
        }
      />
      {getWordCount(specialRequirements) > 0 && (
        <div className="mt-1 text-sm">
          <span
            className={
              isValidWordCount(specialRequirements)
                ? "text-green-600"
                : "text-red-600"
            }
          >
            {getWordCount(specialRequirements)} words
          </span>
          {!isValidWordCount(specialRequirements) && (
            <span className="text-red-600"> (minimum 25 words required)</span>
          )}
        </div>
      )}
    </div>
  );
}
