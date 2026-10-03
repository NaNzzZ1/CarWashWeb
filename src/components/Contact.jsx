import { WHATSAPP_BASE_URL, BUSINESS_INFO } from '../config'

function Contact() {
  const contactInfo = [
    {
      icon: '📍',
      label: 'Alamat',
      value: BUSINESS_INFO.address,
      type: 'text',
    },
    {
      icon: '💬',
      label: 'WhatsApp',
      value: '+62 111-111-1111',
      type: 'link',
      href: WHATSAPP_BASE_URL,
    },
    {
      icon: '🕐',
      label: 'Jam Operasional',
      value: BUSINESS_INFO.operatingHours,
      type: 'text',
    },
    {
      icon: '📸',
      label: 'Instagram',
      value: BUSINESS_INFO.instagramHandle,
      type: 'link',
      href: BUSINESS_INFO.instagram,
    },
  ]

  const handleWhatsAppClick = () => {
    window.open(WHATSAPP_BASE_URL, '_blank', 'noopener,noreferrer')
  }

  return (
    <section id="contact" className="py-16 sm:py-24 bg-charcoal-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Hubungi <span className="text-gold">Kami</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Kami siap melayani Anda. Jangan ragu untuk menghubungi kami kapan saja.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* LEFT: Contact Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-slide-up">
            {contactInfo.map((item, index) => {
              const isLink = item.type === 'link'
              const CardContent = (
                <>
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <div className="text-gray-400 text-sm uppercase tracking-wider">
                    {item.label}
                  </div>
                  <div
                    className={`text-white font-semibold mt-1 break-words ${
                      isLink ? 'hover:text-gold transition-colors duration-300' : ''
                    }`}
                  >
                    {item.value}
                  </div>
                </>
              )

              if (isLink) {
                return (
                  <a
                    key={index}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-charcoal-800 border border-charcoal-700 rounded-2xl p-6 hover:border-gold/50 transition-all duration-300"
                  >
                    {CardContent}
                  </a>
                )
              }

              return (
                <div
                  key={index}
                  className="bg-charcoal-800 border border-charcoal-700 rounded-2xl p-6 hover:border-gold/50 transition-all duration-300"
                >
                  {CardContent}
                </div>
              )
            })}
          </div>

          {/* RIGHT: CTA Card */}
          <div className="bg-gradient-to-br from-gold/10 via-charcoal-800 to-charcoal-800 border border-gold/30 rounded-2xl p-8 sm:p-10 flex flex-col justify-center animate-slide-up shadow-2xl shadow-black/50">
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              Siap Membersihkan Kendaraan Anda?
            </h3>
            <p className="text-gray-300 mt-4">
              Hubungi kami sekarang untuk booking atau konsultasi layanan.
            </p>
            <button
              type="button"
              onClick={handleWhatsAppClick}
              className="bg-gold hover:bg-gold-light text-charcoal-950 font-bold py-4 rounded-full mt-6 transition-all duration-300 shadow-2xl shadow-black/50"
            >
              Chat WhatsApp Sekarang
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact