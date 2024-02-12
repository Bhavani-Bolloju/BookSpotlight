import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import useUser from "../components/custom-hook/useUser";
import BookItem from "../components/home/BookItem";
// import { BookItemProp } from "../components/home/BookItem";
import classes from "./BookmarksPage.module.scss";
import { modifyBookmarks } from "../firebase/services";

import { getBookmarks } from "../firebase/services";

function BookmarksPage() {
  const auth = useContext(AuthContext);
  const user = useUser(auth?.uid);
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const fetchBookmarks = async function () {
      const req = await getBookmarks(user?.docId);
      setBookmarks(req);
    };
    if (user?.docId) {
      fetchBookmarks();
    }
  }, [user?.docId]);

  const toggleBookmarkHandler = async function (bookDetails, isBookmarked) {
    if (!user) return;

    await modifyBookmarks(user?.docId, bookDetails, isBookmarked);

    const req = await getBookmarks(user?.docId);
    setBookmarks(req);
  };

  const filterBookmarks = user?.bookmarks.filter((book) =>
    bookmarks.includes(book.id)
  );

  return (
    <section className={classes.bookmarks}>
      <h2 className={classes["bookmarks__title"]}>Bookmarks</h2>
      <div className={classes["bookmarks__container"]}>
        {user &&
          filterBookmarks &&
          filterBookmarks.map((book, i) => (
            <BookItem
              key={`${book?.id}${i}`}
              id={book?.id}
              thumbnail={book?.thumbnail}
              title={book?.title}
              author={book?.author}
              description={book?.description}
              bookmarked={true}
              toggleBookmark={toggleBookmarkHandler}
            />
          ))}
      </div>
    </section>
  );
}

export default BookmarksPage;
