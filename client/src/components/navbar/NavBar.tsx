import { useRef } from "react";
import { Link } from "react-router-dom";
import {
  displayMenu,
  displayMenuSelector,
  setDisplayMenu,
} from "./../../features/displayMenu/displayMenuSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

function NavBar() {
  const windowSize = useRef([window.innerWidth, window.innerHeight]);
  const displayMenu = useAppSelector(displayMenuSelector);
  const dispatch = useAppDispatch()

  if (displayMenu) {
    return (
      <div className="navbar">
        <div className="navbar__link_continer">
          <Link to="/dashboard" onClick={() => dispatch(setDisplayMenu(false))}>Dashboard</Link>
          <Link to="/my-game-nights" onClick={() => dispatch(setDisplayMenu(false))}>My Game Nights</Link>
          <Link to="/my-games" onClick={() => dispatch(setDisplayMenu(false))}>My Games</Link>
          <Link to="/find-games" onClick={() => dispatch(setDisplayMenu(false))}>Find Games</Link>
          <Link to="/find-gameNights" onClick={() => dispatch(setDisplayMenu(false))}>Find Game Nights</Link>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default NavBar;
