import { Zap } from "lucide-react";

export function AnnouncementBar() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-3 px-4">
      <div className="flex items-center justify-center gap-2 text-sm">
        <Zap className="w-4 h-4" />
        <span>Limited time: Free consultation + project planning session</span>
      </div>
    </div>
  );
}
