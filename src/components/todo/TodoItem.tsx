import { useState } from "react";
import { Calendar, Edit2, Trash2, MoreVertical } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Todo } from "@/types/todo";
import { format } from "date-fns";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

const priorityColors = {
  low: "bg-priority-low text-white",
  medium: "bg-priority-medium text-white",
  high: "bg-priority-high text-white"
};

const categoryColors = {
  personal: "bg-primary/10 text-primary",
  work: "bg-secondary/10 text-secondary",
  shopping: "bg-warning/10 text-warning-foreground",
  health: "bg-success/10 text-success",
  other: "bg-muted text-muted-foreground"
};

export const TodoItem = ({ todo, onToggle, onEdit, onDelete }: TodoItemProps) => {
  const [isChecking, setIsChecking] = useState(false);

  const handleToggle = () => {
    setIsChecking(true);
    setTimeout(() => {
      onToggle(todo.id);
      setIsChecking(false);
    }, 300);
  };

  return (
    <Card className={`p-4 shadow-soft hover:shadow-medium transition-smooth ${
      isChecking ? 'scale-[0.98]' : ''
    } ${todo.completed ? 'opacity-60' : ''}`}>
      <div className="flex items-start gap-3">
        <Checkbox
          checked={todo.completed}
          onCheckedChange={handleToggle}
          className="mt-1"
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className={`font-medium ${todo.completed ? 'line-through text-muted-foreground' : ''}`}>
              {todo.title}
            </h3>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(todo)}>
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => onDelete(todo.id)}
                  className="text-destructive"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {todo.description && (
            <p className={`text-sm mb-3 ${todo.completed ? 'line-through text-muted-foreground' : 'text-muted-foreground'}`}>
              {todo.description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-2">
            <Badge className={priorityColors[todo.priority]} variant="secondary">
              {todo.priority}
            </Badge>
            <Badge className={categoryColors[todo.category]} variant="secondary">
              {todo.category}
            </Badge>
            {todo.dueDate && (
              <Badge variant="outline" className="gap-1">
                <Calendar className="h-3 w-3" />
                {format(new Date(todo.dueDate), 'MMM dd')}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
