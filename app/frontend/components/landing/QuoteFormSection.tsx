import { useState, useEffect } from 'react';
import { usePage, useForm } from '@inertiajs/react';
import * as z from 'zod';
import { toast } from 'sonner';
import {
  ArrowRight,
  CheckCircle,
  User,
  Mail,
  Phone,
  Shield,
  Clock,
  Star,
  Users,
  Award,
  Zap,
  Quote,
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Checkbox } from '../ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

// Zod schema for form validation (for client-side validation if needed)
const quoteFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  companyName: z.string().min(2, 'Company name must be at least 2 characters'),
  useCase: z.string().min(1, 'Please select a project type'),
  specialRequirements: z
    .string()
    .refine(
      val => val.split(/\s+/).filter(word => word.length > 0).length >= 25,
      'Please provide at least 25 words in the project requirements'
    ),
  selectedFeatures: z
    .array(z.string())
    .min(1, 'Please select at least one feature'),
  projectName: z.string().min(1, 'Project name is required'),
  // Optional fields for pricing/metadata
  velocity: z.string().optional(),
  customizationLevel: z.string().optional(),
  integrationComplexity: z.string().optional(),
  pricingModel: z.string().optional(),
  redesignCount: z.number().optional(),
  selectedLanguages: z.array(z.string()).optional(),
  selectedSocialProviders: z.array(z.string()).optional(),
  inspiration: z.string().optional(),
  deliveryAddress: z.string().optional(),
});

type QuoteFormData = z.infer<typeof quoteFormSchema>;

interface QuoteFormSectionProps {
  id?: string;
}

