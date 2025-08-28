import { Button } from "../../ui/button";
import { RefreshCw } from "lucide-react";

interface CostEstimateSectionProps {
  estimatedQuote: any;
  isCalculating: boolean;
  quoteNeedsRefresh: boolean;
  selectedFeatures: string[];
  priority: string;
  specialRequirements: string;
  isValidWordCount: (text: string) => boolean;
  onGetQuote: () => void;
  onRefreshQuote: () => void;
}

export function CostEstimateSection({
  estimatedQuote,
  isCalculating,
  quoteNeedsRefresh,
  selectedFeatures,
  priority,
  specialRequirements,
  isValidWordCount,
  onGetQuote,
  onRefreshQuote,
}: CostEstimateSectionProps) {
  if (selectedFeatures.length === 0) return null;

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="font-semibold text-gray-900 mb-2">Estimated Cost</h3>
      {estimatedQuote ? (
        <div className="space-y-4">
          {estimatedQuote.pricing_model === "flat_fee" ? (
            <div>
              <div className="text-2xl font-bold text-blue-600">
                ${estimatedQuote.total_cost?.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">
                One-time payment + $
                {estimatedQuote.monthly_hosting?.toLocaleString()}/month hosting
              </div>
            </div>
          ) : (
            <div>
              <div className="text-2xl font-bold text-blue-600">
                ${estimatedQuote.monthly_fee?.toLocaleString()}/month
              </div>
              <div className="text-sm text-gray-600">
                + 3-month setup fee of $
                {estimatedQuote.setup_fee?.toLocaleString()}
              </div>
            </div>
          )}

          <div className="text-sm text-gray-600">
            <div>Timeline: {estimatedQuote.timeline} weeks</div>
            <div>Delivery: {estimatedQuote.delivery_date}</div>
          </div>

          {quoteNeedsRefresh && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800 mb-2">
                Quote parameters have changed. Refresh for updated estimate.
              </p>
              <Button
                onClick={onRefreshQuote}
                size="sm"
                variant="outline"
                className="border-yellow-300 text-yellow-700 hover:bg-yellow-50"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh Quote
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          {!priority && selectedFeatures.length > 0 && (
            <p className="text-sm text-red-600">
              Please select a project priority to get a quote
            </p>
          )}
          {!isValidWordCount(specialRequirements) &&
            selectedFeatures.length > 0 &&
            priority && (
              <p className="text-sm text-red-600">
                Please provide at least 25 words describing your project
                requirements
              </p>
            )}
          {selectedFeatures.length > 0 &&
            priority &&
            isValidWordCount(specialRequirements) && (
              <Button
                type="button"
                onClick={onGetQuote}
                disabled={isCalculating}
                size="sm"
                variant="outline"
              >
                {isCalculating ? "Calculating..." : "Get Quote Estimate"}
              </Button>
            )}
        </div>
      )}
    </div>
  );
}
