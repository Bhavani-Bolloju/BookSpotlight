// import React from "react";

import React from "react";
import GenreSection from "../home/GenreSection";
import classes from "./RecommendedBooks.module.scss";

interface RecommendedBooksProp {
  authors: string[];
}
const RecommendedBooks: React.FC<RecommendedBooksProp> = function ({
  authors
}) {
  const author = authors?.[0] || "";
  const reqAuthor = author.split(" ").join("+");
  const url = `volumes?q=inauthor:${reqAuthor}&printType=books&langRestrict=en&`;

  return (
    <div className={classes.recommendedBooks}>
      <GenreSection url={url} genre="recommended books" />
    </div>
  );
};

export default RecommendedBooks;
