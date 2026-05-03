import { useState } from 'react'
import axios from 'axios'
import { useApp } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const STYLES = ['Cinematic', 'Cartoon', 'Minimalist', 'Bold & Vibrant', 'Dark Theme', 'Neon Glow']
const ASPECT_RATIOS = ['16:9', '4:3', '1:1', '9:16']
const COLOR_OPTIONS = ['Red & Black', 'Blue & White', 'Yellow & Black', 'Purple & Gold', 'Green & Dark', 'Orange & White']

const Generate = () => {
  const [form, setForm] = useState({ title: '', prompt: '', style: 'Cinematic', aspectRatio: '16:9', colors: 'Red & Black' })
  const [imageData, setImageData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { token, logout, user } = useApp()
  const navigate = useNavigate()

  const handleGenerate = async () => {
    if (!form.title || !form.prompt) return setError('Please fill in both Title and Description')
    setLoading(true)
    setError('')
    setImageData(null)
    try {
      const { data } = await axios.post('/api/thumbnail/generate', form, {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 120000,
      })
      setImageData(data.imageData)
    } catch (err) {
      setError(err.response?.data?.message || 'Generation failed. Please try again.')
    }
    setLoading(false)
  }

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = `data:image/png;base64,${imageData}`
    link.download = `thumbnail-${Date.now()}.png`
    link.click()
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/8 rounded-full blur-[100px]"></div>
      </div>

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
                className={`text-sm font-medium transition-colors duration-200 relative group ${item === 'Generate' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
              >
                {item}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-500 transition-all duration-300 ${item === 'Generate' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <span className="text-gray-500 text-sm hidden md:block">Hi, {user?.name}</span>
            <button onClick={() => navigate('/my-thumbnails')} className="text-gray-400 hover:text-white text-sm font-medium transition-colors duration-200">
              My Thumbnails
            </button>
            <button onClick={() => { logout(); navigate('/') }} className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200">
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main */}
      <div className="relative max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* LEFT */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-extrabold mb-1">Generate Thumbnail</h1>
            <p className="text-gray-500 text-sm">Describe your video and AI creates the perfect thumbnail</p>
          </div>

          {/* Title */}
          <div className="group">
            <label className="block text-sm font-semibold text-gray-300 mb-2">Video Title *</label>
            <input
              type="text"
              placeholder="e.g. 10 Tips to Learn React Fast"
              className="w-full bg-white/5 border border-white/10 group-hover:border-white/20 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/60 focus:bg-white/8 transition-all duration-200 text-sm"
              value={form.title}
              onChange={e => setForm({...form, title: e.target.value})}
            />
          </div>

          {/* Prompt */}
          <div className="group">
            <label className="block text-sm font-semibold text-gray-300 mb-2">Description *</label>
            <textarea
              rows={3}
              placeholder="e.g. A shocked programmer looking at glowing code on a dark screen..."
              className="w-full bg-white/5 border border-white/10 group-hover:border-white/20 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/60 focus:bg-white/8 transition-all duration-200 resize-none text-sm"
              value={form.prompt}
              onChange={e => setForm({...form, prompt: e.target.value})}
            />
          </div>

          {/* Style */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-3">Style</label>
            <div className="flex flex-wrap gap-2">
              {STYLES.map(s => (
                <button key={s} onClick={() => setForm({...form, style: s})}
                  className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200 ${
                    form.style === s
                      ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/25'
                      : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/30 hover:text-white hover:bg-white/8 hover:-translate-y-0.5'
                  }`}
                >{s}</button>
              ))}
            </div>
          </div>

          {/* Aspect Ratio */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-3">Aspect Ratio</label>
            <div className="flex gap-2">
              {ASPECT_RATIOS.map(r => (
                <button key={r} onClick={() => setForm({...form, aspectRatio: r})}
                  className={`px-5 py-2 rounded-xl text-sm font-medium border transition-all duration-200 ${
                    form.aspectRatio === r
                      ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/25'
                      : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/30 hover:text-white hover:bg-white/8 hover:-translate-y-0.5'
                  }`}
                >{r}</button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-3">Color Scheme</label>
            <div className="flex flex-wrap gap-2">
              {COLOR_OPTIONS.map(c => (
                <button key={c} onClick={() => setForm({...form, colors: c})}
                  className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all duration-200 ${
                    form.colors === c
                      ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/25'
                      : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/30 hover:text-white hover:bg-white/8 hover:-translate-y-0.5'
                  }`}
                >{c}</button>
              ))}
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              {error}
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl transition-all duration-300 disabled:opacity-40 hover:shadow-2xl hover:shadow-blue-500/30 hover:-translate-y-0.5 text-sm flex items-center justify-center gap-3"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                Generating... (30-60 seconds)
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
                Generate Thumbnail
              </>
            )}
          </button>
        </div>

        {/* RIGHT - Preview */}
        <div className="flex flex-col lg:sticky lg:top-24 lg:h-fit">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-semibold text-gray-300">Preview</label>
            {imageData && (
              <span className="text-xs text-green-400 bg-green-400/10 border border-green-400/20 px-3 py-1 rounded-full font-medium animate-pulse">
                ✓ Ready
              </span>
            )}
          </div>

          <div className="w-full aspect-video bg-white/3 border border-white/8 rounded-2xl flex items-center justify-center overflow-hidden relative group">
            {loading ? (
              <div className="text-center px-8">
                <div className="relative w-16 h-16 mx-auto mb-6">
                  <div className="w-16 h-16 border border-blue-500/20 rounded-full"></div>
                  <div className="w-16 h-16 border-2 border-blue-500 border-t-transparent rounded-full animate-spin absolute inset-0"></div>
                  <div className="w-8 h-8 border border-blue-400/30 rounded-full absolute inset-4 animate-spin" style={{animationDirection:'reverse', animationDuration:'1.5s'}}></div>
                </div>
                <p className="text-white text-sm font-semibold mb-1">AI is working its magic...</p>
                <p className="text-gray-600 text-xs">This usually takes 30-60 seconds</p>
              </div>
            ) : imageData ? (
              <>
                <img
                  src={`data:image/png;base64,${imageData}`}
                  alt="Generated thumbnail"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button onClick={handleDownload} className="bg-white text-black font-bold px-6 py-2.5 rounded-xl text-sm hover:bg-gray-100 transition-colors">
                    Download PNG
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center px-8">
                <div className="w-20 h-20 border border-dashed border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:border-white/20 transition-colors duration-300">
                  <svg className="h-9 w-9 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                </div>
                <p className="text-gray-500 text-sm font-medium">Your thumbnail appears here</p>
                <p className="text-gray-700 text-xs mt-1">Fill the form and click generate</p>
              </div>
            )}
          </div>

          {imageData && (
            <button
              onClick={handleDownload}
              className="mt-4 w-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 text-white font-semibold py-3.5 rounded-2xl transition-all duration-200 text-sm hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
              </svg>
              Download Thumbnail
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Generate