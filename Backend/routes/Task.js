import express from 'express';
import Todo from '../models/Todo.js';
import Log from '../models/Log.js'; 

const router = express.Router();

// GET all tasks (sorted by priority high to low)
router.get('/', async (req, res) => {
  try {
    const tasks = await Todo.find().sort({ priority: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET last 20 logs
router.get('/logs/recent', async (req, res) => {
  try {
    const logs = await Log.find().sort({ timestamp: -1 }).limit(20);
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE new task
router.post('/', async (req, res) => {
  try {
    const task = await Todo.create(req.body);

    await Log.create({
      action: `Created task "${task.title}"`,
      user: task.assigned_user || 'Unknown',
      taskId: task._id
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET single task by ID (for editing)
router.get('/:id', async (req, res) => {
  try {
    const task = await Todo.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// UPDATE task with conflict detection
router.put('/:id', async (req, res) => {
  try {
    const existing = await Todo.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: 'Task not found' });

    const clientTime = new Date(req.body.updatedAt);
    const serverTime = new Date(existing.updatedAt);

    if (clientTime < serverTime) {
      return res.status(409).json({
        message: 'Conflict detected',
        serverVersion: existing
      });
    }

    const updated = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });

    await Log.create({
      action: `Updated task "${updated.title}"`,
      user: updated.assigned_user || 'Unknown',
      taskId: updated._id
    });

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE task
router.delete('/:id', async (req, res) => {
  try {
    const task = await Todo.findByIdAndDelete(req.params.id);

    await Log.create({
      action: `Deleted task "${task.title}"`,
      user: task.assigned_user || 'Unknown',
      taskId: task._id
    });

    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// SMART ASSIGN: assign to least-loaded user
router.post('/smart-assign/:id', async (req, res) => {
  try {
    const activeTasks = await Todo.find({ status: { $ne: 'Done' } });

    const userCounts = {};
    activeTasks.forEach(t => {
      if (t.assigned_user) {
        userCounts[t.assigned_user] = (userCounts[t.assigned_user] || 0) + 1;
      }
    });

    const users = Object.keys(userCounts);
    if (users.length === 0) return res.status(400).json({ message: 'No users found for Smart Assign' });

    const leastBusyUser = users.reduce((a, b) => (userCounts[a] < userCounts[b] ? a : b));

    const updatedTask = await Todo.findByIdAndUpdate(
      req.params.id,
      { assigned_user: leastBusyUser },
      { new: true }
    );

    await Log.create({
      action: `Smart assigned task "${updatedTask.title}" to ${leastBusyUser}`,
      user: leastBusyUser,
      taskId: updatedTask._id
    });

    res.json({ message: 'Smart assigned', task: updatedTask });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
