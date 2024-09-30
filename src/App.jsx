<<<<<<< HEAD
import { useEffect, useState } from "react";
import Header from "./Components/Header";

const App = () => {
  const current_theme = localStorage.getItem('current_theme');
  const [theme, setTheme] = useState(current_theme ? current_theme : 'light');

  useEffect(()=>{
    localStorage.setItem('current_theme', theme)
  },[theme])
  return (
    <div className={`container ${theme}`}>
      <Header theme={theme} setTheme={setTheme} />
    </div>
  );
};
=======
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Shop from "./Pages/Shop";
import About from "./Pages/About";
import Blog from "./Pages/Blog";
import Contact from "./Pages/Contact";
import React, { useEffect, useState } from "react";
import Header from "./components/Header/Header";
function App() {
  const current_theme = localStorage.getItem("current_theme");
  const [theme, setTheme] = useState(current_theme ? current_theme : "light");

  useEffect(() => {
    localStorage.setItem("current_theme", theme);
  }, [theme]);
  return (
    <>
      <div className={`container ${theme}`}>
        <Header theme={theme} setTheme={setTheme} />
      </div>

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/shop" element={<Shop />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/blog" element={<Blog />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
      </Routes>
    </>
  );
}
>>>>>>> db8ab3118f37f6c3e521002441b55e53a3a1f9fc

export default App;
