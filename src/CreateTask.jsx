import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

const CreateTask = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm()

  const onSubmit = async (data) => {
    try {
      const res = await fetch('http://localhost:3000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(data),
      })

      const result = await res.json()

      if (!res.ok) {
        setError('apiError', { message: result.message || 'Task creation failed' })
        return
      }

      toast.success('Task created successfully!')
      reset()
      setTimeout(() => {
        window.location.href = '/board'
      }, 1500)
    } catch (err) {
      setError('apiError', { message: 'Network error' })
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-lg bg-white/90 rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">Create a New Task</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {errors.apiError && (
              <p className="text-red-500 text-center text-sm">{errors.apiError.message}</p>
            )}

            {/* Title */}
            <div>
              <label className="block text-gray-700 font-medium mb-1" htmlFor="title">Title</label>
              <input
                id="title"
                type="text"
                {...register('title', { required: 'Title is required' })}
                className={`w-full px-4 py-2 rounded-lg border ${errors.title ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-400`}
              />
              {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-700 font-medium mb-1" htmlFor="description">Description</label>
              <textarea
                id="description"
                rows="3"
                {...register('description')}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Assigned User */}
            <div>
              <label className="block text-gray-700 font-medium mb-1" htmlFor="assigned_user">Assigned User</label>
              <input
                id="assigned_user"
                type="text"
                {...register('assigned_user', { required: 'Assigned user is required' })}
                className={`w-full px-4 py-2 rounded-lg border ${errors.assigned_user ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-400`}
              />
              {errors.assigned_user && (
                <p className="text-red-500 text-xs mt-1">{errors.assigned_user.message}</p>
              )}
            </div>

            {/* Status */}
            <div>
              <label className="block text-gray-700 font-medium mb-1" htmlFor="status">Status</label>
              <select
                id="status"
                {...register('status')}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                defaultValue="Todo"
              >
                <option value="Todo">Todo</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </div>

            {/* Priority */}
            <div>
              <label className="block text-gray-700 font-medium mb-1" htmlFor="priority">Priority</label>
              <input
                id="priority"
                type="number"
                min={1}
                max={5}
                {...register('priority', {
                  required: 'Priority is required',
                  valueAsNumber: true,
                })}
                className={`w-full px-4 py-2 rounded-lg border ${errors.priority ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-400`}
              />
              {errors.priority && (
                <p className="text-red-500 text-xs mt-1">{errors.priority.message}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg shadow-lg hover:scale-105 transition-transform disabled:opacity-60"
            >
              {isSubmitting ? 'Creating Task...' : 'Create Task'}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default CreateTask
