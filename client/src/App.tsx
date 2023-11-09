import "./app.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Register } from "./views/register/Register";
import { Page404 } from "./views/page404/Page404";
import { Login } from "./views/login/Login";
import HomePage from "./views/homePage/HomePage";
import Dashboard from "./views/dashboard/Dashboard";
import MyGameNights from "./views/myGameNight/MyGameNights";
import MyGames from "./views/myGames/MyGames";
import FindGames from "./views/findGames/FindGames";
import { FindGameNights } from "./views/findGameNights/FindGameNights";

function App() {

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
