import { useState, useEffect, useMemo } from 'react'
import { WHATSAPP_NUMBER, SERVICES } from '../config'

function BookingForm() {
  const today = useMemo(() => {
    const d = new Date()
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }, [])

  const [nama, setNama] = useState('')
  const [nomor, setNomor] = useState('')
  const [kendaraan, setKendaraan] = useState('')
  const [layanan, setLayanan] = useState('')
  const [tanggal, setTanggal] = useState('')
  const [jam, setJam] = useState('')
  const [catatan, setCatatan] = useState('')

  const [error, setError] = useState('')
  const [showSummary, setShowSummary] = useState(false)

  // Filter services based on selected vehicle category
  const filteredServices = useMemo(() => {
    if (!kendaraan) return []
    const targetCategory = kendaraan === 'mobil' ? 'MOBIL' : 'MOTOR'
    return SERVICES.filter((service) => service.category === targetCategory)
  }, [kendaraan])

  // Listen for selectService event (e.g. from Services cards)
  useEffect(() => {
    const handleSelectService = (event) => {
      const service = event.detail
      if (!service) return

      // Best-effort: detect vehicle type from category
      if (service.category === 'MOBIL') {
        setKendaraan('mobil')
        setLayanan(`${service.name} - ${service.price}`)
      } else if (service.category === 'MOTOR') {
        setKendaraan('motor')
        setLayanan(`${service.name} - ${service.price}`)
      } else {
        setLayanan(`${service.name} - ${service.price}`)
      }
    }

    window.addEventListener('selectService', handleSelectService)
    return () => window.removeEventListener('selectService', handleSelectService)
  }, [])

  // Auto-dismiss error after 4 seconds
  useEffect(() => {
    if (!error) return
    const timer = setTimeout(() => setError(''), 4000)
    return () => clearTimeout(timer)
  }, [error])

  const handleKendaraanChange = (e) => {
    setKendaraan(e.target.value)
    setLayanan('') // reset layanan when vehicle changes
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate required fields
    if (!nama.trim() || !nomor.trim() || !kendaraan || !layanan || !tanggal || !jam) {
      setError('Mohon lengkapi semua field yang wajib diisi.')
      return
    }

    setError('')
    setShowSummary(true)
  }

  const handleEdit = () => {
    setShowSummary(false)
  }

  const handleConfirmWhatsApp = () => {
    const message = `Halo Bight Auto Spa, saya ingin melakukan booking.

Nama: ${nama}
No. WhatsApp: ${nomor}
Kendaraan: ${kendaraan === 'mobil' ? 'Mobil' : 'Motor'}
Layanan: ${layanan}
Tanggal: ${tanggal}
Jam: ${jam}
Catatan: ${catatan || '-'}

Mohon konfirmasi booking saya. Terima kasih.`
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  // Base styling for inputs.
  // `text-base` (16px) is REQUIRED to prevent iOS Safari from auto-zooming
  // the viewport when an input is focused. `appearance-none` removes the
  // default rounded iOS form-control rendering.
  const inputClass =
    'bg-charcoal-900 border border-charcoal-700 text-white text-base placeholder:text-gray-500 rounded-xl px-4 py-3 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold w-full transition-colors duration-300 appearance-none'
  const labelClass = 'text-sm font-medium text-gray-300 mb-2 block'

  // Summary view
  if (showSummary) {
    const summaryItems = [
      { label: 'Nama Lengkap', value: nama },
      { label: 'Nomor WhatsApp', value: nomor },
      { label: 'Jenis Kendaraan', value: kendaraan === 'mobil' ? 'Mobil' : 'Motor' },
      { label: 'Layanan', value: layanan },
      { label: 'Tanggal Booking', value: tanggal },
      { label: 'Jam Booking', value: jam },
      { label: 'Catatan Tambahan', value: catatan || '-' },
    ]

    return (
      <section id="booking" className="py-16 sm:py-24 bg-charcoal-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Konfirmasi <span className="text-gold">Booking</span>
            </h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Periksa kembali detail booking Anda sebelum mengirim ke WhatsApp.
            </p>
          </div>

          <div className="max-w-3xl mx-auto bg-charcoal-800 border border-charcoal-700 rounded-2xl p-6 sm:p-10 shadow-2xl shadow-black/50 animate-slide-up">
            <div className="border border-green-500/40 bg-green-500/10 rounded-xl p-4 mb-6">
              <p className="text-green-300 font-semibold">
                Data booking Anda sudah lengkap. Silakan konfirmasi melalui WhatsApp.
              </p>
            </div>

            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {summaryItems.map((item) => (
                <div
                  key={item.label}
                  className="bg-charcoal-900 border border-charcoal-700 rounded-xl p-4"
                >
                  <dt className="text-sm text-gray-400 uppercase tracking-wider">
                    {item.label}
                  </dt>
                  <dd className="text-white font-semibold mt-1 break-words">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={handleEdit}
                className="border-2 border-white text-white hover:bg-white hover:text-charcoal-950 font-semibold py-4 rounded-xl transition-all duration-300"
              >
                Edit Booking
              </button>
              <button
                type="button"
                onClick={handleConfirmWhatsApp}
                className="bg-gold hover:bg-gold-light text-charcoal-950 font-bold py-4 rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-gold/20"
              >
                Konfirmasi Booking via WhatsApp
              </button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Form view
  return (
    <section id="booking" className="py-16 sm:py-24 bg-charcoal-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Booking <span className="text-gold">Layanan</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Isi form di bawah ini untuk melakukan booking
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="max-w-4xl mx-auto bg-charcoal-800 border border-charcoal-700 rounded-2xl p-6 sm:p-10 shadow-2xl shadow-black/50 animate-slide-up"
        >
          {error && (
            <div
              role="alert"
              className="mb-6 bg-red-500/10 border border-red-500 text-red-300 rounded-xl p-4"
            >
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nama Lengkap */}
            <div className="md:col-span-1">
              <label htmlFor="nama" className={labelClass}>
                Nama Lengkap
              </label>
              <input
                id="nama"
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Masukkan nama lengkap Anda"
                required
                className={inputClass}
              />
            </div>

            {/* Nomor WhatsApp */}
            <div className="md:col-span-1">
              <label htmlFor="nomor" className={labelClass}>
                Nomor WhatsApp
              </label>
              <input
                id="nomor"
                type="tel"
                value={nomor}
                onChange={(e) => setNomor(e.target.value)}
                placeholder="08xxxxxxxxxx"
                required
                className={inputClass}
              />
            </div>

            {/* Jenis Kendaraan */}
            <div className="md:col-span-1">
              <label htmlFor="kendaraan" className={labelClass}>
                Jenis Kendaraan
              </label>
              <select
                id="kendaraan"
                value={kendaraan}
                onChange={handleKendaraanChange}
                required
                className={inputClass}
              >
                <option value="" disabled>
                  -- Pilih jenis kendaraan --
                </option>
                <option value="mobil">Mobil</option>
                <option value="motor">Motor</option>
              </select>
            </div>

            {/* Layanan */}
            <div className="md:col-span-1">
              <label htmlFor="layanan" className={labelClass}>
                Layanan
              </label>
              <select
                id="layanan"
                value={layanan}
                onChange={(e) => setLayanan(e.target.value)}
                required
                disabled={!kendaraan}
                className={`${inputClass} ${!kendaraan ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <option value="" disabled>
                  {kendaraan ? '-- Pilih layanan --' : 'Pilih jenis kendaraan terlebih dahulu'}
                </option>
                {filteredServices.map((service) => (
                  <option
                    key={service.id}
                    value={`${service.name} - ${service.price}`}
                  >
                    {`${service.name} - ${service.price}`}
                  </option>
                ))}
              </select>
            </div>

            {/* Tanggal Booking */}
            <div className="md:col-span-1">
              <label htmlFor="tanggal" className={labelClass}>
                Tanggal Booking
              </label>
              <input
                id="tanggal"
                type="date"
                value={tanggal}
                onChange={(e) => setTanggal(e.target.value)}
                min={today}
                required
                className={inputClass}
              />
            </div>

            {/* Jam Booking */}
            <div className="md:col-span-1">
              <label htmlFor="jam" className={labelClass}>
                Jam Booking
              </label>
              <input
                id="jam"
                type="time"
                value={jam}
                onChange={(e) => setJam(e.target.value)}
                required
                className={inputClass}
              />
            </div>

            {/* Catatan Tambahan */}
            <div className="md:col-span-2">
              <label htmlFor="catatan" className={labelClass}>
                Catatan Tambahan
              </label>
              <textarea
                id="catatan"
                value={catatan}
                onChange={(e) => setCatatan(e.target.value)}
                rows={3}
                placeholder="Tambahkan catatan jika diperlukan (opsional)"
                className={inputClass}
              />
            </div>

            {/* Submit */}
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-gold hover:bg-gold-light text-charcoal-950 font-bold py-4 rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-gold/20"
              >
                Lanjut ke Konfirmasi
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}

export default BookingForm