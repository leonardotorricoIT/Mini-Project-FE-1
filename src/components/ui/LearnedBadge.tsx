import { CheckCircle } from "lucide-react";

function LearnedBadge({ size = 12 }: { size?: number }) {
  return (
    <span className="text-xs text-green-600 font-bold flex items-center gap-1">
      <CheckCircle size={size} /> Learned
    </span>
  );
}

export default LearnedBadge;
