import { useState } from "react";
import "./FooterStyles.css";
import { Link } from "react-router-dom";
const Footer = () => {
  const [email, setEmail] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("You have successfully subscribed to our newsletter.");
    setEmail("");
  };
  return (
    <>
      <div className="bg-[#102262] relative main-div">
        <div className="bg-[#D51C75] lg:w-3/4 w-full lg:flex mx-auto justify-between p-2 pink-bg">
          <div className="lg:p-4 p-2 text-white">
            <h1 className="text-4xl font-bold">Subscribe to our Newsletter</h1>
            <p className="lg:m-0 ">
              Sign up for our monthly newsletter for the latest news and
              articles.
            </p>
          </div>
          <div className="lg:p-4 inputs">
            <input
              type="email"
              placeholder="Email"
              value={email}
              className="lg:p-2 m-4 bg-white"
              onChange={handleEmail}
            />
            <button
              className="bg-[#102262] p-2 ml-4 text-white font-semibold text-center"
              onClick={handleSubmit}>
              Send
            </button>
          </div>
        </div>
        <div className="lg:flex justify-around  lg:m-4 ">
          <div className="text-white lg:p-8  lg:w-1/2 texts">
            <h1 className="text-4xl font-bold lg:p-4 p-2">
              Afri<span style={{ color: "#D51C75" }}>Cart</span>
            </h1>
            <p className=" lg:p-4 p-2">
              Our mission is to create a platform that empowers African
              artisans, entrepreneurs and event organizers by providing them a
              global marketplace to showcase their products and cultural
              experiences.
            </p>
            <p className=" lg:p-4 p-2">
              We aim to bridge the gap between african creators and
              international consumers promoting econnomic growth, cultural
              preservation, and community empowerment. Through this platform, we
              seek to celebrate the richness of african heritage while fostering
              sustainable development and supporting local talent across the
              continent.
            </p>
          </div>
          <div className="text-white company lg:p-2 lg:m-2 ">
            <h3 className="text-xl font-semibold p-2">Company</h3>
            <ul className="">
              <li className="">
                <Link to={"/about"}>About Us</Link>
              </li>
              <li>Online Order</li>
              <li>Support</li>
              <li>
                <Link to={"/contact"}>Contact Us</Link>
              </li>
            </ul>
          </div>
          <div className="text-white touch m-2 p-2">
            <h3 className="text-xl font-semibold p-2">Get in touch</h3>
            <ul className="">
              <li>Kampala, Uganda</li>
              <li>+256 701 234 567</li>
              <li>africart@gmail.com</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
