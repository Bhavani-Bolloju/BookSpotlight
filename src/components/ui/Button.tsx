import React, { ReactNode, ButtonHTMLAttributes } from "react";
import Button from "react-bootstrap/Button";
import classes from "./Button.module.scss";

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}
const CustomButton: React.FC<CustomButtonProps> = function (props) {
  return (
    <Button className={classes.button} {...props}>
      {props.children}
    </Button>
  );
};

export default CustomButton;
