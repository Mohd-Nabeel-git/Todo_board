import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm()

  const onSubmit = async (data) => {
    try {
      const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await res.json()

      if (!res.ok) {
        setError('apiError', { message: result.message || 'Login failed' })
        return
      }

      reset()
      toast.success('Login successful!')
      setTimeout(() => {
        window.location.href = '/board'
      }, 1000)
    } catch (err) {
      setError('apiError', { message: 'Network error' })
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-tr from-purple-100 via-white to-blue-100">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white/80 backdrop-blur-lg border border-purple-200 shadow-xl rounded-2xl p-8">
          <h2 className="text-3xl font-extrabold text-center text-purple-700 mb-6">
            Welcome Back 👋
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* API Error */}
            {errors.apiError && (
              <p className="text-center text-red-600 text-sm">{errors.apiError.message}</p>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                autoComplete="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Enter a valid email',
                  },
                })}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-purple-400`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                autoComplete="current-password"
                {...register('password', { required: 'Password is required' })}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-purple-400`}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-lg shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200 disabled:opacity-50"
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-4 text-center text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <a href="/register" className="text-purple-700 hover:underline font-medium">
              Register
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Login
