import Footer from '../components/footer/Footer'
import Header from '../components/Header/Header'
import Navbar from '../components/Navbar'
import StripePayment from '../components/StripePayment'

const Checkout = () => {
  return (
    <>
    <Header />
    <Navbar />
    <StripePayment />
    <Footer />
    </>
  )
}

export default Checkout