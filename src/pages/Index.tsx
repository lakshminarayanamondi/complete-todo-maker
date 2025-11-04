import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TodoStats } from "@/components/todo/TodoStats";
import { TodoFilters } from "@/components/todo/TodoFilters";
import { TodoItem } from "@/components/todo/TodoItem";
import { TodoDialog } from "@/components/todo/TodoDialog";
import { Todo, TodoFilters as Filters } from "@/types/todo";
import { toast } from "sonner";

const STORAGE_KEY = 'todos-app-data';

const Index = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filters, setFilters] = useState<Filters>({
    search: '',
    status: 'all',
    priority: undefined,
    category: undefined,
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  // Load todos from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      setTodos(parsed.map((t: Todo) => ({
        ...t,
        createdAt: new Date(t.createdAt),
        updatedAt: new Date(t.updatedAt),
        dueDate: t.dueDate ? new Date(t.dueDate) : undefined,
      })));
    }
  }, []);

  // Save todos to localStorage
  useEffect(() => {
    if (todos.length > 0 || localStorage.getItem(STORAGE_KEY)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    }
  }, [todos]);

  const handleSave = (data: Omit<Todo, 'id' | 'completed' | 'createdAt' | 'updatedAt'>) => {
    if (editingTodo) {
      setTodos(todos.map(t => 
        t.id === editingTodo.id 
          ? { ...editingTodo, ...data, updatedAt: new Date() }
          : t
      ));
      toast.success("Task updated successfully!");
    } else {
      const newTodo: Todo = {
        ...data,
        id: crypto.randomUUID(),
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setTodos([newTodo, ...todos]);
      toast.success("Task created successfully!");
    }
    setEditingTodo(null);
  };

  const handleToggle = (id: string) => {
    setTodos(todos.map(t => 
      t.id === id 
        ? { ...t, completed: !t.completed, updatedAt: new Date() }
        : t
    ));
  };

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setTodos(todos.filter(t => t.id !== id));
    toast.success("Task deleted successfully!");
  };

  const filteredTodos = todos.filter(todo => {
    // Search filter
    if (filters.search && !todo.title.toLowerCase().includes(filters.search.toLowerCase()) &&
        !todo.description?.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }

    // Status filter
    if (filters.status === 'active' && todo.completed) return false;
    if (filters.status === 'completed' && !todo.completed) return false;

    // Priority filter
    if (filters.priority && todo.priority !== filters.priority) return false;

    // Category filter
    if (filters.category && todo.category !== filters.category) return false;

    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              My Tasks
            </h1>
            <Button 
              onClick={() => {
                setEditingTodo(null);
                setDialogOpen(true);
              }}
              className="gap-2 shadow-medium hover:shadow-large transition-smooth"
            >
              <Plus className="h-5 w-5" />
              New Task
            </Button>
          </div>
          <p className="text-muted-foreground">
            Organize your work and life, finally.
          </p>
        </div>

        {/* Stats */}
        <TodoStats todos={todos} />

        {/* Filters */}
        <TodoFilters filters={filters} onFiltersChange={setFilters} />

        {/* Todo List */}
        <div className="space-y-3">
          {filteredTodos.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
                <Plus className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No tasks found</h3>
              <p className="text-muted-foreground mb-4">
                {todos.length === 0 
                  ? "Create your first task to get started!"
                  : "Try adjusting your filters"}
              </p>
              {todos.length === 0 && (
                <Button onClick={() => setDialogOpen(true)}>
                  Create Your First Task
                </Button>
              )}
            </div>
          ) : (
            filteredTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={handleToggle}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>

        {/* Dialog */}
        <TodoDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          onSave={handleSave}
          editingTodo={editingTodo}
        />
      </div>
    </div>
  );
};

export default Index;
