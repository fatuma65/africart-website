<<<<<<< HEAD
import { useEffect, useState } from "react";
import Navbar from "./Components/Narbar/Navbar";

const App = () => {
  const current_theme = localStorage.getItem('current_theme');
  const [theme, setTheme] = useState(current_theme ? current_theme : 'light');

  useEffect(()=>{
    localStorage.setItem('current_theme', theme)
  },[theme])
  return (
    <div className={`container ${theme}`}>
      <Navbar theme={theme} setTheme={setTheme} />
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
function App() {
  return (
    <>
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
