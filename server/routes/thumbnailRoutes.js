const express = require('express')
const { InferenceClient } = require('@huggingface/inference')
const authMiddleware = require('../middleware/auth.js')
const Thumbnail = require('../models/Thumbnail.js')

const router = express.Router()

router.post('/generate', authMiddleware, async (req, res) => {
  try {
    const { title, prompt, style, aspectRatio, colors } = req.body
    const fullPrompt = `professional YouTube thumbnail, ${title}, ${prompt}, ${style} style, ${colors} color scheme, dramatic lighting, ultra detailed, high quality, 4k`
    console.log('Generating image...')
    const client = new InferenceClient(process.env.HF_TOKEN)
    const imageBlob = await client.textToImage({
      model: 'black-forest-labs/FLUX.1-schnell',
      inputs: fullPrompt,
            provider: 'fal-ai',
    })
    const imageBuffer = Buffer.from(await imageBlob.arrayBuffer())
    const imageData = imageBuffer.toString('base64')
    const thumbnail = await Thumbnail.create({
      userId: req.userId,
      title, prompt, style, aspectRatio, imageData,
    })
    res.json({ success: true, imageData, thumbnailId: thumbnail._id })
  } catch (error) {
    console.error('Error:', error.message)
    res.status(500).json({ message: error.message })
  }
})

router.get('/my-thumbnails', authMiddleware, async (req, res) => {
  try {
    const thumbnails = await Thumbnail.find({ userId: req.userId }).sort({ createdAt: -1 })
    res.json(thumbnails)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
