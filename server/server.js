import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import thumbnailRoutes from './routes/thumbnailRoutes.js'

const app = express()

// Middleware - allows frontend to communicate with backend
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.json({ limit: '10mb' }))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/thumbnail', thumbnailRoutes)

// Test route - open http://localhost:5000 in browser to check
app.get('/', (req, res) => {
  res.send('🚀 Server is running!')
})

const PORT = process.env.PORT || 5000

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`)
  })
})