function QuoteFormSection({ id = 'quote-form' }: QuoteFormSectionProps) {
  const [submitted, setSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const { flash } = usePage().props as any;

  const steps = [
    {
      id: 1,
      name: 'Contact',
      fields: ['name', 'email', 'phone', 'companyName'],
    },
    {
      id: 2,
      name: 'Project',
      fields: [
        'projectName',
        'pricingModel',
        'useCase',
        'velocity',
        'customizationLevel',
        'integrationComplexity',
      ],
    },
    { id: 3, name: 'Features', fields: ['selectedFeatures'] },
    {
      id: 4,
      name: 'Details',
      fields: [
        'redesignCount',
        'specialRequirements',
        'inspiration',
        'deliveryAddress',
      ],
    },
    { id: 5, name: 'Review', fields: [] },
  ];

  const validateStep = (step: number): boolean => {
    const stepFields = steps[step - 1].fields;

    // First check if all required fields in this step are filled
    const basicValidation = stepFields.every(field => {
      if (field === 'selectedFeatures') {
        return data.selectedFeatures && data.selectedFeatures.length > 0;
      }
      if (field === 'specialRequirements') {
        return isValidWordCount(data.specialRequirements);
      }
      if (field === 'redesignCount') {
        return (
          typeof data.redesignCount === 'number' && !isNaN(data.redesignCount)
        );
      }
      if (field === 'inspiration' || field === 'deliveryAddress') {
        // These are optional fields
        return true;
      }
      const value = data[field as keyof QuoteFormData];
      return value && value.toString().trim() !== '';
    });

    // For the final step, also validate all required fields across all steps
    if (step === steps.length) {
      const allRequiredFields = [
        'name',
        'email',
        'phone',
        'companyName',
        'projectName',
        'useCase',
        'specialRequirements',
        'selectedFeatures',
      ];

      const allFieldsValid = allRequiredFields.every(field => {
        if (field === 'selectedFeatures') {
          return data.selectedFeatures && data.selectedFeatures.length > 0;
        }
        if (field === 'specialRequirements') {
          return isValidWordCount(data.specialRequirements);
        }
        const value = data[field as keyof QuoteFormData];
        return value && value.toString().trim() !== '';
      });

      return basicValidation && allFieldsValid;
    }

    return basicValidation;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
    } else {
      toast.error('Please complete all required fields before proceeding.');
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleStepClick = (stepId: number) => {
    // Allow going back to previous steps
    if (stepId < currentStep) {
      setCurrentStep(stepId);
    }
    // Allow going to next step only if current step is valid
    else if (stepId === currentStep + 1 && validateStep(currentStep)) {
      setCurrentStep(stepId);
    }
  };

  useEffect(() => {
    // Check if there's a success flash message from form submission
    if (
      flash?.notice &&
      flash.notice.includes('Quote request submitted successfully')
    ) {
      setSubmitted(true);
    }
  }, [flash]);

  const { data, setData, post, errors } = useForm<QuoteFormData>({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    useCase: '',
    velocity: '',
    specialRequirements: '',
    selectedFeatures: [],
    redesignCount: 0,
    customizationLevel: '',
    integrationComplexity: '',
    pricingModel: '',
    selectedLanguages: [],
    selectedSocialProviders: [],
    inspiration: '',
    deliveryAddress: '',
    projectName: '',
  });

  const features = [
    'user_authentication',
    'payment_processing',
    'admin_dashboard',
    'api_development',
    'real_time_features',
    'gambling_or_igaming',
    'analytics_tracking',
    'ai_ml',
    'blockchain',
    'google_play_store_ios',
    'pwa',
    'blog_cms',
    'sales_chatbot',
    'customer_support_chatbot',
    'internationalization',
    'crm',
    'social_login',
    'sso',
    'analytics_dashboard',
    'automated_digital_marketing',
    'autoblogger',
    'publisher',
  ];

  const featureLabels: { [key: string]: string } = {
    user_authentication: 'User Authentication',
    payment_processing: 'Payment Processing',
    admin_dashboard: 'Admin Dashboard',
    api_development: 'API Development',
    gambling_or_igaming: 'Gambling or iGaming',
    real_time_features: 'Real-time Features',
    analytics_tracking: 'Analytics Tracking',
    marketing: '5 High Converting, SEO Optimized Marketing Pages',
    ai_ml: 'AI/ML Features',
    blockchain: 'Blockchain Integration',
    google_play_store_ios: 'Google Play Store + iOS App Store',
    pwa: 'Progressive Web App (PWA)',
    blog_cms: 'Blog with CMS',
    sales_chatbot: 'Sales Chatbot',
    customer_support_chatbot: 'Customer Support Chatbot',
    internationalization: 'Internationalization (Multi-language)',
    crm: 'CRM System',
    social_login: 'Social Login (Google, GitHub, etc.)',
    sso: 'Single Sign-On (SSO)',
    analytics_dashboard: 'Analytics Dashboard',
    automated_digital_marketing: 'Automated Ad Media and Digital Marketing',
    autoblogger: 'Autoblogger (AI Content Generation)',
    publisher: 'Earn Ad Revenue as a Publisher',
  };

  const pricingModels = [
    {
      value: 'flat_fee',
      label: 'Flat Fee + Hosting',
      description:
        'One-time payment + monthly hosting costs + optional retainer for unlimited edits',
    },
    {
      value: 'monthly_subscription',
      label: 'Monthly Subscription',
      description:
        'Monthly fee includes full app build + 2-year minimum support with unlimited edits + 3-month bond',
    },
  ];

  const useCaseTemplates = [
    'Small Business Branded Site',
    'E-commerce',
    'Food Delivery',
    'Equipment Hire',
    'Financial Services or Banking',
    'Gambling or iGaming',
    'Digital Marketing Agency Site',
    'Cryptocurrency Exchange',
    'Fitness & Wellness',
    'Service Booking',
    'Healthcare Management System',
    'Telemedicine',
    'Educational',
    'E-learning',
    'Business Management Software',
    'Customer Relationship Management',
    'Project Management Tool',
    'Ride-Sharing',
    'Logistics & Delivery',
    'Appointment Scheduling',
    'Social Networking',
    'Video Gaming',
    'Event Management System',
    'Content Management System',
    'News Website',
    'Inventory Management System',
    'Learning Management System',
    'Property Management System',
    'Internal Tool',
    'Streaming Service',
    'Job Board',
    'Review & Rating',
    'Subscription Box Service',
    'Community Forum',
    'Custom Application',
  ];

  const velocityOptions = ['Standard', 'Fast', 'Express'];

  const customizationLevels = [
    'Basic (minimal customization)',
    'Standard (moderate customization)',
    'Advanced (extensive customization)',
    'Enterprise (full custom solution)',
  ];

  const integrationComplexities = [
    'Simple (no integrations)',
    'Moderate (1-2 integrations)',
    'Complex (3-5 integrations)',
    'Enterprise (5+ integrations)',
  ];

  useEffect(() => {
    // Initialize AOS if available
    if (typeof window !== 'undefined' && (window as any).AOS) {
      (window as any).AOS.init({ once: true, duration: 700 });
    }
  }, []);

  function getWordCount(text: string): number {
    return text
      .trim()
      .split(/\s+/)
      .filter(word => word.length > 0).length;
  }

  function isValidWordCount(text: string): boolean {
    return getWordCount(text) >= 25;
  }

  function calculateEstimatedCost() {
    let baseCost = 5000;
    const featureMultiplier = (data.selectedFeatures?.length || 0) * 500;
    const customizationMultiplier =
      customizationLevels.indexOf(data.customizationLevel || '') + 1;
    const integrationMultiplier =
      integrationComplexities.indexOf(data.integrationComplexity || '') + 1;
    const redesignCost = (data.redesignCount || 0) * 1000;

    return Math.max(
      5000,
      baseCost +
        featureMultiplier +
        customizationMultiplier * 2000 +
        integrationMultiplier * 1500 +
        redesignCost
    );
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Only allow submission on the last step
    if (currentStep !== steps.length) {
      return;
    }

    // Validate entire form with Zod before submission
    try {
      quoteFormSchema.parse(data);
    } catch (error) {
      console.error('Form validation failed:', error);
      toast.error('Please complete all required fields before submitting.');
      return;
    }

    if (!isValidWordCount(data.specialRequirements)) {
      toast.error(
        'Please provide at least 25 words in the project requirements.'
      );
      return;
    }

    // Additional validation for required fields
    const requiredFields = [
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email' },
      { key: 'phone', label: 'Phone' },
      { key: 'companyName', label: 'Company name' },
      { key: 'projectName', label: 'Project name' },
      { key: 'useCase', label: 'Project type' },
      { key: 'selectedFeatures', label: 'Features' },
    ];

    for (const field of requiredFields) {
      if (field.key === 'selectedFeatures') {
        if (!data.selectedFeatures || data.selectedFeatures.length === 0) {
          toast.error(
            `Please select at least one ${field.label.toLowerCase()}.`
          );
          return;
        }
      } else {
        const value = data[field.key as keyof QuoteFormData];
        if (!value || value.toString().trim() === '') {
          toast.error(`Please enter your ${field.label.toLowerCase()}.`);
          return;
        }
      }
    }

    // Calculate estimated cost before submission (handled on backend)
    calculateEstimatedCost();

    post('/quote_requests', {
      onSuccess: () => {
        setSubmitted(true);
      },
      onError: (errors: any) => {
        console.error('Form submission errors:', errors);
        toast.error(
          'There was an error submitting your quote request. Please try again.'
        );
      },
    });
  }

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-3xl font-bold text-gray-900 mb-4">
          📧 Proposal Sent!
        </h3>
        <p className="text-gray-600 text-lg mb-6">
          Check your email for your personalized project proposal with detailed
          timeline and pricing.
        </p>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">
            What happens next?
          </h4>
          <div className="space-y-2 text-left">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">1</span>
              </div>
              <span className="text-gray-700">
                Check your email for the proposal link
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">2</span>
              </div>
              <span className="text-gray-700">
                Click the link to view your detailed proposal
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">3</span>
              </div>
              <span className="text-gray-700">
                Review your detailed quote and project timeline
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">4</span>
              </div>
              <span className="text-gray-700">
                Schedule a call to discuss next steps
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={() => window.location.reload()}
            variant="outline"
            className="border-2"
          >
            Submit Another Project
          </Button>
          <Button
            onClick={() => window.open('mailto:hello@magebase.com', '_blank')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            Contact Support
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div id={id} className="max-w-4xl mx-auto">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 md:p-12">
        {/* Trust Signals Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-6 mb-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Shield className="w-4 h-4 text-green-600" />
              <span>100% Secure</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>Response in 1 hour</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4 text-purple-600" />
              <span>500+ Projects</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>4.9/5 Rating</span>
            </div>
          </div>

          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Get Your Custom Quote in 60 Seconds
          </h2>
          <p className="text-gray-600 text-lg mb-4">
            Join 500+ businesses who've transformed their operations with our
            solutions
          </p>

          {/* Urgency Element */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center gap-2 text-amber-800">
              <Award className="w-5 h-5" />
              <span className="font-semibold">
                FREE DETAILED QUOTE WITH PROJECT TIMELINE
              </span>
            </div>
            <p className="text-amber-700 text-sm mt-1">
              Get your personalized quote with detailed project timeline
              delivered to your email
            </p>
          </div>
        </div>

        {/* Social Proof Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-1 mb-2">
              <Quote className="w-4 h-4 text-green-600" />
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={`green-star-${i}`}
                    className="w-3 h-3 fill-current"
                  />
                ))}
              </div>
            </div>
            <p className="text-green-800 text-sm font-medium mb-1">
              "Exceeded expectations!"
            </p>
            <p className="text-green-700 text-xs">- Sarah M., CEO TechStart</p>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center gap-1 mb-2">
              <Quote className="w-4 h-4 text-blue-600" />
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={`blue-star-${i}`}
                    className="w-3 h-3 fill-current"
                  />
                ))}
              </div>
            </div>
            <p className="text-blue-800 text-sm font-medium mb-1">
              "Delivered on time & budget"
            </p>
            <p className="text-blue-700 text-xs">
              - Mike R., Founder HealthTech
            </p>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-200 rounded-lg p-4">
            <div className="flex items-center gap-1 mb-2">
              <Quote className="w-4 h-4 text-purple-600" />
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={`purple-star-${i}`}
                    className="w-3 h-3 fill-current"
                  />
                ))}
              </div>
            </div>
            <p className="text-purple-800 text-sm font-medium mb-1">
              "Outstanding quality & support"
            </p>
            <p className="text-purple-700 text-xs">
              - Jennifer L., CTO FinanceFlow
            </p>
          </div>
        </div>

        <form className="space-y-8" onSubmit={onSubmit}>
          {/* Enhanced Progress indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-gray-700">
                Step {currentStep} of {steps.length}:{' '}
                {steps[currentStep - 1].name}
              </span>
              <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                {Math.round((currentStep / steps.length) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${(currentStep / steps.length) * 100}%`,
                }}
              />
            </div>
            <div className="flex justify-between">
              {steps.map(step => (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => handleStepClick(step.id)}
                  className={`flex flex-col items-center text-xs transition-all duration-200 ${
                    step.id === currentStep
                      ? 'text-blue-600 font-medium'
                      : step.id < currentStep
                        ? 'text-green-600 font-medium cursor-pointer hover:text-green-700'
                        : 'text-gray-400 cursor-pointer hover:text-gray-600'
                  }`}
                  disabled={step.id > currentStep && !validateStep(currentStep)}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 transition-all duration-200 ${
                      step.id === currentStep
                        ? 'bg-blue-600 text-white'
                        : step.id < currentStep
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-200 text-gray-400'
                    }`}
                  >
                    {step.id < currentStep ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      step.id
                    )}
                  </div>
                  <span className="text-center">{step.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Step Content */}
          {currentStep === 1 && (
            <>
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="block text-sm font-medium text-gray-700">
                    Full name *
                  </Label>
                  <div className="relative group">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors z-10" />
                    <Input
                      type="text"
                      className="pl-10"
                      placeholder="Your full name"
                      value={data.name}
                      onChange={e => setData('name', e.target.value)}
                    />
                  </div>
                  {errors.name && (
                    <span className="text-red-600 text-sm">{errors.name}</span>
                  )}
                </div>

                <div>
                  <Label className="block text-sm font-medium text-gray-700">
                    Email address *
                  </Label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors z-10" />
                    <Input
                      type="email"
                      className="pl-10"
                      placeholder="your@email.com"
                      value={data.email}
                      onChange={e => setData('email', e.target.value)}
                    />
                  </div>
                  {errors.email && (
                    <span className="text-red-600 text-sm">{errors.email}</span>
                  )}
                </div>

                <div>
                  <Label className="block text-sm font-medium text-gray-700">
                    Phone number *
                  </Label>
                  <div className="relative group">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors z-10" />
                    <Input
                      type="tel"
                      className="pl-10"
                      placeholder="+61 XXX XXX XXX"
                      value={data.phone}
                      onChange={e => setData('phone', e.target.value)}
                    />
                  </div>
                  {errors.phone && (
                    <span className="text-red-600 text-sm">{errors.phone}</span>
                  )}
                </div>

                <div>
                  <Label className="block text-sm font-medium text-gray-700">
                    Company name *
                  </Label>
                  <Input
                    type="text"
                    placeholder="Your company name"
                    value={data.companyName}
                    onChange={e => setData('companyName', e.target.value)}
                  />
                  {errors.companyName && (
                    <span className="text-red-600 text-sm">
                      {errors.companyName}
                    </span>
                  )}
                </div>
              </div>
            </>
          )}

          {currentStep === 2 && (
            <>
              {/* Project Name */}
              <div>
                <Label className="block text-sm font-medium text-gray-700">
                  Project name *
                </Label>
                <Input
                  type="text"
                  placeholder="Enter your project name"
                  value={data.projectName}
                  onChange={e => setData('projectName', e.target.value)}
                />
                {errors.projectName && (
                  <span className="text-red-600 text-sm">
                    {errors.projectName}
                  </span>
                )}
              </div>

              {/* Pricing Model Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Pricing Model *
                </label>
                <div className="space-y-3">
                  {pricingModels.map(model => (
                    <div
                      key={model.value}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        data.pricingModel === model.value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setData('pricingModel', model.value)}
                    >
                      <div className="flex items-start">
                        <input
                          type="radio"
                          name="pricingModel"
                          value={model.value}
                          checked={data.pricingModel === model.value}
                          onChange={() => setData('pricingModel', model.value)}
                          className="mt-1 mr-3"
                        />
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {model.label}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {model.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {errors.pricingModel && (
                  <span className="text-red-600 text-sm">
                    {errors.pricingModel}
                  </span>
                )}
              </div>

              {/* Project Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="block text-sm font-medium text-gray-700">
                    Project type *
                  </Label>
                  <Select
                    value={data.useCase}
                    onValueChange={value => setData('useCase', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select project type" />
                    </SelectTrigger>
                    <SelectContent>
                      {useCaseTemplates.map(template => (
                        <SelectItem key={template} value={template}>
                          {template}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.useCase && (
                    <span className="text-red-600 text-sm">
                      {errors.useCase}
                    </span>
                  )}
                </div>

                <div>
                  <Label className="block text-sm font-medium text-gray-700">
                    Project velocity *
                  </Label>
                  <Select
                    value={data.velocity}
                    onValueChange={value => setData('velocity', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select velocity" />
                    </SelectTrigger>
                    <SelectContent>
                      {velocityOptions.map(option => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.velocity && (
                    <span className="text-red-600 text-sm">
                      {errors.velocity}
                    </span>
                  )}
                </div>

                <div>
                  <Label className="block text-sm font-medium text-gray-700">
                    Customization level *
                  </Label>
                  <Select
                    value={data.customizationLevel}
                    onValueChange={value =>
                      setData('customizationLevel', value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select customization level" />
                    </SelectTrigger>
                    <SelectContent>
                      {customizationLevels.map(level => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.customizationLevel && (
                    <span className="text-red-600 text-sm">
                      {errors.customizationLevel}
                    </span>
                  )}
                </div>

                <div>
                  <Label className="block text-sm font-medium text-gray-700">
                    Integration complexity *
                  </Label>
                  <Select
                    value={data.integrationComplexity}
                    onValueChange={value =>
                      setData('integrationComplexity', value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select integration complexity" />
                    </SelectTrigger>
                    <SelectContent>
                      {integrationComplexities.map(complexity => (
                        <SelectItem key={complexity} value={complexity}>
                          {complexity}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.integrationComplexity && (
                    <span className="text-red-600 text-sm">
                      {errors.integrationComplexity}
                    </span>
                  )}
                </div>
              </div>
            </>
          )}

          {currentStep === 3 && (
            <>
              {/* Features Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Select features you need ({data.selectedFeatures?.length || 0}{' '}
                  selected)
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {features.map((feature, index) => (
                    <div
                      key={`feature-${index}-${feature}`}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={feature}
                        checked={
                          data.selectedFeatures?.includes(feature) || false
                        }
                        onCheckedChange={checked => {
                          const currentFeatures = data.selectedFeatures || [];
                          const newFeatures = checked
                            ? [...currentFeatures, feature]
                            : currentFeatures.filter(f => f !== feature);
                          setData('selectedFeatures', newFeatures);
                        }}
                      />
                      <Label
                        htmlFor={feature}
                        className="text-sm font-normal cursor-pointer"
                      >
                        {featureLabels[feature] || feature}
                      </Label>
                    </div>
                  ))}
                </div>
                {errors.selectedFeatures && (
                  <span className="text-red-600 text-sm">
                    {errors.selectedFeatures}
                  </span>
                )}
              </div>

              {/* Internationalization - Languages */}
              {data.selectedFeatures?.includes('internationalization') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Languages for Internationalization (Select all that apply)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      'English',
                      'Spanish',
                      'French',
                      'German',
                      'Italian',
                      'Portuguese',
                      'Russian',
                      'Chinese (Simplified)',
                      'Chinese (Traditional)',
                      'Japanese',
                      'Korean',
                      'Arabic',
                      'Hindi',
                      'Dutch',
                      'Swedish',
                      'Norwegian',
                      'Danish',
                      'Finnish',
                      'Polish',
                      'Turkish',
                      'Hebrew',
                      'Thai',
                      'Vietnamese',
                      'Indonesian',
                      'Malay',
                      'Other',
                    ].map(language => (
                      <div
                        key={language}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={`lang-${language}`}
                          checked={
                            data.selectedLanguages?.includes(language) || false
                          }
                          onCheckedChange={checked => {
                            const currentLanguages =
                              data.selectedLanguages || [];
                            const updatedLanguages = checked
                              ? [...currentLanguages, language]
                              : currentLanguages.filter(
                                  lang => lang !== language
                                );
                            setData('selectedLanguages', updatedLanguages);
                          }}
                        />
                        <Label
                          htmlFor={`lang-${language}`}
                          className="text-sm font-normal cursor-pointer"
                        >
                          {language}
                        </Label>
                      </div>
                    ))}
                  </div>
                  {errors.selectedLanguages && (
                    <span className="text-red-600 text-sm">
                      {errors.selectedLanguages}
                    </span>
                  )}
                </div>
              )}

              {/* Social Login Providers */}
              {data.selectedFeatures?.includes('social_login') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Social Login Providers (Select all that apply)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      'Google',
                      'GitHub',
                      'Facebook',
                      'Twitter/X',
                      'LinkedIn',
                      'Microsoft',
                      'Apple',
                      'Discord',
                      'Twitch',
                      'Spotify',
                      'Other',
                    ].map(provider => (
                      <div
                        key={provider}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={`social-${provider}`}
                          checked={
                            data.selectedSocialProviders?.includes(provider) ||
                            false
                          }
                          onCheckedChange={checked => {
                            const currentProviders =
                              data.selectedSocialProviders || [];
                            const updatedProviders = checked
                              ? [...currentProviders, provider]
                              : currentProviders.filter(p => p !== provider);
                            setData(
                              'selectedSocialProviders',
                              updatedProviders
                            );
                          }}
                        />
                        <Label
                          htmlFor={`social-${provider}`}
                          className="text-sm font-normal cursor-pointer"
                        >
                          {provider}
                        </Label>
                      </div>
                    ))}
                  </div>
                  {errors.selectedSocialProviders && (
                    <span className="text-red-600 text-sm">
                      {errors.selectedSocialProviders}
                    </span>
                  )}
                </div>
              )}
            </>
          )}

          {currentStep === 4 && (
            <>
              {/* Redesign Count */}
              <div>
                <Label className="block text-sm font-medium text-gray-700">
                  Number of UI redesign iterations needed
                </Label>
                <Select
                  value={data.redesignCount?.toString() || '0'}
                  onValueChange={value =>
                    setData('redesignCount', Number(value))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">0 (Use our design)</SelectItem>
                    <SelectItem value="1">1 iteration</SelectItem>
                    <SelectItem value="2">2 iterations</SelectItem>
                    <SelectItem value="3">3 iterations</SelectItem>
                    <SelectItem value="5">5+ iterations</SelectItem>
                  </SelectContent>
                </Select>
                {errors.redesignCount && (
                  <span className="text-red-600 text-sm">
                    {errors.redesignCount}
                  </span>
                )}
              </div>

              {/* Project Requirements */}
              <div>
                <Label className="block text-sm font-medium text-gray-700">
                  Project requirements *
                </Label>
                <Textarea
                  rows={4}
                  className={`${
                    getWordCount(data.specialRequirements) > 0 &&
                    !isValidWordCount(data.specialRequirements)
                      ? 'border-red-300 focus:border-red-500'
                      : ''
                  }`}
                  placeholder="Describe your project requirements, features, or any specific needs..."
                  value={data.specialRequirements}
                  onChange={e => setData('specialRequirements', e.target.value)}
                />
                {getWordCount(data.specialRequirements) > 0 && (
                  <div className="mt-1 text-sm">
                    <span
                      className={
                        isValidWordCount(data.specialRequirements)
                          ? 'text-green-600'
                          : 'text-red-600'
                      }
                    >
                      {getWordCount(data.specialRequirements)} words
                      {!isValidWordCount(data.specialRequirements) &&
                        ' (minimum 25 words required)'}
                    </span>
                  </div>
                )}
                {errors.specialRequirements && (
                  <span className="text-red-600 text-sm">
                    {errors.specialRequirements}
                  </span>
                )}
              </div>

              {/* Inspiration */}
              <div>
                <Label className="block text-sm font-medium text-gray-700">
                  Inspiration (Optional)
                </Label>
                <Textarea
                  rows={3}
                  placeholder="Share any websites, apps, or designs that inspire your project..."
                  value={data.inspiration || ''}
                  onChange={e => setData('inspiration', e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Help us understand your vision by sharing examples of designs
                  or functionality you like
                </p>
                {errors.inspiration && (
                  <span className="text-red-600 text-sm">
                    {errors.inspiration}
                  </span>
                )}
              </div>

              {/* Delivery Address */}
              <div>
                <Label className="block text-sm font-medium text-gray-700">
                  Delivery Address (Optional)
                </Label>
                <Textarea
                  rows={2}
                  placeholder="Where should we deliver the project? (Physical address for any deliverables)"
                  value={data.deliveryAddress || ''}
                  onChange={e => setData('deliveryAddress', e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1">
                  If you need physical deliverables or have a preferred delivery
                  location
                </p>
                {errors.deliveryAddress && (
                  <span className="text-red-600 text-sm">
                    {errors.deliveryAddress}
                  </span>
                )}
              </div>
            </>
          )}

          {currentStep === 5 && (
            <>
              {/* Review & Submit */}
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-6 shadow-sm">
                  <div className="text-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Ready to Get Your Quote?
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Review your information and submit your project details
                    </p>
                  </div>

                  {/* Summary */}
                  <div className="bg-white rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Project Summary
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Contact:</span>
                        <span className="font-medium">
                          {data.name} ({data.companyName})
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Project Type:</span>
                        <span className="font-medium">
                          {data.useCase || 'Not selected'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Features:</span>
                        <span className="font-medium">
                          {data.selectedFeatures?.length || 0} selected
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Timeline:</span>
                        <span className="font-medium">
                          {data.velocity || 'Not selected'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Estimated Cost:</span>
                        <span className="font-medium text-green-600">
                          ${calculateEstimatedCost().toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-center space-y-4">
                    <div className="text-center">
                      <p className="text-lg font-semibold text-gray-900 mb-2">
                        📧 Check your email after submission
                      </p>
                      <p className="text-gray-600 text-sm">
                        We'll send you a secure link to view your detailed
                        project proposal
                      </p>
                    </div>
                    <p className="text-xs text-gray-500">
                      Your proposal will include project timeline, detailed
                      breakdown, and next steps
                    </p>

                    {/* Risk Reversal */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                      <div className="flex items-center justify-center gap-2 text-green-800 mb-2">
                        <Shield className="w-5 h-5" />
                        <span className="font-semibold">
                          MVP 100% GUARANTEE IN 30 DAYS
                        </span>
                      </div>
                      <p className="text-green-700 text-sm">
                        Get your minimum viable product delivered within 30 days
                        or your money back, guaranteed.
                      </p>
                    </div>

                    <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
                      <Clock className="w-4 h-4" />
                      No commitment required • Response within 1 hour • Free
                      consultation
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="flex items-center gap-2"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              Back
            </Button>

            <div className="flex gap-3">
              {currentStep < steps.length ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  disabled={!validateStep(currentStep)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 flex items-center gap-2"
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={!validateStep(currentStep)}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold px-8 py-3 flex items-center gap-2"
                >
                  📧 Send Me My Quote
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default QuoteFormSection;
