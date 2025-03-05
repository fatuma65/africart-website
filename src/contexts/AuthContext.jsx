import { createContext, useContext, useEffect, useState } from "react";
// import {getToken} from "../helpers.js"
// import { BEARER } from "../constant.js";
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  // const  [user,setUser] = useState({});
  const [isloading, setIsloading] = useState(false);
  // const authToken = getToken();
  const [profilePicture, setProfilePicture] = useState(null);
  const [inputData, setInputData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handlePicture = (e) => {
    setProfilePicture(e.target.files[0]);
  };
  const storedId = localStorage.getItem("Id");

  const storedUser = localStorage.getItem("userDetails");
  const [islogedIn, setIslogedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userId, setUserId] = useState(storedId ? JSON.parse(storedId) : null);
  const [userData, setUserData] = useState(
    storedUser ? JSON.parse(storedUser) : null
  );

  const postNewUser = async () => {
    try {
      console.log('clicked')
      setIsloading(true);

      const formData = new FormData();
      formData.append("files", profilePicture);

      const response = await fetch("http://localhost:1337/api/upload", {
        method: "POST",
        body: formData,
        mode: "cors",
      });
      console.log(response);

      if (!response.ok) {
        throw new Error("Failed to upload the profile picture");
      }

      const data = await response.json();
      console.log("profilePicture", data);

      const profileId = data[0]?.id;

      const postUserData = await fetch(
        "https://africart-strapi-api.onrender.com/api/auth/local/register",
        {
          method: "POST",
          body: JSON.stringify({
            firstname: inputData.firstname,
            lastname: inputData.lastname,
            email: inputData.email,
            username: inputData.username,
            password: inputData.password,
            confirmPassword: inputData.confirmPassword,
            profilePicture: profileId,
          }),
          headers: { "Content-type": "application/json" },
        }
      );
      console.log(postUserData);

      if (!postUserData.ok) {
        throw new Error("Failed to register new user");
      }

      const posted = await postUserData.json();
      console.log(posted);
    } catch (error) {
      console.log("An error has occured", error);
    } finally {
      setIsloading(false);
    }
  };

  const loginUser = async () => {
    const response = await fetch(
      "https://africart-strapi-api.onrender.com/api/auth/local",
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          identifier: inputData.email,
          password: inputData.password,
        }),
      }
    );
    console.log(response);
    const data = await response.json();
    console.log(data);
    setUserId(data.user.id);
    localStorage.setItem("Id", JSON.stringify(data.user.id));
  };

  const fetchUser = async () => {
    const response = await fetch(
      `https://africart-strapi-api.onrender.com/api/users/${parseInt(
        storedId
      )}/?populate=*`
    );
    console.log(response);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setUserData(data);
      localStorage.setItem("userDetails", JSON.stringify(data));
      setIslogedIn(true);
    } else {
      console.log('An error has occured')
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handlePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <AuthContext.Provider
      value={{
        isloading,
        profilePicture,
        handleConfirmPassword,
        handlePassword,
        showConfirmPassword,
        showPassword,
        setProfilePicture,
        handlePicture,
        postNewUser,
        setInputData,
        inputData,
        loginUser,
        userId,
        userData,
        islogedIn,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
