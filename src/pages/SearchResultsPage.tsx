// import React from 'react'
import { useParams } from "react-router";
import { Spinner } from "react-bootstrap";
import { apiKey } from "../components/custom-fetch/useFetch";

import classes from "./SearchResultsPage.module.scss";
import BookItem from "../components/home/BookItem";
import { Book } from "../components/home/GenreSection";
import { useCallback, useEffect, useRef, useState } from "react";
// import debounce from "lodash/debounce";
function SearchResultsPage() {
  const params = useParams();

  // const url = `volumes?q=subject:${genre}&startIndex=${
  //   index.current * maxResults
  // }&maxResults=${maxResults}&`;
  const genre = params.id;
  const maxResults = 10;
  const index = useRef<number>(0);

  const [data, setData] = useState<never[]>([]);
  const [error, setError] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const targetObserver = useRef<HTMLDivElement>(null);

  const fetchDataOnScroll = useCallback(async () => {
    setIsLoading(true);
    try {
      const req = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=subject:${genre}&startIndex=${
          index.current * maxResults
        }&maxResults=${maxResults}&key=${apiKey}`
      );
      const res = await req.json();
      if (!req.ok) {
        throw new Error(res);
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
    // setError(null);
  }, [genre, maxResults]);

  // console.log(error, isLoading, data);

  useEffect(() => {
    const currentObserver = targetObserver.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchDataOnScroll();
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
  }, [targetObserver, fetchDataOnScroll]);

  return (
    <section id="searchResults" className={classes.searchResults}>
      <div className={classes["searchResults__container"]}>
        <h3 className={classes["searchResults__title"]}>{genre}</h3>

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
        {error && <p>error fetching data, please try again</p>}
      </div>
      <div ref={targetObserver} className={classes.end}></div>
    </section>
  );
}

export default SearchResultsPage;

/*
`volumes?q=subject:${genre}&startIndex=${0}&maxResults=${maxResults}&`


${apiUrl}?q=${searchTerm}&startIndex=${startIndex}&maxResults=${maxResults}&
key=${apiKey}
*/
