import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-8 animate-fade-in">
        <h1 className="text-4xl sm:text-6xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text drop-shadow-lg mb-4">
          Welcome to CollaboBoard
        </h1>
        <p className="text-lg sm:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto">
          The modern, real-time collaborative Kanban board for teams.<br />
          Organize tasks, track progress, and work together—anywhere, anytime.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link
            to="/register"
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-200"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="px-8 py-3 rounded-xl border-2 border-blue-600 text-blue-700 font-bold text-lg bg-white shadow hover:bg-blue-50 transition duration-200"
          >
            Demo Login
          </Link>
        </div>

        <section className="w-full max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 mb-20">
          <div className="bg-white/90 rounded-2xl shadow-xl p-6 flex flex-col items-center hover:scale-[1.02] transition duration-200">
            <span className="text-4xl mb-3">📝</span>
            <h2 className="font-bold text-blue-700 mb-2 text-lg">Custom Kanban</h2>
            <p className="text-gray-600 text-sm text-center">Drag and drop tasks between Todo, In Progress, and Done. Assign tasks to any user.</p>
          </div>

          <div className="bg-white/90 rounded-2xl shadow-xl p-6 flex flex-col items-center hover:scale-[1.02] transition duration-200">
            <span className="text-4xl mb-3">⚡</span>
            <h2 className="font-bold text-purple-700 mb-2 text-lg">Live Collaboration</h2>
            <p className="text-gray-600 text-sm text-center">See changes in real time. Activity log updates instantly for all users.</p>
          </div>

          <div className="bg-white/90 rounded-2xl shadow-xl p-6 flex flex-col items-center hover:scale-[1.02] transition duration-200">
            <span className="text-4xl mb-3">🎨</span>
            <h2 className="font-bold text-green-700 mb-2 text-lg">Unique UI</h2>
            <p className="text-gray-600 text-sm text-center">No third-party CSS frameworks. 100% custom, responsive, and animated design.</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default App
