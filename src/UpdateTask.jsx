import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useParams, useNavigate } from 'react-router-dom'

const UpdateTask = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setError,
  } = useForm()

  const currentUserId = '64aef9e9b8350aa03b6bd57e' // Replace with actual user ID logic

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/tasks/${id}`)
        if (!res.ok) throw new Error('Failed to fetch task')
        const data = await res.json()
        const { _id, __v, ...cleanData } = data
        reset(cleanData)
        setLoading(false)
      } catch (err) {
        console.error(err)
        setError('apiError', { message: 'Failed to fetch task.' })
        setLoading(false)
      }
    }

    fetchTask()
  }, [id, reset, setError])

  const onSubmit = async (data) => {
    try {
      const res = await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, userId: currentUserId }),
      })

      if (!res.ok) throw new Error('Update failed')
      navigate('/board')
    } catch (err) {
      console.error(err)
      setError('apiError', { message: 'Failed to update task.' })
    }
  }

  if (loading) return <p className="text-center text-gray-600">Loading task...</p>

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md p-6 bg-white shadow-xl rounded-2xl space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Update Task</h2>

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
          {errors.assigned_user && <p className="text-red-500 text-xs mt-1">{errors.assigned_user.message}</p>}
        </div>

        {/* Status */}
        <div>
          <label className="block text-gray-700 font-medium mb-1" htmlFor="status">Status</label>
          <select
            id="status"
            {...register('status')}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
          {errors.priority && <p className="text-red-500 text-xs mt-1">{errors.priority.message}</p>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg shadow-lg hover:scale-105 transition-transform disabled:opacity-60"
        >
          {isSubmitting ? 'Updating...' : 'Update Task'}
        </button>
      </form>
    </div>
  )
}

export default UpdateTask
