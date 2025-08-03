import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/auth/loginForm'
import Register from './components/auth/registerForm'
import ChatMenu from './components/chat/chatMenu'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chatMenu" element={<ChatMenu />} />
      </Routes>
    </Router>
  )
}

export default App
