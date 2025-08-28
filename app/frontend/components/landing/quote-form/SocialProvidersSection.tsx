import { Checkbox } from "../../ui/checkbox";
import { Label } from "../../ui/label";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";
import { Info } from "lucide-react";

interface SocialProvidersSectionProps {
  selectedSocialProviders: string[];
  onProviderToggle: (provider: string) => void;
}

const providers = [
  "Google",
  "GitHub",
  "Facebook",
  "Twitter/X",
  "LinkedIn",
  "Microsoft",
  "Apple",
  "Discord",
  "Slack",
  "Twitch",
  "Spotify",
  "Other",
];

export function SocialProvidersSection({
  selectedSocialProviders,
  onProviderToggle,
}: SocialProvidersSectionProps) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Label className="block text-sm font-medium text-gray-700">
          Social Login Providers (Select all that apply)
        </Label>
        <Tooltip>
          <TooltipTrigger asChild>
            <Info className="w-4 h-4 text-gray-400 cursor-help" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Select social platforms for user login</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {providers.map((provider) => (
          <div key={provider} className="flex items-center space-x-2">
            <Checkbox
              id={`provider-${provider}`}
              checked={selectedSocialProviders.includes(provider)}
              onCheckedChange={() => onProviderToggle(provider)}
            />
            <Label htmlFor={`provider-${provider}`} className="text-sm">
              {provider}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}
