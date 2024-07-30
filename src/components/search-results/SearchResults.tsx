// import { useParams } from "react-router";
import Spinner from "react-bootstrap/Spinner";
// import { apiKey } from "../components/custom-fetch/useFetch";

import classes from "./SearchResults.module.scss";

import BookItem from "../home/BookItem";
import { Book } from "../home/GenreSection";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { BookDetailsProp } from "../../firebase/services";
import { TertiaryHeader } from "../ui/Headings";
import { useInView } from "react-intersection-observer";

interface SearchResultsProps {
  title: string;
  genre: string;
  bookmarks: string[];
  toggleBookmark: (
    bookDetails: BookDetailsProp,
    isBookmarked: boolean
  ) => Promise<void>;
}

const SearchResults: React.FC<SearchResultsProps> = function ({
  title,
  genre,
  bookmarks,
  toggleBookmark
}) {
  const maxResults = 10;
  const index = useRef<number>(0);

  const [data, setData] = useState<never[]>([]);
  const [error, setError] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: false,
    delay: 500,
    root: null,
    rootMargin: "100px"
  });

  let fetchUrl = `subject`;

  if (title === "author") {
    fetchUrl = `inauthor`;
  }

  const fetchDataOnScroll = useCallback(
    async (keyword: string, value: string) => {
      setIsLoading(true);
      try {
        const req = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${keyword}:${value}&startIndex=${
            index.current * maxResults
          }&maxResults=${maxResults}&orderBy=newest&printType=books&langRestrict=en`
        );
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
    },
    []
  );

  useEffect(() => {
    if (inView) {
      fetchDataOnScroll(fetchUrl, genre);
      index.current = index.current + 1;
    }
  }, [inView, fetchDataOnScroll, fetchUrl, genre]);

  return (
    <section id="searchResults" className={classes.searchResults}>
      <div className={classes["searchResults__container"]}>
        <TertiaryHeader>
          {title === "author" ? `more books by ${genre.split("+")}` : genre}
        </TertiaryHeader>

        {data && data?.length > 0 && (
          <ul className={classes["searchResults__list"]}>
            {data?.map((book: Book, i: number) => (
              <React.Fragment key={book?.id + "" + i}>
                {book?.volumeInfo?.imageLinks?.thumbnail && (
                  <li>
                    <BookItem
                      id={book?.id}
                      thumbnail={book?.volumeInfo?.imageLinks?.thumbnail}
                      title={book?.volumeInfo?.title}
                      author={book?.volumeInfo?.authors}
                      description={book?.volumeInfo?.description}
                      bookmarked={bookmarks?.some((item) => item === book?.id)}
                      toggleBookmark={toggleBookmark}
                    />
                  </li>
                )}
              </React.Fragment>
            ))}
          </ul>
        )}
        {isLoading && <Spinner />}
        {error && <p>{error}</p>}
      </div>
      <div ref={ref} className={classes.end}></div>
    </section>
  );
};

export default SearchResults;

/*
`volumes?q=subject:${genre}&startIndex=${0}&maxResults=${maxResults}&`


${apiUrl}?q=${searchTerm}&startIndex=${startIndex}&maxResults=${maxResults}&
key=${apiKey}
*/
