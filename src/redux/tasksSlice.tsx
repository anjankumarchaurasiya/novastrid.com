import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Utility functions for managing localStorage
function getLocalStorage<T>(key: string, defaultValue: T): T {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : defaultValue;
}

function setLocalStorage<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

// Task interface
export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

// State interface
interface TasksState {
  tasks: Task[];
  filter: 'all' | 'completed' | 'pending';
}

// Initialize localStorage with default values if empty
const initializeLocalStorage = () => {
  const existingTasks = localStorage.getItem('tasks');
  if (!existingTasks) {
    setLocalStorage('tasks', []);
  }
};

// Initialize state from localStorage
initializeLocalStorage();
const initialState: TasksState = {
  tasks: getLocalStorage<Task[]>('tasks', []),
  filter: 'all',
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<Task[]>) {
      // Check if localStorage already contains tasks before setting
      const existingTasks = getLocalStorage<Task[]>('tasks', []);
      if (existingTasks.length === 0) {
        state.tasks = action.payload;
        setLocalStorage('tasks', action.payload); // Update localStorage only if empty
      }
    },
    addTask(state, action: PayloadAction<Omit<Task, 'id'>>) {
      const newTask: Task = {
        ...action.payload,
        id: Date.now(), // Unique id generation
      };
      state.tasks.push(newTask);
      setLocalStorage('tasks', state.tasks); // Update localStorage
    },
    toggleComplete(state, action: PayloadAction<number>) {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        setLocalStorage('tasks', state.tasks); // Update localStorage
      }
    },
    deleteTask(state, action: PayloadAction<number>) {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      setLocalStorage('tasks', state.tasks); // Update localStorage
    },
    setFilter(state, action: PayloadAction<'all' | 'completed' | 'pending'>) {
      state.filter = action.payload;
    },
  },
});

export const { setTasks, addTask, toggleComplete, deleteTask, setFilter } = tasksSlice.actions;
export default tasksSlice.reducer;
