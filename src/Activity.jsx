import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

const userColors = [
  'text-indigo-600',
  'text-emerald-600',
  'text-pink-600',
  'text-orange-600',
  'text-rose-600',
  'text-teal-600',
  'text-blue-600',
  'text-purple-600',
]

const Activity = () => {
  const [activities, setActivities] = useState([])

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/tasks/logs/recent')
        const data = await res.json()
        setActivities(data)
      } catch (err) {
        console.error('Failed to fetch logs', err)
      }
    }

    fetchLogs()
    const interval = setInterval(fetchLogs, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100">
      <Navbar />
      <main className="flex-1 flex flex-col items-center px-4 py-10">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8 drop-shadow-md">
          Activity Log
        </h1>

        <section className="w-full max-w-3xl bg-white/90 rounded-xl shadow-2xl p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            🔄 Last 20 Actions (Live)
          </h3>

          <ul className="space-y-3 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-100 pr-2">
            {activities.map((log, i) => {
              const userColor = userColors[i % userColors.length]

              // Bold the action (like created, updated, etc.)
              const parts = log.action.split(' ')
              const actionWord = parts[0]
              const rest = parts.slice(1).join(' ')

              return (
                <li
                  key={log._id || i}
                  className="flex items-start gap-3 p-3 rounded-lg bg-white shadow-sm hover:bg-blue-50 transition"
                >
                  <div className="flex-shrink-0 mt-1 w-2 h-2 bg-blue-400 rounded-full" />
                  <div className="flex-grow">
                    <p className="text-sm text-gray-800">
                      <span className={`font-bold ${userColor}`}>{log.user}</span>{' '}
                      <span className="text-gray-600">
                        <span className="font-semibold text-gray-700">{actionWord}</span>{' '}
                        {rest}
                      </span>
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(log.timestamp).toLocaleString()}
                    </p>
                  </div>
                </li>
              )
            })}
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Activity
