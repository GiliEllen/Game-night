import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const handleLogin = async (ev: any) => {
    try {
      ev.preventDefault();
      const email = ev.target.email.value;
      const password = ev.target.password.value;

      const { data } = await axios.post("/api/users/login", {
        email,
        password,
      });
      console.log(data);
      const { userArray } = data;

      if (userArray.length === 0) {
        console.log("no user found");
      } else if (userArray.length > 0) {
        console.log("user found!");
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="session_login">
      <div className="session_login__form_container_login">
        <form onSubmit={handleLogin}>
          <div>
            <h1>Welcome Back to Game Night!</h1>
            <h3>Ready to play?</h3>
          </div>

          <input type="email" name="email" placeholder="Enter Email Here" />
          <input
            type="password"
            name="password"
            placeholder="Enter Password Here"
          />
          <button className="button_main" type="submit">
            LOG IN
          </button>
          <p>
            not a member? <Link to={"/"}> Click Here To Register! </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
