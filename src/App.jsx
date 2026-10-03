import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import HowToBook from './components/HowToBook'
import BookingForm from './components/BookingForm'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import FloatingWhatsApp from './components/FloatingWhatsApp'

function App() {
  return (
    <div className="min-h-screen bg-charcoal-950 text-white overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <HowToBook />
        <BookingForm />
        <About />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  )
}

export default App