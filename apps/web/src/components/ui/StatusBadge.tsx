import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: 'active' | 'archived' | 'on-hold' | 'online' | 'offline';
  className?: string;
}

const statusStyles = {
  active: "status-online",
  online: "status-online", 
  archived: "bg-muted text-muted-foreground",
  'on-hold': "status-warning",
  offline: "status-error",
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span className={cn(
      "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
      statusStyles[status],
      className
    )}>
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 opacity-75" />
      {status}
    </span>
  );
}