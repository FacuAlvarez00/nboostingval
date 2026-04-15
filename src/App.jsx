import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Games from './components/Games'
import Services from './components/Services'
import HowItWorks from './components/HowItWorks'
import OrderForm from './components/OrderForm'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Games />
        <Services />
        <HowItWorks />
        <OrderForm />
      </main>
      <Footer />
    </>
  )
}

export default App
