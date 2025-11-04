export type Priority = 'low' | 'medium' | 'high';
export type Category = 'personal' | 'work' | 'shopping' | 'health' | 'other';

export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: Priority;
  category: Category;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface TodoFilters {
  search: string;
  status: 'all' | 'active' | 'completed';
  priority?: Priority;
  category?: Category;
}
