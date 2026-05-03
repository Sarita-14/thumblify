import express from 'express'
import { InferenceClient } from '@huggingface/inference'
import authMiddleware from '../middleware/auth.js'
import Thumbnail from '../models/Thumbnail.js'

const router = express.Router()

router.post('/generate', authMiddleware, async (req, res) => {
  try {
    const { title, prompt, style, aspectRatio, colors } = req.body

    const fullPrompt = `professional YouTube thumbnail, ${title}, ${prompt}, ${style} style, ${colors} color scheme, dramatic lighting, ultra detailed, high quality, 4k`

    console.log('Generating image for:', title)

    const client = new InferenceClient(process.env.HF_TOKEN)

    const imageBlob = await client.textToImage({
      model: 'black-forest-labs/FLUX.1-schnell',
      inputs: fullPrompt,
      provider: 'together',
    })

    const imageBuffer = Buffer.from(await imageBlob.arrayBuffer())
    const imageData = imageBuffer.toString('base64')

    console.log('Image generated! Size:', imageBuffer.byteLength, 'bytes')

    const thumbnail = await Thumbnail.create({
      userId: req.userId,
      title,
      prompt,
      style,
      aspectRatio,
      imageData,
    })

    res.json({ success: true, imageData, thumbnailId: thumbnail._id })

  } catch (error) {
    console.error('Generation Error:', error.message)
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

export default router