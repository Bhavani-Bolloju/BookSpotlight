// import React from "react";

import React from "react";
import GenreSection from "../home/GenreSection";
import classes from "./RecommendedBooks.module.scss";
import { BookDetailsProp } from "../../firebase/services";

interface RecommendedBooksProp {
  authors: string[];
  categories: string[];
  bookmarks: string[];
  toggleBookmark: (
    bookDetails: BookDetailsProp,
    isBookmarked: boolean
  ) => Promise<void>;
}
const RecommendedBooks: React.FC<RecommendedBooksProp> = function ({
  authors,
  categories,
  bookmarks,
  toggleBookmark
}) {
  const author = authors?.[0] || "";
  const reqAuthor = author.split(" ").join("+");

  return (
    <div className={classes.recommendedBooks}>
      {authors && (
        <GenreSection
          heading="recommended books"
          name="author"
          title={reqAuthor}
          bookmarks={bookmarks}
          toggleBookmark={toggleBookmark}
        />
      )}
      {!authors && categories && (
        <GenreSection
          heading="Similar Books"
          name="genre"
          title={categories?.[0]}
          bookmarks={bookmarks}
          toggleBookmark={toggleBookmark}
        />
      )}
    </div>
  );
};

export default RecommendedBooks;
