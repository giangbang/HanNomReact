import { Backdrop, Button, Grid, Paper } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import NavBar from "./NavBar";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useEffect } from "react";
import axios from "axios";
import API from "../constant/api";
import { useNavigate, useParams } from "react-router-dom";
import { parse } from "json2csv";
import ROUTE from "../constant/route";
import ImageDetail from "./ImgDetail";
import CircularProgress from "@mui/material/CircularProgress";
import DownloadIcon from "@mui/icons-material/Download";
import BasicSelect from "./topCharacterSelect";

function ReadPage(props) {
  const [pages, setPages] = useState([]);
  const [drawBoxes, setDrawBoxes] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [images, setImages] = useState([]);

  let { id } = useParams();
  // console.log(drawBoxes)

  useEffect(() => {
    axios.get(API.GETPAGES + `?id=${id}`).then((res) => {
      if (res.data.success) {
        setPages(res.data.data);
        setImages(formatInput(res.data.data));
      } else {
        navigate(ROUTE.LOGIN);
      }
    });
  }, []);

  const handleNextPage = () => {
    setDrawBoxes([]);
    setCurrentPage((currentPage + 1) % pages.length);
  };
  const handlePrevPage = () => {
    setDrawBoxes([]);
    setCurrentPage((currentPage - 1 + pages.length) % pages.length);
  };

  const downloadBoxesAsCSV = () => {
    const fields = ["label", "x_min", "y_min", "x_max", "y_max"];
    const csv = `data:text/csvcharset=utf-8,${parse(images[currentPage].boxes, {
      fields,
    })}`;

    const hiddenElement = document.createElement("a");
    hiddenElement.setAttribute("href", encodeURI(csv));
    hiddenElement.setAttribute("target", "_blank");
    hiddenElement.setAttribute(
      "download",
      images[currentPage].filename.replace("jpg", "csv")
    );
    hiddenElement.click();
  };

  return (
    <React.Fragment>
      <NavBar></NavBar>
      <div style={{}}>
        <Grid container spacing={3} style={{ height: window.innerHeight }}>
          <Grid item lg={7} md={9} style={{ margin: "auto" }}>
            <Box style={{ width: "100%" }}>
              <ImageDetail
                image={images[currentPage]}
                drawBoxes={drawBoxes}
                setDrawBoxes={setDrawBoxes}
              />
            </Box>
          </Grid>

          <Grid
            item
            lg={4}
            md={12}
            sm={12}
            sx={12}
            style={{ margin: "auto 0" }}
          >
            <Paper
              elevation={3}
              style={{
                display: "block",
                height: "500px",
                textAlign: "left",
                padding: "1em",
              }}
            >
              {typeof images[currentPage] === "undefined" ? (
                <Backdrop
                  sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
                  open={true}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>
              ) : (
                <React.Fragment>
                  <p>{`Number of characters detected: ${images[currentPage].boxes.length}`}</p>
                  <BasicSelect labels={drawBoxes.length > 0 ? drawBoxes[0].label : []}/>
                </React.Fragment>
              )}
            </Paper>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                flexDirection: "row",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                style={{
                  maxWidth: "100px",
                  width: "10%",
                  margin: "10px",
                  textAlign: "center",
                }}
                onClick={handlePrevPage}
              >
                <ArrowBackIosIcon />
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={downloadBoxesAsCSV}
                style={{
                  maxWidth: "100px",
                  width: "10%",
                  margin: "10px",
                  textAlign: "center",
                }}
              >
                <DownloadIcon />
              </Button>
              <Button
                variant="contained"
                color="primary"
                style={{
                  maxWidth: "100px",
                  width: "10%",
                  margin: "10px",
                  textAlign: "center",
                }}
                onClick={handleNextPage}
              >
                <ArrowForwardIosIcon />
              </Button>
            </div>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
}

const formatInput = (pages) => {
  return pages.map((page) => {
    return {
      _id: page.imgId,
      width: page.size[1],
      height: page.size[0],
      boxes: formatBoxes(page.annotations, page.labels),
      filename: page.page_number,
    };
  });
};

const formatBoxes = (annotation, labels) => {
  if (annotation == null) return [];
  let res = annotation.map((a) => {
    let x_min = 100000000,
      x_max = 0,
      y_min = 10000000,
      y_max = 0;
    for (var i = 0; i < 4; ++i) {
      x_min = Math.min(x_min, a[i][0]);
      x_max = Math.max(x_max, a[i][0]);
      y_min = Math.min(y_min, a[i][1]);
      y_max = Math.max(y_max, a[i][1]);
    }
    return {
      label: null,
      x_min: x_min,
      y_min: y_min,
      x_max: x_max,
      y_max: y_max,
    };
  });
  
  for (let i = 0; i < res.length; ++i) {
    res[i].label = labels[i];
  }
  return res;
};

export default ReadPage;
