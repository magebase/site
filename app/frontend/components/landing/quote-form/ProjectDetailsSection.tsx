import { Building } from "lucide-react";
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

interface ProjectDetailsSectionProps {
  formData: {
    useCase: string;
    priority: string;
    customizationLevel: string;
    integrationComplexity: string;
  };
  onSelectChange: (name: string, value: string) => void;
  useCaseTemplates: string[];
  priorityOptions: { value: string; label: string; description: string }[];
  customizationLevels: string[];
  integrationComplexities: string[];
}

export function ProjectDetailsSection({
  formData,
  onSelectChange,
  useCaseTemplates,
  priorityOptions,
  customizationLevels,
  integrationComplexities,
}: ProjectDetailsSectionProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <Building className="w-5 h-5 text-blue-600" />
        Project Details
      </h3>
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Label className="block text-sm font-medium text-gray-700">
              Project type *
            </Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="w-4 h-4 text-gray-400 cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Select the type of application you need built</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Select
            value={formData.useCase}
            onValueChange={(value) => onSelectChange("useCase", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select project type" />
            </SelectTrigger>
            <SelectContent>
              {useCaseTemplates.map((template) => (
                <SelectItem key={template} value={template}>
                  {template}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Label className="block text-sm font-medium text-gray-700">
              Project priority *
            </Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="w-4 h-4 text-gray-400 cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>How quickly do you need this project completed?</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="space-y-3">
            {priorityOptions.map((option) => (
              <label
                key={option.value}
                className="flex items-start space-x-3 cursor-pointer"
              >
                <input
                  type="radio"
                  name="priority"
                  value={option.value}
                  checked={formData.priority === option.value}
                  onChange={(e) => onSelectChange("priority", e.target.value)}
                  className="mt-1"
                />
                <div>
                  <div className="font-medium text-gray-900">
                    {option.label}
                  </div>
                  <div className="text-sm text-gray-500">
                    {option.description}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Label className="block text-sm font-medium text-gray-700">
              Customization level *
            </Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="w-4 h-4 text-gray-400 cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>How much customization do you need?</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Select
            value={formData.customizationLevel}
            onValueChange={(value) =>
              onSelectChange("customizationLevel", value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select customization level" />
            </SelectTrigger>
            <SelectContent>
              {customizationLevels.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Label className="block text-sm font-medium text-gray-700">
              Integration complexity *
            </Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="w-4 h-4 text-gray-400 cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>How many external services need to be integrated?</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Select
            value={formData.integrationComplexity}
            onValueChange={(value) =>
              onSelectChange("integrationComplexity", value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select integration complexity" />
            </SelectTrigger>
            <SelectContent>
              {integrationComplexities.map((complexity) => (
                <SelectItem key={complexity} value={complexity}>
                  {complexity}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
