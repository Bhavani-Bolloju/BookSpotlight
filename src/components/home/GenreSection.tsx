import useFetch from "../custom-fetch/useFetch";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

import Spinner from "react-bootstrap/Spinner";
import { Link, useNavigate } from "react-router-dom";

import React from "react";

import CustomButton from "../ui/Button";
import rightDouble from "../../assets/right-double-fill.svg";

import BookItem from "./BookItem";

import classes from "./GenreSection.module.scss";
interface ImageLinks {
  thumbnail: string;
}

interface VolumeInfo {
  title: string;
  imageLinks: ImageLinks;

  authors: string[];
}

interface Book {
  id: string;
  volumeInfo: VolumeInfo;
}

interface GenreSectionProps {
  url: string;
  genre: string;
}

const GenreSection: React.FC<GenreSectionProps> = function ({ url, genre }) {
  const { data, isLoading, error } = useFetch(url);

  const navigate = useNavigate();
  // console.log(data, "genre");
  const navigateHandler = function () {
    navigate(`/genre/${genre}`);
  };

  return (
    <section className={classes.genre}>
      <div className={classes["genre__header"]}>
        <h2 className={classes["genre__title"]}>{genre}</h2>
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
              drag: "free"
            }}
          >
            {data &&
              data?.items?.map((book: Book) => {
                return (
                  <SplideSlide key={book.id}>
                    <BookItem
                      id={book?.id}
                      thumbnail={book?.volumeInfo?.imageLinks?.thumbnail}
                      title={book?.volumeInfo?.title}
                      authors={book?.volumeInfo?.authors}
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
