import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import "./SignUp.css";
import Header from "../Header/Header";
import Footer from "../footer/Footer";
const Signup = () => {
  const data = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePicture: null,
  };
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const [inputData, setInputData] = useState(data);
  const [msg, setMsg] = useState(false);

  const handleInput = (event) => {
    setInputData({ ...inputData, [event.target.name]: event.target.value });
  };
  const handleprofilePicture = (event) => {
    setInputData({ ...inputData, profilePicture: event.target.files[0] });
  };
  const postUserData = async () => {
    const submitData = new FormData();
    submitData.append("firstname", inputData.firstname);
    submitData.append("lastname", inputData.lastname);
    submitData.append("username", inputData.username);
    submitData.append("email", inputData.email);
    submitData.append("firstname", inputData.firstname);
    submitData.append("password", inputData.password);
    submitData.append("confirmPassword", inputData.confirmPassword);
    submitData.append("profilePicture", inputData.profilePicture);

    const response = await fetch(
      "https://africart-strapi-api.onrender.com/api/auth/local/register",
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(submitData),
      }
    );
    const data = await response.json();
    console.log(data);
  };

  const submit = (event) => {
    event.preventDefault();
    if ( !inputData.firstname || !inputData.lastname || !inputData.username || !inputData.email || !inputData.password ||!inputData.confirmPassword) {
      alert("All Fields are Mandatory!");
    } else {
      setMsg(true);
      setTimeout(() => {
        setMsg(false);
      }, 4000);
    }
    postUserData();
  };

  return (
    <>
      <Header />
      <div className="wrapper">
        <div className="form-box signUp">
          <form onSubmit={submit} className="container">
            <h2>{msg ? inputData.name + " : SignUp Successfully!" : null}</h2>

            <h1>Sign Up</h1>
            <div className="input-box">
              <input
                type="text"
                placeholder="firstname"
                reqiured
                name="firstname"
                value={inputData.firstname}
                onChange={handleInput}
              />
              <FaUser className="icon" />
            </div>
            <div className="input-box">
              <input
                type="text"
                placeholder="lastname"
                reqiured
                name="lastname"
                value={inputData.lastname}
                onChange={handleInput}
              />
              <FaUser className="icon" />
            </div>
            <div className="input-box">
              <input
                type="text"
                placeholder="Username"
                reqiured
                name="username"
                value={inputData.username}
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
                value={inputData.email}
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
                value={inputData.password}
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
                value={inputData.confirmPassword}
                onChange={handleInput}
              />
              <FaLock className="icon" />
            </div>
            <div className="input-box">
              <input
                type="file"
                name="profilePicture"
                onChange={handleprofilePicture}
              />
            </div>
            <div className="remember-forgot">
              <label>
                <input type="checkbox" />I agree to terms & conditions
              </label>
            </div>

            <button onClick={submit}>Signup</button>
            <div className="register-link">
              <p>
                Already have an account ?{" "}
                <Link to={"/login"}>
                  {" "}
                  <a href="login">Login</a>
                </Link>
              </p>
              <Link />
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Signup;
