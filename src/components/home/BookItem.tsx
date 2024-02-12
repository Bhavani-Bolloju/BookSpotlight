import React, { Ref, forwardRef, useContext, useEffect, useState } from "react";
import { ReactNode } from "react";
import { useNavigate, Link } from "react-router-dom";
import classes from "./BookItem.module.scss";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover, { PopoverProps } from "react-bootstrap/Popover";
import { AuthContext } from "../../context/AuthContext";
import Modal from "react-bootstrap/Modal";
import useUser from "../custom-hook/useUser";

import { getBookmarkedBook } from "../../firebase/services";
import { BookDetailsProp } from "../../firebase/services";

export interface BookItemProp {
  id: string;
  thumbnail: string;
  title: string;
  author: string[];

  description: string;
  bookmarked: boolean;
  toggleBookmark: (
    bookDetails: BookDetailsProp,
    isBookmarked: boolean
  ) => Promise<void>;
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
  author,
  description,
  bookmarked,
  toggleBookmark
}) {
  const [show, setShow] = useState(false);

  const [isBookmarked, setIsBookmarked] = useState(bookmarked);

  const navigate = useNavigate();

  const ctx = useContext(AuthContext);

  const user = useUser(ctx?.uid);

  const handleClose = () => setShow(false);

  useEffect(() => {
    setIsBookmarked(bookmarked);
  }, [bookmarked]);

  const bookmarkHandler = async function () {
    if (ctx && user) {
      //add to the bookmarks list
      setIsBookmarked((prev) => !prev);
      let bookDetails;
      const fetchedBookmark = await getBookmarkedBook(user?.docId, id);
      const bookData = {
        title,
        id,
        author: author[0],
        thumbnail,
        description
      };
      if (fetchedBookmark) {
        bookDetails = fetchedBookmark;
      } else {
        bookDetails = bookData;
      }

      toggleBookmark(bookDetails, isBookmarked);
    } else {
      setShow(true);
    }
  };

  const navigateHandler = function () {
    navigate(`/${id}`);
  };

  return (
    <>
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
              By {author ? author : "unknown"}
            </p>
          </Button>
        </OverlayTrigger>

        <button
          className={`${classes["book__bookmark"]} ${
            isBookmarked && classes["book__bookmark--active"]
          }`}
          onClick={bookmarkHandler}
        >
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

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Body>
            Please <Link to="/auth">login</Link> to add a bookmark
          </Modal.Body>
        </Modal.Header>
      </Modal>
    </>
  );
};

export default BookItem;
