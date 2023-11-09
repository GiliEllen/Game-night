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
  const dispatch = useAppDispatch();

  const handleClickLink = () => {
    if (windowSize.current[0] < 958) {
      dispatch(setDisplayMenu(false));
    }
  };

  if (displayMenu) {
    return (
      <div className="navbar">
        <div className="navbar__link_continer">
          <Link to="/dashboard" onClick={handleClickLink}>
            Dashboard
          </Link>
          <Link to="/my-game-nights" onClick={handleClickLink}>
            My Game Nights
          </Link>
          <Link to="/my-games" onClick={handleClickLink}>
            My Games
          </Link>
          <Link to="/find-games" onClick={handleClickLink}>
            Find Games
          </Link>
          <Link to="/find-gameNights" onClick={handleClickLink}>
            Find Game Nights
          </Link>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default NavBar;
