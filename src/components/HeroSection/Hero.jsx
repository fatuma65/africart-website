import "./HomeSectionStyles.css";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

const HomeSection = () => {
  const navigate = useNavigate();

  const redirectToProductsPage = () => {
    navigate("/shop");
  };

  return (
    <>
      <div className="home-section bg-cover h-screen bg-center relative">
        <div className="absolute inset-0 bg-black/50"></div>
        <Navbar />
        <div className="text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center w-full px-4 md:px-0 md:w-3/4 ">
          <h1 className="text-3xl md:text-5xl font-bold">
            Celebrate Africa&#39;s Heritage <br /> Empower its Creators
          </h1>
          <p className="font-regular py-3 w-full md:w-[450px]">
            Explore unique products that tell the story of Africa&#39;s rich
            cultural legacy and be a part of the movement to empower the
            continent&#39;s creators.
          </p>
          <button
            className="bg-[#102262] text-center p-3 md:p-2 w-40 font-medium rounded-lg hover:outline hover:bg-inherit"
            onClick={redirectToProductsPage}>
            <Link to={"/shop"}>Shop Now</Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default HomeSection;
