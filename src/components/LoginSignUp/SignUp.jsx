import { useCallback, useState, useRef } from "react";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import { useAuth } from "../../contexts/customHook";

import formImage from "../../assets/pexels-googledeepmind-17485817.jpg";
import UserForm from "./UserForm";
const SignUp = () => {
  const {
    handlePicture,
    postNewUser,
    inputData,
    setInputData,
    showConfirmPassword,
    showPassword,
    handleConfirmPassword,
    handlePassword,
    isloading,
    handleIsArtist,
    is_Artist
  } = useAuth();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const checkedRef = useRef(null);

  const handleInput = (event) => {
    setInputData({ ...inputData, [event.target.name]: event.target.value });
  };

  const validateForm = useCallback((data) => {
    let formErrors = {};
    if (!data.firstname.trim()) {
      formErrors.firstname = "Please Enter your first name";
    }
    if (!data.lastname.trim()) {
      formErrors.lastname = "Please Enter your last name";
    }
    if (!data.email.trim()) {
      formErrors.email = "Please Enter your email";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      formErrors.email = "Enter a valid email address";
    }
    if (!data.username.trim()) {
      formErrors.username = "Please Enter your username";
    }
    if (!data.password.trim()) {
      formErrors.password = "Please Enter your password";
    } else if (data.password.length < 5) {
      formErrors.password = "Password must be greater than 5 characters";
    }
    if (!data.confirmPassword.trim()) {
      formErrors.confirmPassword = "Please Enter your password";
    } else if (data.password !== data.confirmPassword) {
      formErrors.confirmPassword = "Passwords do not match";
    }

    return formErrors;
  }, []);

  const submit =  (event) => {
    event.preventDefault();
    const newErrors = validateForm(inputData);
    setErrors(newErrors);

    if (!checkedRef.current.checked) {
      alert("You must agree to the terms and conditions");
      return;
    }

    if (Object.keys(newErrors).length === 0) {
      postNewUser();
      navigate("/login");
    }
  };

  return (
    <>
      {isloading && <Spinner />}
      <Navbar />
      <div className="wrapper py-8 ">
        <div className="md:flex bg-white rounded-lg shadow-xl md:flex-row flex-col justify-center items-center md:w-[80%] w-full h-full">
          <div className=" md:w-[50%] w-full h-full ">
            <img
              src={formImage}
              alt="Image by Fred Moon on Unsplash"
              className="w-full h-full object-cover rounded-r-[40px] rounded-m-[40px]"
            />
          </div>
          <UserForm
            handleConfirmPassword={handleConfirmPassword}
            handleInput={handleInput}
            handlePassword={handlePassword}
            handlePicture={handlePicture}
            inputData={inputData}
            submit={submit}
            errors={errors}
            showConfirmPassword={showConfirmPassword}
            showPassword={showPassword}
            checkedRef={checkedRef}
            isloading={isloading}
            handleIsArtist={handleIsArtist}
          />
        </div>
      </div>
    </>
  );
};

export default SignUp;
