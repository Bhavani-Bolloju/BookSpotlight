import useFetch from "../custom-fetch/useFetch";
import classes from "./FictionSection.module.scss";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";

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

const FictionSection = function () {
  const genre = "fiction";
  const maxResults = 8;
  const { data, isLoading, error } = useFetch(
    `volumes?q=subject:${genre}&maxResults=${maxResults}`
  );

  return (
    <section className={classes.fiction}>
      <h2 className={classes.header}>Fiction</h2>
      <div className={classes["fiction__list"]}>
        {!data && isLoading && (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
        {!data && !isLoading && error && (
          <p className={classes["error"]}>{error}</p>
        )}
        {data && !isLoading && (
          <Splide
            options={{
              perPage: 5,
              arrows: true,
              pagination: false,
              drag: "free",
              gap: "1rem"
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

export default FictionSection;
