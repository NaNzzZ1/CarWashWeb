import { ABOUT_IMAGE, ADVANTAGES } from '../config'

function About() {
  const handleBookingClick = () => {
    const bookingSection = document.getElementById('booking')
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section id="about" className="py-16 sm:py-24 bg-charcoal-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* LEFT: Image with decorative gold accent border */}
          <div className="relative animate-fade-in">
            <div className="absolute -inset-2 sm:-inset-4 border-2 border-gold/40 rounded-2xl -z-10" />
            <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/50 aspect-square">
              <img
                src={ABOUT_IMAGE}
                alt="Bight Auto Spa — Perawatan Kendaraan Premium"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* RIGHT: Content */}
          <div className="animate-slide-up">
            <span className="tracking-widest text-gold uppercase text-sm font-semibold">
              Tentang Kami
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3">
              Bight Auto Spa —{' '}
              <span className="text-gold">Perawatan Premium</span> untuk Kendaraan Anda
            </h2>
            <p className="text-gray-300 mt-4">
              Bight Auto Spa adalah tempat perawatan dan pencucian kendaraan yang
              menyediakan layanan cuci mobil dan motor dengan mengutamakan kebersihan,
              kualitas, dan kepuasan pelanggan.
            </p>

            {/* Advantages Grid */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ADVANTAGES.map((item, index) => (
                <div
                  key={index}
                  className="bg-charcoal-800 border border-charcoal-700 rounded-xl p-4 hover:border-gold/50 transition-all duration-300"
                >
                  <div className="flex items-center">
                    <span className="text-2xl mr-3" aria-hidden="true">
                      {item.icon}
                    </span>
                    <h3 className="text-white font-semibold">{item.title}</h3>
                  </div>
                  <p className="text-gray-400 text-sm mt-1">{item.description}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button
              type="button"
              onClick={handleBookingClick}
              className="mt-8 bg-gold hover:bg-gold-light text-charcoal-950 font-semibold px-6 py-3 rounded-full transition-all duration-300 shadow-lg shadow-gold/20 hover:scale-[1.02]"
            >
              Booking Sekarang
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About