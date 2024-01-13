import React from "react";
import classes from "./Authenticaton.module.scss";
import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
import CustomButton from "../components/ui/Button";

const AuthenticationPage: React.FC = () => {
  return (
    <section className={classes["form"]}>
      <h2 className={classes["form__heading"]}>Log in</h2>
      <form className={classes["form__container"]}>
        <Form.Label htmlFor="inputEmailId">Email address</Form.Label>
        <Form.Control
          type="email"
          id="inputEmailId"
          aria-describedby="emailAddress"
        />
        <Form.Label htmlFor="inputPassword">Password</Form.Label>
        <Form.Control
          type="password"
          id="inputPassword"
          aria-describedby="passwordH"
        />
        <CustomButton type="submit" value="submit">
          Submit
        </CustomButton>
      </form>
    </section>
  );
};

export default AuthenticationPage;
