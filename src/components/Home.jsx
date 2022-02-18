import React, { Component } from "react";
import BookList from "./BookList/BookList";
import NavBar from "./NavBar";

function Home() {
  return (
    <React.Fragment>
      <NavBar />
      <BookList />
    </React.Fragment>
  );
}

export default Home;
