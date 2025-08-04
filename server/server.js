import express, { json } from 'express'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(json())
app.use(authRoutes)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
