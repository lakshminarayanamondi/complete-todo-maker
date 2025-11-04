import { CheckCircle2, Circle, AlertCircle, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Todo } from "@/types/todo";

interface TodoStatsProps {
  todos: Todo[];
}

export const TodoStats = ({ todos }: TodoStatsProps) => {
  const total = todos.length;
  const completed = todos.filter(t => t.completed).length;
  const active = total - completed;
  const highPriority = todos.filter(t => t.priority === 'high' && !t.completed).length;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  const stats = [
    {
      label: "Total Tasks",
      value: total,
      icon: Circle,
      color: "text-primary"
    },
    {
      label: "Active",
      value: active,
      icon: AlertCircle,
      color: "text-info"
    },
    {
      label: "Completed",
      value: completed,
      icon: CheckCircle2,
      color: "text-success"
    },
    {
      label: "Completion",
      value: `${completionRate}%`,
      icon: TrendingUp,
      color: "text-secondary"
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label} className="p-4 shadow-soft hover:shadow-medium transition-smooth">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              <Icon className={`h-8 w-8 ${stat.color}`} />
            </div>
          </Card>
        );
      })}
    </div>
  );
};
