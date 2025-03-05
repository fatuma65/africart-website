import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6 font-poppins">
      <h1 className="text-4xl font-bold mb-6 ">About Us</h1>
      <div className="bg-white p-8 shadow-md rounded-md max-w-4xl flex flex-col md:flex-row">
        <div className="md:w-1/2 pr-6">
          <h2 className="text-4xl font-bold mb-4">
            We create{" "}
            <span className="text-[#102262]">
              an online market for African Artifacts
            </span>
          </h2>
          <p className="text-gray-600 mb-6">
            Our online market provides products to intersted platforms of people
            who would like to achieve a variety of interest in african culture
            and art.. Enjoy as you shop with us the most valuable and reliable
            products on the African market and contribute to the appreciation of
            this great work of art and creativity.
          </p>

          <button className="bg-[#102262] text-white px-2 py-2 rounded-md font-semibold">
            {" "}
            <Link to="/contact">CONTACT US</Link>
          </button>
        </div>
        <div className="md:w-1/2 mt-6 md:mt-0 flex justify-center">
          <div className="relative">
            <div className="absolute left-0 top-0">
              <img
                src="https://i.etsystatic.com/44785485/r/il/021330/5197517684/il_fullxfull.5197517684_6jd3.jpg"
                alt=""
                className="w-30"
              />
            </div>
            <div className="relative">
              <img
                src="https://i.pinimg.com/736x/52/e8/ca/52e8ca598c1088eb240138293820b000.jpg"
                alt=""
                className="w-30"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
