import React from 'react';
import type { Task } from '../types';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  return (
    <div className={`task-item ${task.isCompleted ? 'completed' : ''}`}>
      <div className="task-content">
        <input
          type="checkbox"
          checked={task.isCompleted}
          onChange={() => onToggle(task.id)}
          className="task-checkbox"
        />
        <span className="task-description">{task.description}</span>
      </div>
      <button
        onClick={() => onDelete(task.id)}
        className="delete-button"
        aria-label="Delete task"
      >
        Delete
      </button>
    </div>
  );
};

export default TaskItem;