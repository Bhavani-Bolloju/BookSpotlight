import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import icon from "../../assets/Reading.svg";
import { Link, NavLink } from "react-router-dom";
import CustomButton from "../ui/Button";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseSetup";

import classes from "./HeaderNavigation.module.scss";
function HeaderNavigation() {
  const navigate = useNavigate();
  const userAuth = useContext(AuthContext);

  const logoutHandler = function () {
    signOut(auth);
    localStorage.removeItem("token");
  };

  return (
    <div className={classes.navbar}>
      <Navbar>
        <Container className={classes["navbar__container"]}>
          <NavLink to="/" className={classes["navbar__heading"]}>
            <img src={icon} alt="logo" />
            <span>BookSpotlight</span>
          </NavLink>
          <Nav className={` ${classes["navbar__links"]}`}>
            <Link to="/home">Home</Link>
            {userAuth !== null && <Link to="/bookmarks">Bookmarks</Link>}
            {/* {userAuth !== null && <Link to="/goals">Goals</Link>} */}
            {userAuth == null && (
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
            )}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default HeaderNavigation;
