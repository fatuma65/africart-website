import { Link } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import { GoogleLogin } from "@react-oauth/google";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/customHook";
import { GrFormView } from "react-icons/gr";
import { PiEyeClosedLight } from "react-icons/pi";
import formImage from "../../assets/pexels-googledeepmind-17485817.jpg";
import Spinner from '../Spinner';

const Login = () => {
  const { inputData, setInputData, loginUser, showPassword, handlePassword, isloading } =
    useAuth();

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
      navigate("/");
    }
  };

  return (
    <>
    {isloading && <Spinner />}
      <div className="wrapper">
        <div className="md:flex bg-white rounded-lg shadow-xl md:flex-row flex-col justify-center items-center md:w-[80%] w-full">
          <div className=" md:w-[50%] w-full  ">
            <img
              src={formImage}
              alt="Image by Fred Moon on Unsplash"
              className="w-full h-[50%] object-contain rounded-r-[40px] rounded-m-[40px]"
            />
          </div>

          <form
            onSubmit={submit}
            className="py-4 text-black  md:w-[50%] w-full px-8">
            <h1 className="py-4 text- text-center text-4xl font-bold">
              Welcome Back, Login
            </h1>
            <div className="flex bg-none w-full border rounded-md px-4 items-center mt-4 focus:ring-2 focus:ring-cyan-900">
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                value={inputData?.email}
                onChange={handleInput}
                aria-required={true}
                className="bg-transparent w-full p-3 outline-none "
              />
              <FaEnvelope className="icon" />
            </div>
            <div className="flex bg-none w-full border rounded-md px-4 items-center mt-4 focus:ring-2 focus:ring-cyan-900">
              <input
                type={`${!showPassword ? "password" : "text"}`}
                placeholder="Passsword"
                required
                name="password"
                aria-required={true}
                className="bg-transparent w-full p-3 outline-none "
                value={inputData?.password}
                onChange={handleInput}
              />
              {!showPassword ? (
                <PiEyeClosedLight
                  className="icon text-2xl"
                  onClick={handlePassword}
                />
              ) : (
                <GrFormView className="text-2xl" onClick={handlePassword} />
              )}
            </div>

            <button
              onClick={submit}
              role="button"
              className="border-none mt-4 w-full hover:bg-slate-500 p-3 text-white rounded-md bg-[#102262] focus:ring-2 focus:ring-cyan-900">
              Login
            </button>

            <div className=" mt-4 w-[100%] flex justify-center mx-auto ">
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  const credentialResponseDecoded = jwt_decode(
                    credentialResponse.credential
                  );
                  console.log(credentialResponseDecoded);
                }}
                onError={() => {
                  console.log("Login failed");
                }}
              />
            </div>
            <p className="text-center mt-4">
              Don&apos;t have an account?{" "}
              <span className="text-[#D51C75]">
                <Link to={"/signup"}>Sign Up </Link>
              </span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
