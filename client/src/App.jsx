import { Routes, Route, Navigate } from 'react-router-dom'
import { useApp } from './context/AppContext'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Generate from './pages/Generate'
import MyThumbnails from './pages/MyThumbnails'

const ProtectedRoute = ({ children }) => {
  const { token } = useApp()
  return token ? children : <Navigate to="/login" />
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/generate" element={<ProtectedRoute><Generate /></ProtectedRoute>} />
      <Route path="/my-thumbnails" element={<ProtectedRoute><MyThumbnails /></ProtectedRoute>} />
    </Routes>
  )
}

export default App