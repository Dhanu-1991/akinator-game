import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import GameBoard from "./components/gameboard";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <nav className="bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="flex justify-between items-center h-16">
            {/* Logo / Brand */}
            <div className="text-2xl font-extrabold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 to-indigo-300">
              WEC<span className="text-white">-GDG</span>
            </div>

            {/* Nav Links */}
            <div className="flex space-x-6">
              <Link
                to="/"
                className="flex items-center gap-1 hover:scale-105 hover:text-fuchsia-300 transition-all duration-200 px-3 py-2 text-lg font-semibold"
              >
                🎮 <span>Game</span>
              </Link>
              <Link
                to="/admin"
                className="flex items-center gap-1 hover:scale-105 hover:text-fuchsia-300 transition-all duration-200 px-3 py-2 text-lg font-semibold"
              >
                ⚙️ <span>Admin</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Routes */}
      <div className="relative z-10">
        <Routes>
          <Route path="/" element={<GameBoard />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
