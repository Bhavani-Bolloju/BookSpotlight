// import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import classes from "./HeaderNavigation.module.scss";
import icon from "../../../public/Reading.svg";
import { Link, NavLink } from "react-router-dom";
import CustomButton from "../ui/Button";
import { useNavigate } from "react-router-dom";

function HeaderNavigation() {
  const navigate = useNavigate();

  return (
    <div className={classes.navbar}>
      <Navbar>
        <Container className={classes["navbar__container"]}>
          <NavLink to="/" className={classes["navbar__heading"]}>
            <img src={icon} alt="logo" />
            <span>BookSpotlight</span>
          </NavLink>
          <Nav className={` ${classes["navbar__links"]}`}>
            <Link to="/">Home</Link>
            <Link to="/features">Bookmarks</Link>
            <Link to="/goals">Goals</Link>
            <CustomButton
              type="button"
              value="button"
              onClick={() => navigate("/auth")}
            >
              Login
            </CustomButton>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default HeaderNavigation;
