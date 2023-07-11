import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export const Register = () => {
  const navigate = useNavigate();
  const [registerError, setRegisterError] = useState(false);
  const [input, setInput] = useState({
    password: "",
    rePassword: "",
  });

  const [error, setError] = useState({
    password: "",
    rePassword: "",
  });

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateInput(e);
  }

  function validateInput(e: React.ChangeEvent<HTMLInputElement>) {
    let { name, value } = e.target;
    setError((prev) => {
      const stateObj: any = { ...prev, [name]: "" };

      switch (name) {
        case "password":
          if (!value) {
            stateObj[name] = "Please enter Password.";
          } else if (input.rePassword && value !== input.rePassword) {
            stateObj["confirmPassword"] =
              "Password and Confirm Password does not match.";
          } else {
            stateObj["rePassword"] = input.rePassword ? "" : error.rePassword;
          }
          break;

        case "rePassword":
          if (!value) {
            stateObj[name] = "Please enter Confirm Password.";
          } else if (input.password && value !== input.password) {
            stateObj[name] = "Password and Confirm Password does not match.";
          }
          break;

        default:
          break;
      }

      return stateObj;
    });
  }
  const handleRegister = async (ev: any) => {
    try {
      ev.preventDefault();
      console.log("trying to register");
      const firstName = ev.target.first_name.value;
      const lastName = ev.target.last_name.value;
      const email = ev.target.email.value;
      const password = ev.target.password.value;
      const rePassword = ev.target.rePassword.value;

      const { data } = await axios.post("/api/users/register", {
        firstName,
        lastName,
        email,
        password,
        rePassword,
      });
      console.log(data);
      const {message} = data;

      message.affectedRows ? navigate("/home") : setRegisterError(true)
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="session">
      <div className="session__form_container_register">
        
        <form className="form_container__form" onSubmit={handleRegister}>
        <div className="session__form_container_register__header">
          <h1>Welcome to Game Night!</h1>
          <h3>Ready to play?</h3>
        </div>
          
          <input type="text" name="first_name" placeholder="Enter Your name" />
          <input
            type="text"
            name="last_name"
            placeholder="Enter Your last name"
          />
          <input type="email" name="email" placeholder="Enter Your Email" />
          <input
            onBlur={validateInput}
            onChange={onInputChange}
            value={input.password}
            type="password"
            name="password"
            placeholder="Enter Your Password"
          />
          {error.password && <span className="err">{error.password}</span>}
          <input
            value={input.rePassword}
            onChange={onInputChange}
            onBlur={validateInput}
            type="password"
            name="rePassword"
            placeholder="Repeat Your Password"
          />
          {error.rePassword && <span className="err">{error.rePassword}</span>}
          <button className="button_main" type="submit">
            SIGN UP
          </button>
          <p>
            already a member? <Link to="/login">click here to log in!</Link>{" "}
          </p>
          {registerError && <p>Could not register: please try again</p>}
        </form>
      </div>
    </div>
  );
};
