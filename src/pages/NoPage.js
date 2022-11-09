import React from "react";
import { Navbar } from "../components";
import "../styles/NothingFound.css";

function NoPage() {
  return (
    <>
      <Navbar />
      <div className="nothingFoundWrapper">
        <h1>404, Noting Found! </h1>
      </div>
    </>
  );
}

export default NoPage;
