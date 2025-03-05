import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <>
      <header
        className={`${
          location.pathname === "/"
            ? "bg-white/30 backdrop-blur-md border border-white/20 absolute h-14 mt-0 w-full flex justify-center items-center"
            : "bg-[#102262] w-full flex justify-center items-center h-16"
        }`}>
        <nav>
          <ul className="flex text-white cursor-pointer mx-auto text-lg">
            <li className="m-2" style={{ color: "#D51C75" }}>
              <Link to={"/"}>Home</Link>
            </li>
            <li className="m-2">
              <Link to={"/shop"}>Shop</Link>
            </li>
            <li className="m-2">
              <Link to={"/about"}>About Us</Link>
            </li>
            <li className="m-2">
              <Link to={"/contact"}>Contact Us</Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
