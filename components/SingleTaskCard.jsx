import React from 'react';

const getPriorityStyle = (priority) => {
  switch (priority) {
    case 1:
      return 'bg-green-100 text-green-800 border-green-300';
    case 2:
      return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    case 3:
      return 'bg-red-100 text-red-800 border-red-300';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-300';
  }
};

const SingleTaskCard = ({ task, onEdit, onDelete, onSmartAssign }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-200 space-y-3">
      
      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-800">📌 {task.title}</h3>

      {/* Description */}
      {task.description && (
        <p className="text-sm text-gray-600">
          <span className="font-medium text-gray-700">Description:</span> {task.description}
        </p>
      )}

      {/* Assigned + Priority */}
      <div className="flex justify-between items-center text-sm text-gray-700">
        <p><span className="font-medium">Assigned To:</span> {task.assigned_user || 'Unassigned'}</p>
        <span
          className={`px-2 py-0.5 rounded-full border text-xs font-medium ${getPriorityStyle(task.priority)}`}
        >
          Priority {task.priority}
        </span>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 pt-2 text-sm">
        <button
          onClick={() => onEdit(task)}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          ✏️ Edit
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className="text-red-600 hover:text-red-800 font-medium"
        >
          🗑️ Delete
        </button>
        <button
          onClick={() => onSmartAssign(task)}
          className="text-purple-600 hover:text-purple-800 font-medium"
        >
          🎯 Smart
        </button>
      </div>
    </div>
  );
};

export default SingleTaskCard;
