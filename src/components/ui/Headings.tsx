// import React from 'react'
import { ReactNode } from "react";
import classes from "./Headings.module.scss";

interface Header {
  children: ReactNode;
}
export function PrimaryHeader(props: Header) {
  return (
    <h1 className={`${classes.header} ${classes["header__primary"]}`}>
      {props.children}
    </h1>
  );
}
export function SecondaryHeader(props: Header) {
  return (
    <h2 className={`${classes.header} ${classes["header__secondary"]}`}>
      {props.children}
    </h2>
  );
}
export function TertiaryHeader(props: Header) {
  return (
    <h2 className={`${classes.header} ${classes["header__tertiary"]}`}>
      {props.children}
    </h2>
  );
}
