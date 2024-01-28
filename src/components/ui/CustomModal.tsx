import React from "react";
import Modal from "react-bootstrap/Modal";
import useFetch from "../custom-fetch/useFetch";
import CustomButton from "./Button";
import BookItem from "../home/BookItem";
import { Book } from "../home/GenreSection";
import classes from "./CustomModal.module.scss";
import { Spinner } from "react-bootstrap";

interface CustomModalProps {
  show: boolean;
  onHide: () => void;
  query: string;
}

const CustomModal: React.FC<CustomModalProps> = function (props) {
  const { data, isLoading, error } = useFetch(
    `volumes?q=${props.query}&orderBy=relevance&maxResults=10`
  );

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div className={classes["modal"]}>
        <h3 className={classes["modal__heading"]}>
          Search results for "{props.query}"
        </h3>
        {isLoading && <Spinner />}
        {error && <p className={classes.error}>{error}</p>}
        <div className={classes["search__list"]}>
          {data &&
            data?.items?.map((book: Book, i: number) => {
              return (
                <BookItem
                  key={book?.id + "" + i}
                  id={book?.id}
                  thumbnail={book?.volumeInfo?.imageLinks?.thumbnail}
                  title={book?.volumeInfo?.title}
                  authors={book?.volumeInfo?.authors}
                />
              );
            })}
        </div>

        <CustomButton onClick={props.onHide}>Close</CustomButton>
      </div>
    </Modal>
  );
};

export default CustomModal;
