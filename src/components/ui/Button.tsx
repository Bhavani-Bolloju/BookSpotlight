import React, { ReactNode, ButtonHTMLAttributes } from "react";

import classes from "./Button.module.scss";

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}
const CustomButton: React.FC<CustomButtonProps> = function (props) {
  return (
    <button className={classes.button} {...props}>
      {props.children}
    </button>
  );
};

export default CustomButton;
