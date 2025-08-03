import express, { json } from 'express'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'

const app = express()
const PORT = 5000

app.use(cors())
app.use(json())

app.use('/api', authRoutes)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})