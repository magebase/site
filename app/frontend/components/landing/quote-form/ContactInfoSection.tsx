import { User, Mail, Phone } from "lucide-react";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";
import { Info } from "lucide-react";

interface ContactInfoSectionProps {
  formData: {
    name: string;
    email: string;
    phone: string;
    companyName: string;
  };
  onChange: (field: string, value: string) => void;
}

export function ContactInfoSection({
  formData,
  onChange,
}: ContactInfoSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Full name *
          </Label>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="w-4 h-4 text-gray-400 cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Your full legal name for the project contract</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={(e) => onChange("name", e.target.value)}
            required
            className="pl-10"
            placeholder="Your full name"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-2">
          <Label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email address *
          </Label>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="w-4 h-4 text-gray-400 cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              <p>We'll use this to send your quote and project updates</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={(e) => onChange("email", e.target.value)}
            required
            className="pl-10"
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-2">
          <Label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Phone number *
          </Label>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="w-4 h-4 text-gray-400 cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              <p>For urgent project discussions and WhatsApp updates</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            required
            className="pl-10"
            placeholder="+61 XXX XXX XXX"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-2">
          <Label
            htmlFor="companyName"
            className="block text-sm font-medium text-gray-700"
          >
            Company name *
          </Label>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="w-4 h-4 text-gray-400 cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              <p>The company this project is for</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <Input
          id="companyName"
          name="companyName"
          value={formData.companyName}
          onChange={(e) => onChange("companyName", e.target.value)}
          required
          placeholder="Your company name"
        />
      </div>
    </div>
  );
}
