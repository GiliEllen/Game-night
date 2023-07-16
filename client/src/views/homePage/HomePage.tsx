import React from "react";
import { useAppSelector } from "../../app/hooks";
import { userSelector } from "../../features/loggedInUser/loggedInUser";
import { useEffect } from "react";
import { login } from "../../features/loggedInUser/userAPI";
import { useAppDispatch } from "../../app/hooks";
import NavBar from "../../components/navbar/NavBar";
import { Outlet } from "react-router-dom";
import Header from "../../components/header/Header";

function HomePage() {
  const loggedInUser = useAppSelector(userSelector);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(login());
  }, []);

  return (
    <div className="page home">
      <Header />
      <NavBar />
      <Outlet />
    </div>
  );
}

export default HomePage;
