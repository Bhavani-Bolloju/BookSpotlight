import useFetch from "../custom-fetch/useFetch";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";

import classes from "./GenreSection.module.scss";
import React from "react";

import CustomButton from "../ui/Button";
import rightDouble from "../../assets/right-double-fill.svg";

interface ImageLinks {
  thumbnail: string;
}

interface VolumeInfo {
  title: string;
  imageLinks: ImageLinks;
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

  // console.log(data, "genre");

  return (
    <section className={classes.genre}>
      <div className={classes["genre__header"]}>
        <h2 className={classes["genre__title"]}>{genre}</h2>
        <CustomButton>
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
                    <Link to={`/${book.id}`} className={classes.book}>
                      <div className={classes["book__image"]}>
                        <img
                          src={book?.volumeInfo?.imageLinks?.thumbnail}
                          alt=""
                        />
                      </div>
                      <p className={classes["book__title"]}>
                        {book?.volumeInfo?.title}
                      </p>
                    </Link>
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
