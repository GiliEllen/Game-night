import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

export const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleLogin = async (ev: any) => {
    try {
      ev.preventDefault();

      const { data } = await axios.post("/api/users/login", {
        email,
        password,
      });
      console.log(data);

      if (!data.login) {
        console.log("no user found");
      } else if (data.login) {
        console.log("user found!");
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Box className="session_login" sx={{ marginLeft: 0, margin: 0, width: "100vw" }}>
      <Box className="form_container_back_login">hello</Box>
      <Container>
        <Container sx={{ margin: 0 }}>
          <Box sx={{ height: "100vh"}} className="container">
            <form
              style={{ height: "100%", width: "100%" }}
              onSubmit={handleLogin}
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
                  <Typography variant="h3">
                    Welcome back to Game Night!
                  </Typography>
                  <Typography variant="h5">Ready to play?</Typography>
                </Container>

                <TextField
                  color="secondary"
                  label="Email"
                  type="email"
                  name="email"
                  placeholder="Enter Your Email"
                  onInput={(ev: any) => {
                    setEmail(ev.target.value);
                  }}
                  sx={{ backgroundColor: "white", borderRadius: 1 }}
                />
                <TextField
                  onChange={(ev) => {
                    setPassword(ev.target.value);
                  }}
                  value={password}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter Your Password"
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

                <Button color="secondary" variant="contained" type="submit">
                  SIGN UP
                </Button>
                <p>
                  not a member? <Link to={"/"}> Click Here To Register! </Link>
                </p>
              </Box>
            </form>
          </Box>
        </Container>
      </Container>
    </Box>
  );
};
