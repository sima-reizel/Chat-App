import express, { json } from 'express'
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'
import dotenv from 'dotenv'
import groupRoutes from './routes/groupRoutes.js'
import {validAuth} from './middleware/authMiddleware.js'

dotenv.config()

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
})

const PORT = process.env.PORT || 5000

app.use(cors())
app.use(json())
app.use(authRoutes)
app.use(validAuth)
app.use('/api/groups', groupRoutes)

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id)
  socket.on('join-room', (groupName) => {
    socket.join(groupName)
    io.to(groupName).emit('user-joined', { userId: socket.id })
  })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
