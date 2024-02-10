import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import DOMPurify from "dompurify";
import useFetch from "../components/custom-hook/useFetch";
import Spinner from "react-bootstrap/esm/Spinner";
import RecommendedBooks from "../components/detail-book/RecommendedBooks";

import { AuthContext } from "../context/AuthContext";

import useUser from "../components/custom-hook/useUser";
import {
  getBookmarks,
  modifyBookmarks,
  getBookmarkedBook
} from "../firebase/services";
import classes from "./DetailBookPage.module.scss";
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

function DetailBookPage() {
  const params = useParams();
  const id = params?.id;

  const {
    data: book,
    error,
    isLoading
  } = useFetch(`volumes/${id}?projection=full&printType=books&langRestrict=en`);

  const [bookmarks, setBookmarks] = useState<string[] | []>([]);

  const [isBookmarked, setIsBookmarked] = useState(false);

  const ctx = useContext(AuthContext);
  const user = useUser(ctx?.uid);

  useEffect(() => {
    const bookmarks = async function (docId: string) {
      const req = await getBookmarks(docId);
      console.log("setting bookmarks");
      setBookmarks(req);
    };

    if (user && user?.docId) {
      bookmarks(user?.docId);
    }
  }, [user]);

  useEffect(() => {
    if (bookmarks && id) {
      const value = bookmarks.some((bookmark) => bookmark === id);
      if (value) {
        setIsBookmarked(true);
      }
    }
  }, [bookmarks, id]);

  const bookmarkHandler = async function () {
    setIsBookmarked((prev) => !prev);

    if (!user || !id) return;
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
    await modifyBookmarks(user?.docId as string, bookDetails, isBookmarked);

    const req = await getBookmarks(user?.docId);
    setBookmarks(req);
  };

  // const toggleBookmarkHandler = function () {};

  // console.log(bookmarks);

  return (
    <section className={classes.book}>
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
            <h2 className={classes["book__title"]}>
              {book?.volumeInfo?.title}
            </h2>
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

      {book && (
        <RecommendedBooks
          authors={book?.volumeInfo?.authors}
          categories={book?.volumeInfo?.categories}
          bookmarks={bookmarks}
        />
      )}
    </section>
  );
}

export default DetailBookPage;

/*
https://www.googleapis.com/books/v1/
volumes/${id}?
key=${googleBooksApiKey}
*/

/*
https://www.googleapis.com/books/v1/
volumes?q=inauthor:emily+henry&printType=books&langRestrict=en&
key=mykey


argument to pass = 
*/

/*


*/
