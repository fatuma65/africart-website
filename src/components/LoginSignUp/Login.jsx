import { useState } from "react";
import { Link } from "react-router-dom";
import { FaLock, FaEnvelope } from "react-icons/fa";
import { GoogleLogin } from "@react-oauth/google";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Header from "../Header/Header";
import Footer from "../footer/Footer";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../contexts/customHook";

const Login = () => {
  const { inputData, setInputData, loginUser } = useAuth();
  const [msg, setMsg] = useState(false);

  const handleInput = (event) => {
    setInputData({ ...inputData, [event.target.name]: event.target.value });
  };
  const navigate = useNavigate();
  const submit = (event) => {
    event.preventDefault();
    if (!inputData.email || !inputData.password) {
      alert("All Fields are Mandatory!");
    } else {
      loginUser();
      setMsg(true);
      setTimeout(() => {
        setMsg(false);
      }, 4000);
    }
    navigate("/");
  };

  return (
    <>
      <Header />
      <Navbar />
      <div className="wrapper font-poppins">
        <form onSubmit={submit} className="">
          <h2>{msg ? inputData.email + " : Login Successfully!" : null}</h2>

          <h1 className="text-white font-bold">Login</h1>

          <div className="input-box">
            <input
              type="email"
              placeholder="Email"
              autoComplete="email"
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
              autoComplete="current-password"
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

          <div className="google-button">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                const credentialResponseDecoded = jwtDecode(
                  credentialResponse.credential
                );
                console.log(credentialResponseDecoded);
              }}
              onError={() => {
                console.log("Login failed");
              }}
            />
          </div>
          <div className="register-link">
            <p>
              Don&#39;t have an account? <Link to={"/SignUp"}> SignUp</Link>
            </p>
            <Link />
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Login;
