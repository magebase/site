import { Checkbox } from "../../ui/checkbox";
import { Label } from "../../ui/label";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";
import { Info } from "lucide-react";

interface LanguagesSectionProps {
  selectedLanguages: string[];
  onLanguageToggle: (language: string) => void;
}

const languages = [
  "English",
  "Spanish",
  "French",
  "German",
  "Italian",
  "Portuguese",
  "Russian",
  "Chinese (Simplified)",
  "Chinese (Traditional)",
  "Japanese",
  "Korean",
  "Arabic",
  "Hindi",
  "Dutch",
  "Swedish",
  "Norwegian",
  "Danish",
  "Finnish",
  "Polish",
  "Turkish",
  "Hebrew",
  "Thai",
  "Vietnamese",
  "Indonesian",
  "Malay",
  "Other",
];

export function LanguagesSection({
  selectedLanguages,
  onLanguageToggle,
}: LanguagesSectionProps) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Label className="block text-sm font-medium text-gray-700">
          Languages for Internationalization (Select all that apply)
        </Label>
        <Tooltip>
          <TooltipTrigger asChild>
            <Info className="w-4 h-4 text-gray-400 cursor-help" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Select languages your app needs to support</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {languages.map((language) => (
          <div key={language} className="flex items-center space-x-2">
            <Checkbox
              id={`lang-${language}`}
              checked={selectedLanguages.includes(language)}
              onCheckedChange={() => onLanguageToggle(language)}
            />
            <Label htmlFor={`lang-${language}`} className="text-sm">
              {language}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}
