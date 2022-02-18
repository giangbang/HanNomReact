import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import ROUTE from "../constant/route";
import { styled } from "@mui/material/styles";
import axios from "axios";
import API from "../constant/api";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";

const Input = styled("input")({
  display: "none",
});

export default function NavBar() {
  const [isLoading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const handleLogout = (e) => {
    axios
      .get(API.LOGOUT)
      .then((res) => {})
      .catch();
  };

  const handleUpload = (e) => {
    let inputElement = document.getElementById("contained-button-file");
    var file = inputElement.files[0];

    let formData = new FormData();
    console.log(file);
    formData.append("upload-file", file);
    console.log(formData);
    setLoading(true);
    axios
      .post(API.UPLOAD, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setLoading(false);
        if (res.data.success) {
          window.location.reload();
        } else {
          console.log(res.data);
        }
      })
      .catch();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Button color="inherit" href={ROUTE.HOME}>
              Home
            </Button>
            <label htmlFor="contained-button-file">
              <Input
                action={API.UPLOAD}
                method="post"
                accept=".zip,.rar,.7zip"
                id="contained-button-file"
                multiple
                type="file"
                onChange={handleUpload}
              />
              <Button color="inherit" component="span">
                Upload
              </Button>
            </label>
          </Typography>

          <Button color="inherit" href={ROUTE.LOGIN} onClick={handleLogout}>
            Log out
          </Button>
        </Toolbar>
      </AppBar>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
}
