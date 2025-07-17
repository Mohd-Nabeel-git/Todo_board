import React from 'react';
import SingleTaskCard from './SingleTaskCard';

const TaskCard = ({ tasksByStatus, onEdit, onDelete, onSmartAssign }) => {
  const columns = ['Todo', 'In Progress', 'Done'];

  const columnStyles = {
    'Todo': {
      bg: 'bg-blue-50',
      text: 'text-blue-700',
      border: 'border-blue-300',
    },
    'In Progress': {
      bg: 'bg-yellow-50',
      text: 'text-yellow-700',
      border: 'border-yellow-300',
    },
    'Done': {
      bg: 'bg-green-50',
      text: 'text-green-700',
      border: 'border-green-300',
    },
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6">
      {columns.map((status) => (
        <div
          key={status}
          className={`p-4 rounded-xl shadow-md border ${columnStyles[status].bg} ${columnStyles[status].border}`}
        >
          <h2 className={`text-xl font-bold mb-4 text-center ${columnStyles[status].text}`}>
            {status}
          </h2>

          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            {tasksByStatus?.[status]?.length ? (
              tasksByStatus[status].map((task) => (
                <SingleTaskCard
                  key={task._id}
                  task={task}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onSmartAssign={onSmartAssign}
                />
              ))
            ) : (
              <p className="text-sm text-gray-400 text-center italic">No tasks</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskCard;
