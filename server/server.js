const dns = require('dns')
dns.setServers(['8.8.8.8', '8.8.4.4'])
const express = require('express')
const cors = require('cors')
require('dotenv/config')
const connectDB = require('./config/db.js')
const authRoutes = require('./routes/authRoutes.js')
const thumbnailRoutes = require('./routes/thumbnailRoutes.js')

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

connectDB()

if (require.main === module) {
  const PORT = process.env.PORT || 5000
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
}
// THIS LINE IS CRITICAL FOR VERCEL
module.exports = app