import { useContext, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import icon from "../../assets/Reading.svg";
import { Link, NavLink } from "react-router-dom";
import CustomButton from "../ui/Button";
import { AuthContext } from "../../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseSetup";

import classes from "./HeaderNavigation.module.scss";
function HeaderNavigation() {
  const userAuth = useContext(AuthContext);
  const [isNavActive, setIsNavActive] = useState(false);

  const logoutHandler = function () {
    signOut(auth);
  };

  return (
    <div className={classes.navbar}>
      <Navbar>
        <Container className={classes["navbar__container"]}>
          <NavLink to="/" className={classes["navbar__heading"]}>
            <img src={icon} alt="logo" height={100} width={100} />
            <span>BookSpotlight</span>
          </NavLink>
          <div className={classes["navbar__box"]}>
            <Nav
              className={
                !isNavActive
                  ? `${classes["navbar__links"]}`
                  : `${classes["navbar__links--active"]}`
              }
            >
              <Link to="/home">Home</Link>
              {userAuth == null && <Link to="/auth">Login</Link>}
              {userAuth !== null && <Link to="/bookmarks">Bookmarks</Link>}
            </Nav>
            {userAuth !== null && (
              <div className={classes["navbar__button"]}>
                <CustomButton
                  type="button"
                  value="button"
                  onClick={logoutHandler}
                >
                  Logout
                </CustomButton>
              </div>
            )}
            <button
              onClick={() => setIsNavActive((prev) => !prev)}
              className={
                !isNavActive
                  ? `${classes.hamburger}`
                  : `${classes.hamburger} ${classes["hamburger__active"]}`
              }
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </Container>
      </Navbar>
    </div>
  );
}

export default HeaderNavigation;

{
  /* {userAuth !== null && <Link to="/goals">Goals</Link>} */
}
{
  /* {userAuth == null && (
              <CustomButton
                type="button"
                value="button"
                onClick={() => navigate("/auth")}
              >
                Login
              </CustomButton>
            )}

            {userAuth !== null && (
              <CustomButton
                type="button"
                value="button"
                onClick={logoutHandler}
              >
                Logout
              </CustomButton>
            )} */
}
