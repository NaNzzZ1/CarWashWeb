import { SERVICES } from '../config'

const ServiceCard = ({ service }) => {
  const handleSelect = () => {
    window.dispatchEvent(new CustomEvent('selectService', { detail: service.name }))
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="bg-charcoal-800 border border-charcoal-700 rounded-2xl p-6 hover:border-gold/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-gold/10 relative">
      {service.popular && (
        <span className="absolute top-4 right-4 bg-gold text-charcoal-950 text-xs font-bold px-3 py-1 rounded-full">
          POPULER
        </span>
      )}
      <h3 className="text-xl font-bold text-white">{service.name}</h3>
      <p className="text-gray-400 text-sm mt-2">{service.description}</p>
      <p className="text-2xl font-bold text-gold mt-4">{service.price}</p>
      <p className="text-sm text-gray-400 flex items-center gap-2 mt-2">
        <span aria-hidden="true">⏱</span>
        <span>{service.duration}</span>
      </p>
      <button
        type="button"
        onClick={handleSelect}
        className="bg-gold/10 hover:bg-gold text-gold hover:text-charcoal-950 border border-gold/30 hover:border-gold font-semibold py-2.5 px-5 rounded-full transition-all duration-300 w-full mt-6"
      >
        Pilih Layanan
      </button>
    </div>
  )
}

const Services = () => {
  const categories = ['MOBIL', 'MOTOR']

  return (
    <section id="services" className="py-16 sm:py-24 bg-charcoal-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">Layanan Kami</h2>
          <p className="text-gray-400 mt-4 text-base sm:text-lg">Pilih layanan terbaik untuk kendaraan Anda</p>
        </div>

        {categories.map((category) => {
          const categoryServices = SERVICES.filter((service) => service.category === category)
          if (categoryServices.length === 0) return null

          return (
            <div key={category} className="mb-12 sm:mb-16 last:mb-0">
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-gold/10 text-gold border border-gold/30 text-xs font-bold px-3 py-1 rounded-full tracking-widest">
                  {category}
                </span>
                <div className="h-px flex-1 bg-charcoal-700" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryServices.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Services