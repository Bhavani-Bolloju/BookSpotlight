// import React from 'react'
import { useParams } from "react-router-dom";
// import useFetch from "../components/custom-fetch/useFetch";
import classes from "./DetailBookPage.module.scss";
import React, { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import useFetch from "../components/custom-fetch/useFetch";

interface ImageLinks {
  medium: string;
}

interface VolumeInfo {
  title: string;
  imageLinks: ImageLinks;
  authors: string[];
  description: string;
  categories: string[];
  publisher: string;
  pageCount: number;

  previewLink: string;
}

interface Book {
  volumeInfo: VolumeInfo;
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

function DetailBookPage() {
  const params = useParams();
  const id = params?.id;
  // const book = null;

  const { data: book, error, isLoading } = useFetch(`volumes/${id}?`, id);

  return (
    <section className={classes.book}>
      {book && (
        <div className={classes["book__cover"]}>
          <img
            src={book?.volumeInfo?.imageLinks?.thumbnail}
            alt={book?.volumeInfo?.title}
          />
        </div>
      )}
      {book && (
        <div className={classes["book__content"]}>
          <h2 className={classes["book__title"]}>{book?.volumeInfo?.title}</h2>
          <p className={classes["book__authors"]}>
            by{" "}
            {book?.volumeInfo?.authors ? book?.volumeInfo?.authors : "unknown"}
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
              <a className={classes.text} target="_blank">
                {book?.volumeInfo?.previewLink}
              </a>
            </li>
          </ul>
        </div>
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
