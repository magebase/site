import { Zap } from "lucide-react";

export function AnnouncementBar() {
  return (
    <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white text-center py-2 px-4">
      <div className="flex items-center justify-center gap-2 text-xs sm:text-sm">
        <Zap className="w-3 h-3 sm:w-4 sm:h-4 animate-pulse" />
        <span className="font-semibold">⚡ FREE AI Planning</span>
        <span className="hidden sm:inline">+ Instant Quotes</span>
        <span className="sm:hidden">Available</span>
      </div>
    </div>
  );
}
