import {
  CardContent,
  CardHeader,
  FormControl,
  Grid,
  TextField,
  Card,
  Button,
} from "@mui/material";
import axios from "axios";
import React, { Component, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../constant/api";
import ROUTE from "../constant/route";

function Register() {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cfPassword, setCfPassword] = useState("");
  const handleRegister = () => {
    axios
      .post(API.REGISTER, {
        username: username,
        password: password,
      })
      .then((res) => {
        if (res.data.success) {
          navigate(ROUTE.LOGIN);
        }
      });
  };
  return (
    <Grid container style={{ display: "flex", height: window.innerHeight }}>
      <Grid item lg={4} md={4} sm={4} xs={3} style={{ margin: "auto" }}>
        <Card>
          <CardHeader title="Sign up" />
          <CardContent>
            <form>
              <FormControl style={{ width: "100%" }}>
                <TextField
                  required
                  onChange={(e) => setUsername(e.target.value)}
                  label="Username"
                  variant="outlined"
                />
              </FormControl>
              <FormControl style={{ width: "100%", padding: "12px 0" }}>
                <TextField
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  label="Password"
                  type="password"
                  variant="outlined"
                  inputProps={{
                    autocomplete: "new-password",
                    form: {
                      autocomplete: "off",
                    },
                  }}
                />
              </FormControl>
              <FormControl style={{ width: "100%", paddingBottom: "12px" }}>
                <TextField
                  required
                  onChange={(e) => {
                    setCfPassword(e.target.value);
                  }}
                  label="Confirm password"
                  variant="outlined"
                  type="password"
                  autoComplete="off"
                  defaultValue=""
                  inputProps={{
                    autocomplete: "new-password",
                    form: {
                      autocomplete: "off",
                    },
                  }}
                />
              </FormControl>
              <FormControl style={{ display: "inline", width: "100%" }}>
                <Button
                  disabled={!samePassword(password, cfPassword)}
                  variant="outlined"
                  style={{ width: "48%" }}
                  onClick={handleRegister}
                >
                  Register
                </Button>
                <Button
                  variant="contained"
                  href={ROUTE.LOGIN}
                  style={{ width: "48%", float: "right" }}
                >
                  Login
                </Button>
              </FormControl>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

const samePassword = (p1, p2) => {
  return p1 !== "" && p1 === p2;
};

export default Register;
