import { CheckCircle, Shield, Clock } from "lucide-react";

export function BenefitsSidebar() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Why Choose Us?
        </h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-gray-700">
              Get your personalized quote in seconds
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-gray-700">
              AI-powered project planning
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-gray-700">
              Transparent pricing, no hidden fees
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-gray-700">
              Work begins immediately after payment
            </span>
          </li>
        </ul>
      </div>

      <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-green-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            Quality Guarantee
          </h3>
        </div>
        <p className="text-sm text-gray-700 mb-4">
          Professional development with modern technologies and best practices.
        </p>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">100%</div>
          <div className="text-xs text-gray-600">Satisfaction Focused</div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            Instant Response
          </h3>
        </div>
        <p className="text-sm text-gray-700">
          Get your personalized quote in seconds, not weeks like other agencies.
        </p>
      </div>
    </div>
  );
}
