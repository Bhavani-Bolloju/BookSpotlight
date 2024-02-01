import React, { Ref, forwardRef } from "react";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const bookmarkHandler = function (e) {
    // e.prevent
    console.log(id);
  };

  const navigateHandler = function () {
    navigate(`/${id}`);
  };

  return (
    <div className={classes["book"]}>
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
        <Button type="button" onClick={navigateHandler}>
          <div className={classes["book__image"]}>
            <img src={thumbnail} alt="" />
          </div>
          <p className={classes["book__title"]}>{title}</p>
          <p className={classes["book__author"]}>
            By {authors ? authors : "unknown"}
          </p>
        </Button>
      </OverlayTrigger>

      <button className={classes["book__bookmark"]} onClick={bookmarkHandler}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
          />
        </svg>
      </button>
    </div>
  );
};

export default BookItem;
