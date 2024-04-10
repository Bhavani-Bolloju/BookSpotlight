import { useState, useEffect, useContext } from "react";

import useFetch from "../custom-hook/useFetch";
import { Spinner } from "react-bootstrap";
import DOMPurify from "dompurify";
import { AuthContext } from "../../context/AuthContext";
import useUser from "../custom-hook/useUser";
import { getBookmarkedBook } from "../../firebase/services";
import RecommendedBooks from "./RecommendedBooks";
import Modal from "react-bootstrap/Modal";
import { BookDetailsProp } from "../../firebase/services";
import { TertiaryHeader } from "../ui/Headings";
import { Link } from "react-router-dom";

import classes from "./BookOverview.module.scss";

interface BookOverviewProps {
  id: string;
  bookmarks: string[];
  toggleBookmark: (
    bookDetails: BookDetailsProp,
    isBookmarked: boolean
  ) => Promise<void>;
}
interface DescriptionProp {
  htmlContent?: string;
}

const Description: React.FC<DescriptionProp> = function ({ htmlContent }) {
  const sanitizedHTML = htmlContent ? DOMPurify.sanitize(htmlContent) : "";
  return (
    <p
      dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
      className={classes["book__summary--text"]}
    ></p>
  );
};
function BookOverview({ id, bookmarks, toggleBookmark }: BookOverviewProps) {
  const {
    data: book,
    error,
    isLoading
  } = useFetch(`volumes/${id}?projection=full&printType=books&langRestrict=en`);

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [show, setShow] = useState(false);

  const ctx = useContext(AuthContext);
  const user = useUser(ctx?.uid);

  useEffect(() => {
    if (bookmarks && id) {
      const value = bookmarks.some((bookmark) => bookmark === id);

      setIsBookmarked(value ? true : false);
    }
  }, [bookmarks, id]);

  const handleClose = () => setShow(false);

  const bookmarkHandler = async function () {
    if (!user || !id) {
      setShow(true);
      return;
    }
    let bookDetails;

    const fetchedBookmark = await getBookmarkedBook(user?.docId, id);

    const newBookmark = {
      id: book?.id,
      thumbnail: book?.volumeInfo?.imageLinks?.thumbnail,
      description: book?.volumeInfo?.description,
      author: book?.volumeInfo?.authors[0],
      title: book?.volumeInfo?.title
    };

    if (fetchedBookmark) {
      bookDetails = fetchedBookmark;
    } else {
      bookDetails = newBookmark;
    }

    toggleBookmark(bookDetails, isBookmarked);
  };

  return (
    <>
      <div className={classes["book__container"]}>
        {isLoading && <Spinner />}
        {error && (
          <p className={classes.error}>
            Couldn't fetch requested data, please try again
          </p>
        )}

        {book && (
          <div className={classes["book__cover"]}>
            <img
              src={book?.volumeInfo?.imageLinks?.thumbnail}
              alt={book?.volumeInfo?.title}
            />
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
        )}
        {book && (
          <div className={classes["book__content"]}>
            <TertiaryHeader>{book?.volumeInfo?.title}</TertiaryHeader>
            <p className={classes["book__authors"]}>
              by{" "}
              {book?.volumeInfo?.authors
                ? book?.volumeInfo?.authors
                : "unknown"}
            </p>
            <h4 className={classes["book__summary--title"]}>summary</h4>
            <Description htmlContent={book?.volumeInfo?.description} />

            <ul className={classes["book__additional-info"]}>
              <li>
                <span className={classes.title}>Catergory : </span>
                <span className={classes.text}>
                  {book?.volumeInfo?.categories}
                </span>
              </li>
              <li>
                <span className={classes.title}>publisher : </span>
                <span className={classes.text}>
                  {book?.volumeInfo?.publisher}
                </span>
              </li>
              <li>
                <span className={classes.title}>page count : </span>
                <span className={classes.text}>
                  {book?.volumeInfo?.pageCount}
                </span>
              </li>
              <li>
                <span className={classes.title}>preview link : </span>
                <a
                  href={book?.volumeInfo?.previewLink}
                  className={classes.text}
                  target="_blank"
                >
                  {book?.volumeInfo?.previewLink}
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
      {/* {book && (
        <RecommendedBooks
          authors={book?.volumeInfo?.authors}
          categories={book?.volumeInfo?.categories}
          bookmarks={bookmarks}
          toggleBookmark={toggleBookmark}
        />
      )} */}

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Body>
            Please <Link to="/auth">login</Link> to add a bookmark
          </Modal.Body>
        </Modal.Header>
      </Modal>
    </>
  );
}

export default BookOverview;
