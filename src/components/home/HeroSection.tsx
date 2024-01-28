// import React from 'react'
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import CustomButton from "../ui/Button";
import React, { useState } from "react";

import CustomModal from "../ui/CustomModal";
import classes from "./HeroSection.module.scss";

function HeroSection() {
  const [inputQuery, setInputQuery] = useState("");
  // const [searchData, setSearchData] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);

  const [modalShow, setModalShow] = useState(false);

  //input handler
  const handleInput = async function (e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    setInputQuery(value);
  };

  const handleSearch = async function () {
    if (inputQuery.trim().length <= 0) return;
    setModalShow(true);
  };

  // console.log(inputQuery, "input");

  return (
    <header className={classes.heroSection}>
      <h1 className={classes["heroSection__header"]}>
        to know is to learn, to learn is to grow
      </h1>
      <div className={classes["heroSection__search"]}>
        <InputGroup>
          <Form.Control
            placeholder="search here"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            value={inputQuery}
            onChange={handleInput}
          />
          <CustomButton type="button" value="button" onClick={handleSearch}>
            Search
          </CustomButton>
        </InputGroup>
      </div>
      {modalShow && inputQuery && (
        <CustomModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          query={inputQuery}
        />
      )}
    </header>
  );
}

export default HeroSection;
