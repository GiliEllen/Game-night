import React, { useState, useRef, FC } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logoutUser, userSelector } from "../../features/loggedInUser/loggedInUser";
import logo from "../../images/logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IconButton, Box } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { displayMenuSelector, setDisplayMenu } from './../../features/displayMenu/displayMenuSlice';


const Header:FC = () => {
  const loggedInUser = useAppSelector(userSelector);
  const displayMenu = useAppSelector(displayMenuSelector)
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const [error, setError] = useState(false);
  const windowSize = useRef([window.innerWidth, window.innerHeight]);
  async function handleLogout() {
    try {
      console.log("trying to logout");
      const { data } = await axios.get("/api/users/logout");
      const { logout } = data;
      dispatch(logoutUser())
      logout ? navigate("/") : setError(true);
    } catch (error) {
      console.error(error);
    }
  }

  if (windowSize.current[0] > 958) {
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
            <IconButton onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <Box
        sx={{ width: "100vw", backgroundColor: "var(--divBackgroundColor)" }}
      >
        <Box
          sx={{
            backgroundColor: "var(--divBackgroundColor)",
            width: "80%",
            display: "flex",
            justifyContent: "space-between",
            margin: "auto",
          }}
        >
          <IconButton
            onClick={() => {
              dispatch(setDisplayMenu(!displayMenu));
            }}
          >
            <MenuIcon />
          </IconButton>
          <IconButton onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Box>
      </Box>
    );
  }
}

export default Header;
