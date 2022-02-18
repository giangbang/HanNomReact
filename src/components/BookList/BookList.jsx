import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { Component, useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../constant/api";
import ROUTE from "../../constant/route";
import Book from "./BookCell";
import BookCell from "./BookCell";

function BookList(props) {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  useEffect(() => {
    axios
      .get(API.GETBOOK)
      .then((res) => {
        if (res.data.success) {
          setBooks(res.data.data);
        } else {
          navigate(ROUTE.LOGIN);
        }
      })
      .catch();
  }, []);

  return (
    <Grid
      container
      direction="row"
      justify="flex-start"
      alignItems="flex-start"
      spacing={1}
    >
      {books.map((book) => {
        return (
          <Grid item xs={12} sm={6} md={3}>
            <Book
              src={API.GETIMG + `?id=${book.cover_image_id}`}
              title={book.name}
              created={book.created}
              bookid={book._id}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}

export default BookList;
