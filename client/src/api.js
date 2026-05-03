import axios from 'axios'

const api = axios.create({
  baseURL: 'https://thumblify-8u03vg1ln-sarita-14s-projects.vercel.app/',
})

export default api