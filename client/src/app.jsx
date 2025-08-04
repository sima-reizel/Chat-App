import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { io } from 'socket.io-client';
import Login from './components/auth/loginForm'
import Register from './components/auth/registerForm'
import ChatMenu from './components/chat/chatMenu'

const BASE_URL = 'http://localhost:5000';
const socket = io(BASE_URL);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chatMenu" element={<ChatMenu socket={socket} />} />
      </Routes>
    </Router>
  )
}

export default App
