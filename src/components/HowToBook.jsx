import { HOW_TO_BOOK_STEPS } from '../config'

const HowToBook = () => {
  return (
    <section id="how-to-book" className="py-16 sm:py-24 bg-charcoal-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">Cara Booking</h2>
          <p className="text-gray-400 mt-4 text-base sm:text-lg">
            Hanya 4 langkah mudah untuk kendaraan Anda bersih dan mengkilap
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {HOW_TO_BOOK_STEPS.map((item) => (
            <div
              key={item.step}
              className="bg-charcoal-800 border border-charcoal-700 rounded-2xl p-6 sm:p-8 relative"
            >
              <span
                aria-hidden="true"
                className="absolute top-2 left-4 text-6xl sm:text-7xl font-extrabold text-gold/20 select-none pointer-events-none leading-none"
              >
                {String(item.step).padStart(2, '0')}
              </span>
              <div className="relative z-10">
                <div className="bg-gold text-charcoal-950 w-10 h-10 rounded-full flex items-center justify-center font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-white mt-4">{item.title}</h3>
                <p className="text-gray-400 mt-2">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowToBook