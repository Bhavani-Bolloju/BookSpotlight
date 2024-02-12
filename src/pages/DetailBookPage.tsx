import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

import useUser from "../components/custom-hook/useUser";
import { getBookmarks, modifyBookmarks } from "../firebase/services";

import BookOverview from "../components/detail-book/BookOverview";

import { BookDetailsProp } from "../firebase/services";

import classes from "./DetailBookPage.module.scss";

function DetailBookPage() {
  const params = useParams();
  const id = params?.id;

  // const {
  //   data: book,
  //   error,
  //   isLoading
  // } = useFetch(`volumes/${id}?projection=full&printType=books&langRestrict=en`);

  const [bookmarks, setBookmarks] = useState<string[] | []>([]);

  // const [isBookmarked, setIsBookmarked] = useState(false);

  const ctx = useContext(AuthContext);
  const user = useUser(ctx?.uid);

  //fetching bookmarks
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

  // const bookmarkHandler = async function () {
  //   // setIsBookmarked((prev) => !prev);

  //   if (!user || !id) return;
  //   let bookDetails;

  //   const fetchedBookmark = await getBookmarkedBook(user?.docId, id);

  //   const newBookmark = {
  //     id: book?.id,
  //     thumbnail: book?.volumeInfo?.imageLinks?.thumbnail,
  //     description: book?.volumeInfo?.description,
  //     author: book?.volumeInfo?.authors[0],
  //     title: book?.volumeInfo?.title
  //   };

  //   if (fetchedBookmark) {
  //     bookDetails = fetchedBookmark;
  //   } else {
  //     bookDetails = newBookmark;
  //   }
  //   await modifyBookmarks(user?.docId as string, bookDetails, isBookmarked);

  //   const req = await getBookmarks(user?.docId);
  //   setBookmarks(req);
  // };

  const toggleBookmarkHandler = async function (
    bookDetails: BookDetailsProp,
    isBookmarked: boolean
  ) {
    if (!user) return;

    await modifyBookmarks(user?.docId, bookDetails, isBookmarked);

    const req = await getBookmarks(user?.docId);
    setBookmarks(req);
  };

  // console.log(bookmarks);

  return (
    <section className={classes.book}>
      {id && (
        <BookOverview
          id={id}
          bookmarks={bookmarks}
          toggleBookmark={toggleBookmarkHandler}
        />
      )}
    </section>
  );
}

export default DetailBookPage;
