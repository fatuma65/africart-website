import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import "./Login.css";
const Signup = () => {
  const data = {
    name: "",
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
    if (!inputData.name || !inputData.email || !inputData.password) {
      alert("All Fields are Mandatory!");
    } else {
      setMsg(true);
      setTimeout(() => {
        setMsg(false);
      }, 4000);
    }
  };

  return (
    <div className="wrapper">
      <div className="form-box signUp">
        <form onSubmit={submit} className="container">
          <h2>{msg ? inputData.name + " : SignUp Successfully!" : null}</h2>

          <h1>Sign Up</h1>
          <div className="input-box">
            <input
              type="text"
              placeholder="Username"
              reqiured
              name="name"
              value={inputData.name}
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
          <div className="remember-forgot">
            <label>
              <input type="checkbox" />I agree to terms & conditions
            </label>
          </div>

          <button onClick={submit}>Signup</button>
          <div className="register-link">
            <p>
              Already have an account ? <Link to={"/login"}> <a href="login">Login</a></Link>
             
            </p>
            <Link />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
