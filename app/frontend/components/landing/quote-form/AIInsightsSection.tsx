import { Info } from "lucide-react";

interface AIInsightsSectionProps {
  aiInsights: any[];
}

export function AIInsightsSection({ aiInsights }: AIInsightsSectionProps) {
  if (!aiInsights || aiInsights.length === 0) return null;

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
        <Info className="w-4 h-4" />
        AI Project Insights
      </h3>
      <div className="space-y-3">
        {aiInsights.map((insight, index) => (
          <div key={index} className="text-sm text-blue-800">
            <div className="font-medium">{insight.title}</div>
            <div className="text-blue-700">{insight.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
