import express from 'express'
import mongoose from 'mongoose'
import taskRoutes from './routes/Task.js'
import authRoutes from './routes/Auth.js'
import cors from 'cors'

const app = express()
const port = 3000

// Connect to MongoDB
await mongoose.connect('mongodb://localhost:27017/todo_board')

app.use(cors())

// Middleware to parse JSON
app.use(express.json())

// Use the task and auth routes
app.use('/api/tasks', taskRoutes)
app.use('/api/auth', authRoutes)

// Root route (optional)
app.get('/', (req, res) => {
  res.send('Hello World !')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})