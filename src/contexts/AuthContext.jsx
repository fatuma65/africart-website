/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { AuthContext } from "./context";
import { useNavigate } from "react-router-dom";
export const AuthProvider = ({ children }) => {
  const [isloading, setIsloading] = useState(false);
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
  const navigateHome = useNavigate();

  const storedUser = localStorage.getItem("userDetails");
  const [islogedIn, setIslogedIn] = useState(false);
  const [userId, setUserId] = useState(storedId ? storedId : null);
  const [userData, setUserData] = useState(
    storedUser ? JSON.parse(storedUser) : null
  );
  const [is_Artist, setIsArtist] = useState(false);
  const [artistData, setArtist] = useState(null);
  const handleIsArtist = () => {
    setIsArtist(!is_Artist);
  };
  const formData = new FormData();
  formData.append("files", profilePicture);

  const postNewUser = async () => {
    setIsloading(true);
    try {
      const response = await fetch("http://localhost:1337/api/upload", {
        method: "POST",
        body: formData,
        mode: "cors",
      });
      const data = await response.json();

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
            is_artist: Boolean(is_Artist),
          }),
          headers: { "Content-type": "application/json" },
        }
      );
      const posted = await postUserData.json();

      if (is_Artist) {
        const isArtistResponse = await fetch(
          "https://africart-strapi-api.onrender.com/api/artists",
          {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
              data: {
                users_permissions_user: posted.user,
              },
            }),
          }
        );
        const isArtistData = await isArtistResponse.json();
        console.log(isArtistData);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsloading(false);
    }
  };

  const fetchUser = async () => {
    const response = await fetch(
      `https://africart-strapi-api.onrender.com/api/users/${parseInt(
        userId
      )}/?populate=*`
    );
    if (response.ok) {
      const data = await response.json();
      if (data) {
        setUserData(data);
        setArtist(data.artist);
        setIslogedIn(true);
        localStorage.setItem("userDetails", JSON.stringify(data));
      }
    }
  };
  useEffect(() => {
    if (userId) {
      fetchUser();
    }
  }, [userId]);

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
    const data = await response.json();
    if (data.user && data.user.id) {
      setUserId(data.user.id);
      localStorage.setItem("token", data.jwt);
      localStorage.setItem("Id", JSON.stringify(data.user.id));
      localStorage.setItem("isArtist", JSON.stringify(data.user.is_artist));
      fetchUser();
    }
  };
  const logoutUser = () => {
    setIslogedIn(false);
    setUserId(null);
    setUserData(null);
    localStorage.clear();
    navigateHome('/')
    
  };
  return (
    <AuthContext.Provider
      value={{
        isloading,
        profilePicture,
        setProfilePicture,
        handlePicture,
        postNewUser,
        setInputData,
        inputData,
        loginUser,
        userId,
        userData,
        islogedIn,
        is_Artist,
        handleIsArtist,
        artistData,
        logoutUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
