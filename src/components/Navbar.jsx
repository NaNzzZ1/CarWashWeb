import { useState, useEffect } from 'react'

const navLinks = [
  { label: 'Home', id: 'home' },
  { label: 'Layanan', id: 'services' },
  { label: 'Booking', id: 'booking' },
  { label: 'Tentang Kami', id: 'about' },
  { label: 'Kontak', id: 'contact' },
]

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (id) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-charcoal-950/95 supports-[backdrop-filter]:backdrop-blur-md border-b border-charcoal-700 shadow-lg'
          : 'bg-transparent'
      }`}
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2 text-white font-bold text-xl tracking-tight"
        >
          <span className="text-gold text-2xl" aria-hidden="true">
            &#10022;
          </span>
          <span>Bight Auto Spa</span>
        </button>

        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => handleNavClick(link.id)}
              className="text-gray-300 hover:text-gold font-medium transition-colors duration-300"
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="hidden lg:block">
          <button
            type="button"
            onClick={() => handleNavClick('booking')}
            className="bg-gold hover:bg-gold-light text-charcoal-950 font-semibold px-6 py-2.5 rounded-full transition-all duration-300 hover:scale-105 shadow-lg shadow-gold/20"
          >
            Booking
          </button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="lg:hidden text-white p-2 rounded-lg hover:bg-charcoal-800 transition-colors duration-300"
          aria-label={open ? 'Tutup menu' : 'Buka menu'}
          aria-expanded={open}
        >
          {open ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {open && (
        <div
          className="lg:hidden bg-charcoal-950/95 supports-[backdrop-filter]:backdrop-blur-md border-t border-charcoal-700"
          style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
          <div className="px-4 sm:px-6 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => handleNavClick(link.id)}
                className="text-left text-gray-300 hover:text-gold font-medium py-3 px-2 rounded-lg hover:bg-charcoal-800 transition-colors duration-300"
              >
                {link.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => handleNavClick('booking')}
              className="mt-2 bg-gold hover:bg-gold-light text-charcoal-950 font-semibold px-6 py-3 rounded-full transition-all duration-300"
            >
              Booking
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
