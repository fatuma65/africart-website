import Footer from "../components/footer/Footer";
import HomeSection from "../components/HeroSection/Hero";
import Header from '../components/Header/Header'
import Trending from "../components/trendingProducts/Trending";
import Featured from "../components/featured/FeaturedSection";

const Home = () => {

  return (
    <>
    <Header />
    <HomeSection />
    <Trending />
    <Featured />
    <Footer />
    </>
  );
};

export default Home;
