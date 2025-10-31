import { useState, useEffect } from 'react';
import type { Task, FilterType } from './types';
import { taskApi } from './services/taskService';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskFilter from './components/TaskFilter';
import './App.css';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load tasks from API
  useEffect(() => {
    loadTasks();
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await taskApi.getAllTasks();
      setTasks(data);
    } catch (err) {
      setError('Failed to load tasks. Please try again.');
      console.error('Error loading tasks:', err);
      
      // Try to load from localStorage as fallback
      const savedTasks = localStorage.getItem('tasks');
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (description: string) => {
    try {
      setError(null);
      const newTask = await taskApi.createTask(description);
      setTasks([...tasks, newTask]);
    } catch (err) {
      setError('Failed to add task. Please try again.');
      console.error('Error adding task:', err);
    }
  };

  const toggleTask = async (id: string) => {
    try {
      setError(null);
      const task = tasks.find(t => t.id === id);
      if (!task) return;

      const updatedTask = await taskApi.updateTask(id, {
        ...task,
        isCompleted: !task.isCompleted,
      });

      setTasks(tasks.map(t => (t.id === id ? updatedTask : t)));
    } catch (err) {
      setError('Failed to update task. Please try again.');
      console.error('Error updating task:', err);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      setError(null);
      await taskApi.deleteTask(id);
      setTasks(tasks.filter(t => t.id !== id));
    } catch (err) {
      setError('Failed to delete task. Please try again.');
      console.error('Error deleting task:', err);
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.isCompleted;
    if (filter === 'completed') return task.isCompleted;
    return true;
  });

  return (
    <div className="app-container">
      <div className="app-content">
        <h1 className="app-title">Task Manager</h1>
        
        {error && (
          <div className="error-message">
            {error}
            <button onClick={() => setError(null)} className="error-close">×</button>
          </div>
        )}

        <TaskForm onAddTask={addTask} />
        
        <TaskFilter currentFilter={filter} onFilterChange={setFilter} />

        {loading ? (
          <div className="loading">Loading tasks...</div>
        ) : (
          <TaskList
            tasks={filteredTasks}
            onToggleTask={toggleTask}
            onDeleteTask={deleteTask}
          />
        )}

        <div className="task-summary">
          <span>{tasks.filter(t => !t.isCompleted).length} active tasks</span>
          <span>{tasks.filter(t => t.isCompleted).length} completed</span>
        </div>
      </div>
    </div>
  );
}

export default App;