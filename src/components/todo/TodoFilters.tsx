import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TodoFilters as Filters } from "@/types/todo";
import { Button } from "@/components/ui/button";

interface TodoFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
}

export const TodoFilters = ({ filters, onFiltersChange }: TodoFiltersProps) => {
  return (
    <div className="space-y-4 mb-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search tasks..."
          value={filters.search}
          onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
          className="pl-10"
        />
      </div>
      
      <div className="flex flex-wrap gap-3">
        <div className="flex gap-2">
          <Button
            variant={filters.status === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onFiltersChange({ ...filters, status: 'all' })}
          >
            All
          </Button>
          <Button
            variant={filters.status === 'active' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onFiltersChange({ ...filters, status: 'active' })}
          >
            Active
          </Button>
          <Button
            variant={filters.status === 'completed' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onFiltersChange({ ...filters, status: 'completed' })}
          >
            Completed
          </Button>
        </div>

        <Select
          value={filters.priority || 'all'}
          onValueChange={(value) => 
            onFiltersChange({ 
              ...filters, 
              priority: value === 'all' ? undefined : value as Filters['priority']
            })
          }
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.category || 'all'}
          onValueChange={(value) => 
            onFiltersChange({ 
              ...filters, 
              category: value === 'all' ? undefined : value as Filters['category']
            })
          }
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="personal">Personal</SelectItem>
            <SelectItem value="work">Work</SelectItem>
            <SelectItem value="shopping">Shopping</SelectItem>
            <SelectItem value="health">Health</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
