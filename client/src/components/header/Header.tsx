import React, { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { userSelector } from "../../features/loggedInUser/loggedInUser";
import logo from "../../images/logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import { IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

function Header() {
  const loggedInUser = useAppSelector(userSelector);
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  async function handleLogout() {
    try {
      console.log("trying to logout");
      const { data } = await axios.get("/api/users/logout");
      const { logout } = data;
      logout ? navigate("/") : setError(true);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="header header_grid">
      <div className="header__right">
        <div className="header__right__logo">
          <img src={logo} alt="" />
        </div>
        <div className="header__left__user_container">
          <h3>Hello {loggedInUser?.firstName}! Ready to play?</h3>
        </div>
      </div>
      <div className="header__left">
        <div className="header__left__user_settings">
          <IconButton>
            <NotificationsIcon />
          </IconButton>
          <IconButton>
            <SettingsIcon />
          </IconButton>
          <IconButton onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
          {/* <span className="material-symbols-outlined">notifications</span>
          <span className="material-symbols-outlined">settings</span>
          <div onClick={handleLogout}>
            <span className="material-symbols-outlined">logout</span>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Header;
