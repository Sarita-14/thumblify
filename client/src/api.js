import axios from 'axios'

const api = axios.create({
  baseURL: 'https://thumblify-p0f78zgsc-sarita-14s-projects.vercel.app',
})

export default api