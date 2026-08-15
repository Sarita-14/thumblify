import { useEffect, useRef, useState } from 'react'
import api from '../api'
import { useApp } from '../context/useApp'
import { useNavigate } from 'react-router-dom'

const MyThumbnails = () => {
  const [thumbnails, setThumbnails] = useState([])
  const [loading, setLoading] = useState(true)
  const { token, logout } = useApp()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchThumbnails = async () => {
      try {
        const { data } = await api.get('/api/thumbnail/my-thumbnails', {
          headers: { Authorization: `Bearer ${token}` }
        })
        setThumbnails(data)
      } catch (err) { console.error(err) }
      setLoading(false)
    }
    fetchThumbnails()
  }, [token])

  const getTimestamp = useRef(() => Date.now())

  const handleDownload = (imageData, title) => {
    const link = document.createElement('a')
    link.href = `data:image/png;base64,${imageData}`
    const timestamp = getTimestamp.current()
    link.download = `${title || 'thumbnail'}-${timestamp}.png`
    link.click()
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/30">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <rect x="3" y="3" width="18" height="14" rx="2"/>
                <path d="M8 21h8M12 17v4"/>
              </svg>
            </div>
            <span className="text-lg font-bold">Thumblify</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {['Home', 'Generate', 'Contact'].map(item => (
              <button key={item}
                onClick={() => navigate(item === 'Home' ? '/' : item === 'Generate' ? '/generate' : '/')}
                className="text-gray-400 hover:text-white text-sm font-medium transition-colors duration-200 relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/generate')} className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25">
              + Generate New
            </button>
            <button onClick={() => { logout(); navigate('/') }} className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-extrabold">My Thumbnails</h1>
            <p className="text-gray-500 text-sm mt-1">{thumbnails.length} thumbnail{thumbnails.length !== 1 ? 's' : ''} generated</p>
          </div>
          <button
            onClick={() => navigate('/generate')}
            className="group bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
            Generate New
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-32">
            <div className="relative w-12 h-12">
              <div className="w-12 h-12 border border-blue-500/20 rounded-full"></div>
              <div className="w-12 h-12 border-2 border-blue-500 border-t-transparent rounded-full animate-spin absolute inset-0"></div>
            </div>
          </div>
        ) : thumbnails.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-24 h-24 border border-dashed border-white/10 rounded-2xl flex items-center justify-center mb-6">
              <svg className="h-10 w-10 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-300 mb-2">No thumbnails yet</h3>
            <p className="text-gray-600 text-sm mb-8 max-w-sm">Generate your first AI thumbnail and it will appear here</p>
            <button
              onClick={() => navigate('/generate')}
              className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-1"
            >
              Generate Your First Thumbnail
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {thumbnails.map((t, i) => (
              <div
                key={t._id}
                className="bg-white/3 border border-white/8 rounded-2xl overflow-hidden hover:border-white/20 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/50 transition-all duration-300 group"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={`data:image/png;base64,${t.imageData}`}
                    alt={t.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                    <button
                      onClick={() => handleDownload(t.imageData, t.title)}
                      className="bg-white text-black font-bold px-5 py-2 rounded-xl text-sm hover:bg-gray-100 transition-colors transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
                    >
                      Download
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-sm truncate text-white mb-1">{t.title}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-600 bg-white/5 px-2 py-0.5 rounded-md">{t.style}</span>
                    <span className="text-xs text-gray-600 bg-white/5 px-2 py-0.5 rounded-md">{t.aspectRatio}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyThumbnails