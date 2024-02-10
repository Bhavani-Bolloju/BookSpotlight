// import React from "react";

import React from "react";
import GenreSection from "../home/GenreSection";
import classes from "./RecommendedBooks.module.scss";

interface RecommendedBooksProp {
  authors: string[];
  categories: string[];
  bookmarks: string[];
}
const RecommendedBooks: React.FC<RecommendedBooksProp> = function ({
  authors,
  categories,
  bookmarks
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
        />
      )}
      {!authors && categories && (
        <GenreSection
          heading="Similar Books"
          name="genre"
          title={categories?.[0]}
          bookmarks={bookmarks}
        />
      )}
    </div>
  );
};

export default RecommendedBooks;
