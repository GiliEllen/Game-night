import "./app.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Register } from "./features/register/Register";
import { Page404 } from "./features/page404/Page404";
import { Login } from "./features/login/Login";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { userSelector } from "./features/loggedInUser/loggedInUser";
import { useEffect } from "react";
import { login } from "./features/loggedInUser/userAPI";
import HomePage from './features/homePage/HomePage';
import Dashboard from './components/dashboard/Dashboard';
import MyGameNights from './components/myGameNight/MyGameNights';
import MyGames from './components/myGames/MyGames';
import FindGames from './components/findGames/FindGames';
import { FindGameNights } from './components/findGameNights/FindGameNights';


function App() {

  const loggedInUser = useAppSelector(userSelector)

  return (
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Page404 />} />
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/my-game-nights" element={<MyGameNights />} />
          <Route path="/my-games" element={<MyGames />} />
          <Route path="/find-games" element={<FindGames />} />
          <Route path="/find-gameNights" element={<FindGameNights />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
