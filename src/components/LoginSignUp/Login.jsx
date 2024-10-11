import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import "./SignUp.css";
import Header from "../Header/Header";
import Footer from "../footer/Footer";
const Login = () => {
  const data = {
    email: "",
    password: "",
  };
  const [inputData, setInputData] = useState(data);
  const [msg, setMsg] = useState(false);

  const handleInput = (event) => {
    setInputData({ ...inputData, [event.target.name]: event.target.value });
  };

  const submit = (event) => {
    event.preventDefault();
    if ( !inputData.email || !inputData.password ) {
      alert("All Fields are Mandatory!");
    } else {
      setMsg(true);
      setTimeout(() => {
        setMsg(false);
      }, 4000);
    }
  };
  
  return (
    <>
      <Header />
      <div className="wrapper">
        <div className="form-box signUp">
          <form onSubmit={submit} className="container">
            <h2>{msg ? inputData.email + " : Login Successfully!" : null}</h2>

            <h1>Login</h1>

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

            <div className="remember-forgot">
              <label>
                <input type="checkbox" />I agree to terms & conditions
              </label>
            </div>

            <button onClick={submit}>Login</button>
            <div className="register-link">
              <p>
                Don't have an account ? <Link to={"/SignUp"}> SignUp</Link>
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

export default Login;
