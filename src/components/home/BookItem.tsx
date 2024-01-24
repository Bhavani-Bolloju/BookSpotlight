import React from "react";

import { Link } from "react-router-dom";
import classes from "./BookItem.module.scss";

interface BookItemProp {
  id: string;
  thumbnail: string;
  title: string;
  authors: string[];
}
const BookItem: React.FC<BookItemProp> = function ({
  id,
  thumbnail,
  title,
  authors
}) {
  return (
    <Link to={`/${id}`} className={classes.book}>
      <div className={classes["book__image"]}>
        <img src={thumbnail} alt="" />
      </div>
      <p className={classes["book__title"]}>{title}</p>
      <p className={classes["book__author"]}>
        By {authors ? authors : "unknown"}
      </p>
    </Link>
  );
};

export default BookItem;
