// import React from 'react'
import classes from "./HeroSection.module.scss";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import CustomButton from "../ui/Button";
function HeroSection() {
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
          />
          <CustomButton type="button" value="button">
            Search
          </CustomButton>
        </InputGroup>
      </div>
    </header>
  );
}

export default HeroSection;
