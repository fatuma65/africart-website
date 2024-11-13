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
        <div className="absolute inset-0 bg-black/50 "></div>
        <Navbar />
        <div className="text-white absolute top-1/2 left-1/2 lg:transform -translate-x-1/2 -translate-y-1/2 flex flex-col home-sec">
          <h1 className="text-6xl text-center font-bold font-poppins ">
            Celebrate Africa&#39;s Heritage Empower its Creators
          </h1>
          <p className="text-center m-4  font-poppins ">
            Explore unique products that tell the story of Africa&#39;s rich
            cultural legacy and be a part of the movement to empower the
            continent&#39;s creators.
          </p>
          <button
            className="bg-[#102262] text-center  font-poppins  lg:p-3 p-4 w-48 mx-auto font-semibold rounded-lg hover:outline hover:bg-inherit"
            onClick={redirectToProductsPage}>
            <Link to={"/shop"}>Shop Now</Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default HomeSection;
