import React, { useEffect, useState } from "react";
import classes from "./Authenticaton.module.scss";
import CustomButton from "../components/ui/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";
import { auth, db } from "../firebase/firebaseSetup";

import { addDoc } from "firebase/firestore";
import { collection } from "firebase/firestore";

import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";

const AuthenticationPage: React.FC = () => {
  const [inputFields, setInputFields] = useState({
    email: "newuser@gmail.com",
    password: "newuser@123",
    name: "new user"
  });

  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const [accountExist, setAccountExist] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(null);
      }, 2000);
    }
  }, [error]);

  const handleInputFields = function (e: React.ChangeEvent<HTMLInputElement>) {
    setInputFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // console.log(inputFields);
  const handleSubmit = async function (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setIsloading(true);
      if (accountExist) {
        //login
        await signInWithEmailAndPassword(
          auth,
          inputFields.email,
          inputFields.password
        );

        navigate("/home");
      } else {
        //signup
        const res = await createUserWithEmailAndPassword(
          auth,
          inputFields.email,
          inputFields.password
        );

        const user = res.user;

        await addDoc(collection(db, "users"), {
          uid: user.uid,
          name: inputFields.name,
          email: inputFields.email
        });
        navigate("/home");
      }
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsloading(false);
      setInputFields({
        name: "",
        email: "",
        password: ""
      });
    }
  };

  return (
    <section className={classes["form"]}>
      <h2 className={classes["form__heading"]}>
        {accountExist ? "Log in" : "sign up"}
      </h2>
      {error && <p className={classes["form__error"]}>{error}</p>}
      <form className={classes["form__container"]} onSubmit={handleSubmit}>
        {!accountExist && (
          <FloatingLabel
            controlId="floatingInput"
            label="Your Name"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="john doe"
              aria-describedby="username"
              name="name"
              onChange={handleInputFields}
              value={inputFields.name}
              required
            />
          </FloatingLabel>
        )}
        <FloatingLabel
          controlId="floatingInput"
          label="Email address"
          className="mb-3"
        >
          <Form.Control
            type="email"
            placeholder="name@example.com"
            aria-describedby="emailAddress"
            name="email"
            onChange={handleInputFields}
            value={inputFields.email}
            required
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingPassword" label="Password">
          <Form.Control
            type="text"
            placeholder="Password"
            aria-describedby="passwordH"
            name="password"
            onChange={handleInputFields}
            value={inputFields.password}
            required
          />
        </FloatingLabel>
        {isLoading && (
          <div className={classes["form__loading"]}>
            <Spinner />
          </div>
        )}
        <CustomButton type="submit">Submit</CustomButton>
        <div className={classes["form__switch"]}>
          <div>
            {accountExist
              ? "Don't have an account?"
              : "Already have an account"}
          </div>
          <button
            onClick={() => {
              setAccountExist((prev) => !prev);
            }}
          >
            {accountExist ? "Sign up" : "Log In"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthenticationPage;
