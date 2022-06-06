import React, { useEffect, useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar.jsx";
import Sidebar from "./Components/Sidebar/Sidebar.jsx";
import Content from "./Components/Content/Content.jsx";
import Login from "./Pages/LoginPage/Login.jsx";
import Profile from "./Pages/ProfilePage/Profile.jsx";
import "./Styles/app.css";
import ContentRight from "./Components/ContentRight/ContentRight.jsx";
import Homepage from "./Pages/HomePage/Homepage";
import CreatePost from "./Components/CreatePost/CreatePost.jsx";

import { useAuth } from "./firebase.js";

import { useSelector, useDispatch } from "react-redux";
import { loginUser, logoutUser } from "./redux/features/user/userSlice";

import axios from "axios";

const App = () => {
  const currentUser = useAuth();
  const [done, setDone] = useState(false);

  const globalUser = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      console.log(currentUser);
      fetchUser();
    } else {
      setTimeout(200);
      setDone(!done);
    }
  }, [done]);

  const fetchUser = () => {
    console.log("=================================================");
    console.log("CURRENTUSER IS SET FROM APP HERE");
    console.log("=================================================");

    axios
      .get(`api/users/${currentUser?.uid}`)
      .then(({ data }) => {
        console.log(data);
        dispatch(loginUser(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <BrowserRouter>
      {currentUser ? (
        <>
          <Navbar />
          <Routes>
            <Route path="/profile" element={<Profile />} />
            <Route path="/createPost" element={<CreatePost />} />
            <Route path="/" element={<Homepage />} />
          </Routes>
        </>
      ) : (
        <Login />
      )}
    </BrowserRouter>
  );
};

export default App;
