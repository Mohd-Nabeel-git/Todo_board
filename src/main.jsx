import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Login from './Login.jsx'
import KanbanBoard from './KanbanBoard.jsx'
import Activity from './Activity.jsx'
import Registration from './Registration.jsx'
import CreateTask from './CreateTask.jsx'
import { Toaster } from 'react-hot-toast'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import UpdateTask from './UpdateTask.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/register',
    element: <Registration />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/board',
    element: <KanbanBoard />,
  },
  {
    path: '/activity',
    element: <Activity />,
  },
  {
    path: '/create',
    element: <CreateTask />,
  },
  {
    path: '/edit/:id',
    element: <UpdateTask />, //
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Toaster position="top-center" />
  </StrictMode>,
)
