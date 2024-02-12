import useFetch from "../custom-hook/useFetch";
import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";

import CustomButton from "../ui/Button";
import rightDouble from "../../assets/right-double-fill.svg";

import BookItem from "./BookItem";
import { BookDetailsProp } from "../../firebase/services";

import classes from "./GenreSection.module.scss";

interface ImageLinks {
  thumbnail: string;
}

interface VolumeInfo {
  title: string;
  imageLinks: ImageLinks;
  authors: string[];
  description: string;
}

export interface Book {
  id: string;
  volumeInfo: VolumeInfo;
}

interface GenreSectionProps {
  name: string;
  title: string;
  heading?: string;
  bookmarks: string[] | [];

  toggleBookmark: (
    bookDetails: BookDetailsProp,
    isBookmarked: boolean
  ) => Promise<void>;
}

const GenreSection: React.FC<GenreSectionProps> = function ({
  name,
  title,
  heading,
  bookmarks,
  toggleBookmark
}) {
  const maxResults = 10;
  let URL: string = `volumes?q=subject:science&maxResults=${maxResults}`;
  if (name === "genre") {
    URL = `volumes?q=subject:${title}&maxResults=${maxResults}&orderBy=newest&projection=full&printType=books&langRestrict=en`;
  }

  if (name === "author") {
    URL = `volumes?q=inauthor:${title}&maxResults=${maxResults}&orderBy=newest&projection=full&printType=books&langRestrict=en`;
  }

  const { data, isLoading, error } = useFetch(URL);

  const navigate = useNavigate();
  const navigateHandler = function () {
    const encodeURL = encodeURIComponent(title);
    navigate(`/${name}/${encodeURL}`);
  };

  // console.log(bookmarks, "genre section");

  return (
    <section className={classes.genre}>
      <div className={classes["genre__header"]}>
        <h2 className={classes["genre__title"]}>{heading ? heading : title}</h2>
        <CustomButton onClick={navigateHandler}>
          <span className={classes["btn-text"]}>View more</span>
          <img src={rightDouble} alt="right" />
        </CustomButton>
      </div>
      <div className={classes["genre__list"]}>
        {!data && isLoading && (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
        {!isLoading && error && <p className={classes["error"]}>{error}</p>}
        {data && data?.items?.length <= 0 && (
          <p className={classes["error"]}>Couldn't find the results</p>
        )}
        {data && data?.totalItems > 0 && !isLoading && (
          <Splide
            options={{
              perPage: 5,
              arrows: true,
              pagination: false,
              drag: "free",
              gap: "2rem"
            }}
          >
            {data &&
              data?.items?.map((book: Book, i: number) => {
                const bookId: string = book?.id;

                return (
                  <SplideSlide key={book.id + "" + i}>
                    <BookItem
                      id={bookId}
                      thumbnail={book?.volumeInfo?.imageLinks?.thumbnail}
                      title={book?.volumeInfo?.title}
                      author={book?.volumeInfo?.authors}
                      description={book?.volumeInfo?.description}
                      bookmarked={bookmarks?.some((item) => item === bookId)}
                      toggleBookmark={toggleBookmark}
                    />
                  </SplideSlide>
                );
              })}
          </Splide>
        )}
      </div>
    </section>
  );
};

export default GenreSection;

/*
`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=10`

*/
