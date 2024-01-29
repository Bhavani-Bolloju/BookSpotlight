import React, { Ref, forwardRef } from "react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import classes from "./BookItem.module.scss";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover, { PopoverProps } from "react-bootstrap/Popover";
interface BookItemProp {
  id: string;
  thumbnail: string;
  title: string;
  authors: string[];

  description: string;
}

interface UpdatingPopoverProps extends PopoverProps {
  children: ReactNode;
}

const UpdatingPopover = forwardRef(
  ({ children, ...props }: UpdatingPopoverProps, ref: Ref<HTMLDivElement>) => {
    return (
      <Popover ref={ref} {...props} placement="auto-end" bsPrefix="popover">
        <Popover>{children}</Popover>
      </Popover>
    );
  }
);
const BookItem: React.FC<BookItemProp> = function ({
  id,
  thumbnail,
  title,
  authors,
  description
}) {
  return (
    <Link to={`/${id}`} className={classes.book}>
      <OverlayTrigger
        trigger={["hover", "focus"]}
        placement="auto"
        overlay={
          <UpdatingPopover
            id="popover-contained"
            className={classes["popover"]}
          >
            <div>
              <div className={classes["popover__description"]}>
                <span>Description: </span>
                {description}
              </div>
            </div>
          </UpdatingPopover>
        }
      >
        <Button>
          <div className={classes["book__image"]}>
            <img src={thumbnail} alt="" />
          </div>
          <p className={classes["book__title"]}>{title}</p>
          <p className={classes["book__author"]}>
            By {authors ? authors : "unknown"}
          </p>
        </Button>
      </OverlayTrigger>
    </Link>
  );
};

export default BookItem;
