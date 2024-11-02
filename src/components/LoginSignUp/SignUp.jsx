import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import { useAuth } from "../../contexts/customHook";
import Header from "../Header/Header";
import Footer from "../footer/Footer";
import Navbar from "../../components/Navbar";

const SignUp = () => {
  const {
    handlePicture,
    postNewUser,
    inputData,
    setInputData,
    is_Artist,
    handleIsArtist,
  } = useAuth();
  const navigate = useNavigate();
  const [msg, setMsg] = useState(false);

  const handleInput = (event) => {
    setInputData({ ...inputData, [event.target.name]: event.target.value });
  };

  const submit = (event) => {
    event.preventDefault();
    if (
      !inputData.firstname ||
      !inputData.lastname ||
      !inputData.username ||
      !inputData.email ||
      !inputData.password ||
      !inputData.confirmPassword
    ) {
      alert("All Fields are Mandatory!");
    } else {
      postNewUser();
      navigate("/login");
      setMsg(true);
      setTimeout(() => {
        setMsg(false);
      }, 4000);
    }
  };
  return (
    <>
      <Header />
      {/* <Navbar /> */}
      <div className="wrapper">
        <form className="">
          <h2>
            {msg ? inputData?.firstname + " : SignUp Successfully!" : null}
          </h2>
          <h1 className="font-bold text-white">Sign Up</h1>
          <div className="input-box">
            <input
              type="text"
              placeholder="firstname"
              required
              name="firstname"
              value={inputData?.firstname}
              onChange={handleInput}
            />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <input
              type="text"
              placeholder="lastname"
              required
              name="lastname"
              value={inputData?.lastname}
              onChange={handleInput}
            />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <input
              type="text"
              placeholder="Username"
              required
              name="username"
              value={inputData?.username}
              onChange={handleInput}
            />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={inputData?.email}
              onChange={handleInput}
            />
            <FaEnvelope className="icon" />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Passsword"
              required
              name="password"
              value={inputData?.password}
              onChange={handleInput}
            />
            <FaLock className="icon" />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="confirmPasssword"
              required
              name="confirmPassword"
              value={inputData?.confirmPassword}
              onChange={handleInput}
            />
            <FaLock className="icon" />
          </div>
          <div className="input-box">
            <input type="file" name="profilePicture" onChange={handlePicture} />
          </div>
          <div className="remember-forgot">
            <label htmlFor="">
              {" "}
              <input
                type="checkbox"
                onChange={handleIsArtist}
                checked={is_Artist}
              />
              Sign up as artist
            </label>
            <label>
              <input type="checkbox" />I agree to terms & conditions
            </label>
          </div>

          <button onClick={submit}>Signup</button>
          <div className="register-link">
            <p>
              Already have an account? <Link to={"/login"}>Login </Link>
            </p>
          </div>
        </form>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default SignUp;
