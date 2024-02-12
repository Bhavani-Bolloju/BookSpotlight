import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import SearchResults from "./SearchResults";
import { AuthContext } from "../../context/AuthContext";
import useUser from "../custom-hook/useUser";
import { getBookmarks } from "../../firebase/services";

function AuthorSearchResults() {
  const params = useParams();

  const genre = params?.authorName;

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

  return (
    <div>
      {genre && (
        <SearchResults
          genre={genre}
          title="author"
          bookmarks={bookmarks}
        ></SearchResults>
      )}
    </div>
  );
}

export default AuthorSearchResults;
