import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import thumbnailRoutes from './routes/thumbnailRoutes.js'

const app = express()

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(express.json({ limit: '10mb' }))

app.use('/api/auth', authRoutes)
app.use('/api/thumbnail', thumbnailRoutes)

app.get('/', (req, res) => {
  res.send('Server is running!')
})

// Connect DB and export app for Vercel
connectDB()

export default app