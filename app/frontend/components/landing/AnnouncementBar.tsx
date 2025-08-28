import { Zap, Clock } from "lucide-react";

export function AnnouncementBar() {
  return (
    <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white text-center py-3 px-4">
      <div className="flex items-center justify-center gap-2 text-sm">
        <Zap className="w-4 h-4 animate-pulse" />
        <span className="font-semibold">⚡ LIMITED TIME:</span>
        <span>
          Free AI project planning + Get your personalized quote in seconds
        </span>
        <Clock className="w-4 h-4 ml-2" />
        <span className="font-semibold">Only 3 spots left this month!</span>
      </div>
    </div>
  );
}
