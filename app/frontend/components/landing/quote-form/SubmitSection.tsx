import { Button } from "../../ui/button";
import { ArrowRight } from "lucide-react";

interface SubmitSectionProps {
  estimatedQuote: any;
  isSubmitting: boolean;
  selectedFeatures: string[];
  priority: string;
  specialRequirements: string;
  isValidWordCount: (text: string) => boolean;
  onGetQuote: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function SubmitSection({
  estimatedQuote,
  isSubmitting,
  selectedFeatures,
  priority,
  specialRequirements,
  isValidWordCount,
  onGetQuote,
  onSubmit,
}: SubmitSectionProps) {
  return (
    <div className="text-center pt-4 space-y-3">
      {!estimatedQuote && (
        <Button
          type="button"
          onClick={onGetQuote}
          disabled={
            isSubmitting ||
            selectedFeatures.length === 0 ||
            !isValidWordCount(specialRequirements) ||
            !priority
          }
          size="lg"
          variant="outline"
        >
          {isSubmitting ? "Calculating..." : "Get Quote"}
        </Button>
      )}
      {!estimatedQuote && selectedFeatures.length === 0 && (
        <p className="text-xs text-red-600">
          Please select at least one feature to get a quote
        </p>
      )}
      {!estimatedQuote && !priority && selectedFeatures.length > 0 && (
        <p className="text-xs text-red-600">
          Please select a project priority to get a quote
        </p>
      )}
      {!estimatedQuote &&
        !isValidWordCount(specialRequirements) &&
        selectedFeatures.length > 0 &&
        priority && (
          <p className="text-xs text-red-600">
            Please provide at least 25 words describing your project
            requirements
          </p>
        )}
      {estimatedQuote && (
        <Button
          type="submit"
          size="lg"
          className="w-full md:w-auto"
          onClick={onSubmit}
        >
          Submit Project Request
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      )}
      <p className="text-sm text-gray-500">
        No commitment required • Get your personalized quote in seconds
      </p>
    </div>
  );
}
