import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { useState, useEffect } from 'react'

const Navbar = ({ navigate, user, logout }) => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/5 shadow-xl' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5 cursor-pointer group" onClick={() => navigate('/')}>
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-all duration-300">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <rect x="3" y="3" width="18" height="14" rx="2"/>
              <path d="M8 21h8M12 17v4"/>
            </svg>
          </div>
          <span className="text-lg font-bold tracking-tight">Thumblify</span>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {['Home', 'Generate', 'Contact'].map((item) => (
            <button
              key={item}
              onClick={() => navigate(item === 'Home' ? '/' : item === 'Generate' ? (user ? '/generate' : '/login') : '/')}
              className="text-gray-400 hover:text-white text-sm font-medium transition-colors duration-200 relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
            </button>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <button
                onClick={() => navigate('/my-thumbnails')}
                className="text-gray-400 hover:text-white text-sm font-medium transition-colors duration-200"
              >
                My Thumbnails
              </button>
              <button
                onClick={() => { logout(); navigate('/') }}
                className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate('/login')}
                className="text-gray-400 hover:text-white text-sm font-medium transition-colors duration-200"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate('/register')}
                className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5"
              >
                Get Started Free
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

const Home = () => {
  const navigate = useNavigate()
  const { user, logout } = useApp()
  const [count, setCount] = useState(0)

  useEffect(() => {
    const target = 10000
    const step = Math.ceil(target / 60)
    const timer = setInterval(() => {
      setCount(prev => {
        if (prev + step >= target) { clearInterval(timer); return target }
        return prev + step
      })
    }, 30)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar navigate={navigate} user={user} logout={logout} />

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute top-[30%] right-[10%] w-[400px] h-[400px] bg-purple-600/8 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[10%] left-[10%] w-[300px] h-[300px] bg-blue-600/6 rounded-full blur-[80px]"></div>
      </div>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold px-4 py-2 rounded-full mb-8 hover:bg-blue-500/15 transition-all duration-300 cursor-default">
          <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
          AI-Powered Thumbnail Generator — 100% Free
        </div>

        {/* Heading */}
        <h1 className="text-6xl md:text-8xl font-extrabold mb-6 leading-[1.05] tracking-tight">
          Create Stunning
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            AI Thumbnails
          </span>
        </h1>

        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
          Generate professional, click-worthy YouTube thumbnails in seconds.
          Just describe your video and our AI creates the perfect thumbnail.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <button
            onClick={() => navigate(user ? '/generate' : '/register')}
            className="group bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-10 rounded-2xl text-base transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/40 hover:-translate-y-1 flex items-center gap-2"
          >
            Start Creating Free
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
          </button>
          <button
            onClick={() => navigate('/login')}
            className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 text-white font-bold py-4 px-10 rounded-2xl text-base transition-all duration-300 hover:-translate-y-1"
          >
            Sign In
          </button>
        </div>

        {/* Demo Preview Cards */}
        <div className="w-full max-w-5xl grid grid-cols-3 gap-4 mb-20">
          {[
            { style: 'Cinematic', gradient: 'from-blue-900/60 to-black/60', border: 'border-blue-500/20' },
            { style: 'Neon Glow', gradient: 'from-purple-900/60 to-black/60', border: 'border-purple-500/20' },
            { style: 'Bold & Vibrant', gradient: 'from-orange-900/60 to-black/60', border: 'border-orange-500/20' },
          ].map((card, i) => (
            <div
              key={i}
              className={`aspect-video bg-gradient-to-br ${card.gradient} border ${card.border} rounded-2xl flex flex-col items-center justify-center gap-3 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 cursor-default group`}
            >
              <div className="w-10 h-10 rounded-xl bg-white/10 group-hover:bg-white/20 transition-all duration-300 flex items-center justify-center">
                <svg className="w-5 h-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01"/>
                </svg>
              </div>
              <span className="text-xs text-gray-400 font-medium">{card.style}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="relative max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Everything you need</h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">Powerful features to create thumbnails that get clicks</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: (
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              ),
              title: 'Lightning Fast AI',
              desc: 'Generate stunning thumbnails in seconds using state-of-the-art AI image generation models.',
              gradient: 'from-blue-500/15 to-blue-600/5',
              border: 'border-blue-500/20',
              hover: 'hover:border-blue-500/40 hover:shadow-blue-500/10',
            },
            {
              icon: (
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="1" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12a5 5 0 1010 0 5 5 0 01-10 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 7v1m0 8v1M5.5 12h1m8.5 0h1" />
                </svg>
              ),
              title: 'Multiple Styles',
              desc: 'Choose from Cinematic, Cartoon, Minimalist, Neon Glow and more creative styles.',
              gradient: 'from-purple-500/15 to-purple-600/5',
              border: 'border-purple-500/20',
              hover: 'hover:border-purple-500/40 hover:shadow-purple-500/10',
            },
            {
              icon: (
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              ),
              title: 'Save & Download',
              desc: 'All thumbnails saved to your account. Download anytime in high resolution PNG.',
              gradient: 'from-green-500/15 to-green-600/5',
              border: 'border-green-500/20',
              hover: 'hover:border-green-500/40 hover:shadow-green-500/10',
            },
            {
              icon: (
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="9" strokeWidth={1.5} />
                  <circle cx="12" cy="12" r="6" strokeWidth={1.5} />
                  <circle cx="12" cy="12" r="3" strokeWidth={1.5} />
                  <circle cx="12" cy="12" r="1" fill="currentColor" />
                </svg>
              ),
              title: 'Custom Colors',
              desc: 'Pick your perfect color scheme — Red & Black, Blue & White, Neon, and many more.',
              gradient: 'from-red-500/15 to-red-600/5',
              border: 'border-red-500/20',
              hover: 'hover:border-red-500/40 hover:shadow-red-500/10',
            },
            {
              icon: (
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6" />
                </svg>
              ),
              title: 'Aspect Ratios',
              desc: 'Generate in 16:9, 4:3, 1:1 or 9:16. Perfect for YouTube, Instagram and more.',
              gradient: 'from-yellow-500/15 to-yellow-600/5',
              border: 'border-yellow-500/20',
              hover: 'hover:border-yellow-500/40 hover:shadow-yellow-500/10',
            },
            {
              icon: (
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2h-1.172a2 2 0 00-1.414.586l-1.414 1.414a2 2 0 01-2.828 0l-1.414-1.414A2 2 0 006.172 9H5a2 2 0 00-2 2v6a2 2 0 002 2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 11a1 1 0 100-2 1 1 0 000 2z" />
                </svg>
              ),
              title: 'Secure & Private',
              desc: 'Your thumbnails are private to your account.',
              gradient: 'from-cyan-500/15 to-cyan-600/5',
              border: 'border-cyan-500/20',
              hover: 'hover:border-cyan-500/40 hover:shadow-cyan-500/10',
            },
          ].map((f, i) => (
            <div
              key={i}
              className={`bg-gradient-to-br ${f.gradient} border ${f.border} ${f.hover} rounded-2xl p-6 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-default`}
            >
              <div className="text-blue-400 mb-4">{f.icon}</div>
              <h3 className="text-lg font-bold mb-2 text-white">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative max-w-4xl mx-auto px-6 py-24 text-center">
        <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/10 border border-blue-500/20 rounded-3xl p-16 hover:border-blue-500/30 transition-all duration-300">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Ready to get started?</h2>
          <p className="text-gray-400 text-lg mb-10">Join thousands of creators making better thumbnails with AI</p>
          <button
            onClick={() => navigate(user ? '/generate' : '/register')}
            className="group bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-12 rounded-2xl text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/40 hover:-translate-y-1 inline-flex items-center gap-2"
          >
            Start Creating Free
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-8 text-center">
      </footer>
    </div>
  )
}

export default Home