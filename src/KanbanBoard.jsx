import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import TaskCard from '../components/TaskCard.jsx';
import { useNavigate } from 'react-router-dom';


const KanbanBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [grouped, setGrouped] = useState({ Todo: [], 'In Progress': [], Done: [] });
  const [logs, setLogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/tasks', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await res.json();
        setTasks(data);

        // Group by status
        const groupedTasks = { Todo: [], 'In Progress': [], Done: [] };
        data.forEach(task => {
          if (groupedTasks[task.status]) {
            groupedTasks[task.status].push(task);
          }
        });
        setGrouped(groupedTasks);
      } catch (err) {
        console.error('Failed to fetch tasks:', err);
      }
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/tasks/logs/recent');
        const data = await res.json();
        setLogs(data.slice(0, 5));
        // console.log('Fetched logs:', data);
      } catch (err) {
        console.error('Failed to fetch logs:', err);
      }
    };
    fetchLogs();
  }, []);

  const handleEdit = (task) => {
    console.log('Edit clicked for', task);
    // implement edit logic
    navigate(`/edit/${task._id}`);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setTasks(prev => prev.filter(task => task._id !== id));
      setGrouped(prev => {
        const updated = { ...prev };
        for (const status in updated) {
          updated[status] = updated[status].filter(task => task._id !== id);
        }
        return updated;
      });
    } catch (err) {
      console.error('Failed to delete task:', err);
    }
  };

  const handleSmartAssign = async (task) => {
    console.log('Smart assign clicked for', task);
    // implement smart-assign logic
  };

  return (
    <>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100 px-4 py-8 min-h-screen">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-800 mb-6 drop-shadow-lg">
            Your Kanban Board
          </h1>
          <div className="w-full max-w-4xl mx-auto mb-12">
            <TaskCard
              tasksByStatus={grouped}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onSmartAssign={handleSmartAssign}
            />
          </div>

          {/* Activity Log Preview */}
          {/* <aside className="w-full max-w-2xl mx-auto bg-white/90 rounded-xl shadow-lg p-6 mb-8">
            <h3 className="font-semibold text-gray-700 mb-3">Recent Activity (Last 5)</h3>
            {logs.length === 0 ? (
              <p className="text-gray-500 italic text-sm">No recent activity to show.</p>
            ) : (
              <ul className="text-sm text-gray-600 space-y-1 max-h-[300px] overflow-y-auto">
                {logs.map((log, i) => (
                  <li key={log._id || i} className="flex items-center gap-2">
                    <span className="font-bold text-blue-600">{log.user || 'Unknown User'}</span>
                    <span>{log.action || 'performed an action'}</span>
                    <span className="ml-auto text-xs text-gray-400">
                      {log.timestamp ? new Date(log.timestamp).toLocaleString() : ''}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </aside> */}
          {/* Create Todo Button */}
          <div className="flex justify-center mt-4">
            <button
              onClick={() => navigate('/create')}
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition duration-200"
            >
              + Create New Task
            </button>
          </div>

        </main>
        <Footer />
      </div>
    </>
  );
};

export default KanbanBoard;
