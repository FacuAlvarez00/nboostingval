import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Games from './components/Games'
import Services from './components/Services'
import HowItWorks from './components/HowItWorks'
import OrderForm from './components/OrderForm'
import Footer from './components/Footer'
import DiscordButton from './components/DiscordButton'

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
      <DiscordButton />
    </>
  )
}

export default App
