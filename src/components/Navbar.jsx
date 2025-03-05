import { Link, useLocation } from "react-router-dom";
import { navLinks } from "../constants";
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
          <ul className="flex text-white cursor-pointer mx-auto">
            {navLinks.map((link) => (
              <li
                key={link.id}
                className="m-2 font-poppins hover:text-[#D51C75]">
                <Link to={link.linkTo}>{link.title}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
