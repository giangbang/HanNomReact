import React, { useState } from "react";
import {
  Button,
  Grid,
  Card,
  CardHeader,
  CardContent,
  FormControl,
  Alert,
  Snackbar,
  TextField,
} from "@mui/material";

import ROUTE from "../constant/route";
import API from "../constant/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [noti, setNoti] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(API.LOGIN, {
        username: username,
        password: password,
      })
      .then(function (response) {
        if (response.data.success) {
          navigate(ROUTE.HOME);
        } else {
          setNoti(true);
        }
      })
      .catch();
  };

  return (
    <Grid container style={{ display: "flex", height: window.innerHeight }}>
      <Grid item lg={4} md={4} sm={4} xs={3} style={{ margin: "auto" }}>
        <Card style={{ width: "100%" }}>
          <CardHeader title="Login" />
          <CardContent>
            <form onSubmit={handleSubmit}>
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
                  type="password"
                  label="Password"
                  variant="outlined"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <FormControl style={{ display: "inline", width: "100%" }}>
                <Button
                  variant="outlined"
                  href={ROUTE.REGISTER}
                  style={{ width: "48%" }}
                >
                  Register
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  style={{ width: "48%", float: "right" }}
                >
                  Log in
                </Button>
              </FormControl>
            </form>
          </CardContent>
        </Card>

        <Snackbar
          open={noti}
          autoHideDuration={6000}
          onClose={() => setNoti(false)}
          style={{ margin: "auto" }}
        >
          <Alert
            variant="filled"
            severity="error"
            onClose={() => setNoti(false)}
          >
            Password or Username incorrect
          </Alert>
        </Snackbar>
      </Grid>
    </Grid>
  );
}

export default Login;
