import Footer from "../components/footer/Footer";
import HomeSection from "../components/HeroSection/Hero";
import Header from '../components/Header/Header'
import { useEffect, useState } from "react";

const Home = () => {
  const currentTheme = localStorage.getItem("current_theme");
  const [theme, setTheme] = useState(currentTheme  ? currentTheme  : "light");

  useEffect(() => {
    // apply the preffered theme to the whole body
    document.body.className = theme
    localStorage.setItem("current_theme", theme);
  }, [theme]);
  return (
    <>
      <Header theme={theme} setTheme={setTheme} />
      <HomeSection />
      <Footer />
    </>
  );
};

export default Home;
