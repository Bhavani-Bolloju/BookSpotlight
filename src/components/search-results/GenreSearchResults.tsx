// import React from "react";
import { useParams } from "react-router-dom";
import SearchResults from "./SearchResults";
import { useState, useContext, useEffect } from "react";
import useUser from "../custom-hook/useUser";
import { AuthContext } from "../../context/AuthContext";
import { getBookmarks } from "../../firebase/services";
import { BookDetailsProp } from "../../firebase/services";
import { modifyBookmarks } from "../../firebase/services";

function GenreSearchResults() {
  const params = useParams();

  const genre = params?.genreId;

  const [bookmarks, setBookmarks] = useState<string[] | []>([]);

  const ctx = useContext(AuthContext);
  const user = useUser(ctx?.uid);

  useEffect(() => {
    const bookmarks = async function (docId: string) {
      const req = await getBookmarks(docId);
      setBookmarks(req);
    };

    if (user && user?.docId) {
      bookmarks(user?.docId);
    }
  }, [user]);

  const toggleBookmarkHandler = async function (
    bookDetails: BookDetailsProp,
    isBookmarked: boolean
  ) {
    if (!user) return;

    await modifyBookmarks(user?.docId, bookDetails, isBookmarked);

    const req = await getBookmarks(user?.docId);
    setBookmarks(req);
  };

  return (
    <div>
      {genre && (
        <SearchResults
          genre={genre}
          title="genre"
          bookmarks={bookmarks}
          toggleBookmark={toggleBookmarkHandler}
        ></SearchResults>
      )}
    </div>
  );
}

export default GenreSearchResults;
