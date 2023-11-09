import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  TextField,
  InputAdornment,
  IconButton,
  Container,
  Typography,
  Box,
  Button,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export const Register = () => {
  const navigate = useNavigate();
  const [registerError, setRegisterError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
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

  function validateInput(e: any) {
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
      const { ok } = data;

      ok ? navigate("/dashboard") : setRegisterError(true);
    } catch (error) {
      console.log(error);
    }
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowRePassword = () => setShowRePassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Box className="session" sx={{ marginLeft: 0, margin: 0, width: "100vw" }}>
      <Box className="form_container_back"></Box>
      <Container>
        <Container sx={{ margin: 0 }}>
          <Box sx={{ height: "100vh"}} className="container">
            <form
              style={{ height: "100%", width: "100%" }}
              onSubmit={handleRegister}
            >
              <Box
                sx={{
                  height: "100%",
                  width: "100%",
                  paddingY: 15,
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                }}
              >
                <Container>
                  <Typography variant="h3">Welcome to Game Night!</Typography>
                  <Typography variant="h5">Ready to play?</Typography>
                </Container>

                <TextField
                  name="first_name"
                  placeholder="Enter Your name"
                  label="First Name"
                  color="secondary"
                  sx={{ backgroundColor: "white", borderRadius: 1 }}
                />
                <TextField
                  name="last_name"
                  placeholder="Enter Your last name"
                  label="Last Name"
                  color="secondary"
                  sx={{ backgroundColor: "white", borderRadius: 1 }}
                />
                <TextField
                  color="secondary"
                  label="email"
                  type="email"
                  name="email"
                  placeholder="Enter Your Email"
                  sx={{ backgroundColor: "white", borderRadius: 1 }}
                />
                <TextField
                  onBlur={validateInput}
                  onChange={onInputChange}
                  value={input.password}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter Your Password"
                  helperText={
                    error.password && (
                      <span className="err">{error.password}</span>
                    )
                  }
                  color="secondary"
                  sx={{ backgroundColor: "white", borderRadius: 1 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  label="Password"
                />
                <TextField
                  value={input.rePassword}
                  onChange={onInputChange}
                  onBlur={validateInput}
                  type={showRePassword ? "text" : "password"}
                  name="rePassword"
                  placeholder="Repeat Your Password"
                  helperText={
                    error.rePassword && (
                      <span className="err">{error.rePassword}</span>
                    )
                  }
                  sx={{ backgroundColor: "white", borderRadius: 1 }}
                  label="Repeat Password"
                  color="secondary"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowRePassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showRePassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Button color="secondary" variant="contained" type="submit">
                  SIGN UP
                </Button>
                <p>
                  already a member?{" "}
                  <Link to="/login">click here to log in!</Link>{" "}
                </p>
                {registerError && <p>Could not register: please try again</p>}
              </Box>
            </form>
          </Box>
        </Container>
      </Container>
    </Box>
  );
};
