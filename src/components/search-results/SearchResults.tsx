// import { useParams } from "react-router";
import { Spinner } from "react-bootstrap";
// import { apiKey } from "../components/custom-fetch/useFetch";

import classes from "./SearchResults.module.scss";

import BookItem from "../home/BookItem";
import { Book } from "../home/GenreSection";
import React, { useCallback, useEffect, useRef, useState } from "react";
// import debounce from "lodash/debounce";

interface SearchResultsProps {
  title: string;
  genre: string;
}

const SearchResults: React.FC<SearchResultsProps> = function ({
  title,
  genre
}) {
  // const params = useParams();

  // console.log(params);

  // const url = `volumes?q=subject:${genre}&startIndex=${
  //   index.current * maxResults
  // }&maxResults=${maxResults}&`;
  // const genre = params.id;
  const maxResults = 10;
  const index = useRef<number>(0);

  const [data, setData] = useState<never[]>([]);
  const [error, setError] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const targetObserver = useRef<HTMLDivElement>(null);

  // console.log(title, genre);

  let fetchUrl = `https://www.googleapis.com/books/v1/volumes?q=subject:${genre}&startIndex=${
    index.current * maxResults
  }&maxResults=${maxResults}`;

  if (title === "author") {
    fetchUrl = `https://www.googleapis.com/books/v1/volumes?q=inauthor:${genre}&startIndex=${
      index.current * maxResults
    }&maxResults=${maxResults}`;
  }

  // console.log(fetchUrl);

  const fetchDataOnScroll = useCallback(async (url: string) => {
    setIsLoading(true);
    try {
      const req = await fetch(url);
      const res = await req.json();
      if (!req.ok) {
        throw new Error(res);
      }

      if (req.ok && !res.items) {
        throw new Error("That is it floks");
      }
      setData((prev) => {
        if (res) {
          const data = [...prev, ...res.items] as never[];
          return data;
        } else {
          return prev;
        }
      });
    } catch (error) {
      setError((error as Error).message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const currentObserver = targetObserver.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchDataOnScroll(fetchUrl);
          index.current = index.current + 1;
        }
      },
      {
        root: null,
        threshold: 0
      }
    );

    if (currentObserver) {
      observer.observe(currentObserver);
    }
    return () => {
      if (currentObserver) {
        observer.unobserve(currentObserver);
      }

      observer.disconnect();
    };
  }, [targetObserver, fetchDataOnScroll, fetchUrl]);

  return (
    <section id="searchResults" className={classes.searchResults}>
      <div className={classes["searchResults__container"]}>
        <h3 className={classes["searchResults__title"]}>
          {title === "author" ? `more books by ${genre.split("+")}` : genre}
        </h3>

        {data && data?.length > 0 && (
          <ul className={classes["searchResults__list"]}>
            {data?.map((book: Book, i: number) => (
              <li key={book?.id + "" + i}>
                <BookItem
                  id={book?.id}
                  thumbnail={book?.volumeInfo?.imageLinks?.thumbnail}
                  title={book?.volumeInfo?.title}
                  authors={book?.volumeInfo?.authors}
                />
              </li>
            ))}
          </ul>
        )}
        {isLoading && <Spinner />}
        {error && <p>{error}</p>}
      </div>
      <div ref={targetObserver} className={classes.end}></div>
    </section>
  );
};

export default SearchResults;

/*
`volumes?q=subject:${genre}&startIndex=${0}&maxResults=${maxResults}&`


${apiUrl}?q=${searchTerm}&startIndex=${startIndex}&maxResults=${maxResults}&
key=${apiKey}
*/
