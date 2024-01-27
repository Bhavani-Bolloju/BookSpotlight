import React from "react";
import Modal from "react-bootstrap/Modal";
import useFetch from "../custom-fetch/useFetch";
import CustomButton from "./Button";
import BookItem from "../home/BookItem";
import { Book } from "../home/GenreSection";
import classes from "./CustomModal.module.scss";

interface CustomModalProps {
  show: boolean;
  onHide: () => void;
  query: string;
}

const CustomModal: React.FC<CustomModalProps> = function (props) {
  const { data, isLoading, error } = useFetch(
    `volumes?q=${props.query}&orderBy=relevance&maxResults=10`
  );

  console.log(data, isLoading, error);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {data && (
        <div className={classes["modal"]}>
          <h3>Search results for "{props.query}"</h3>

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

          {/* <CustomButton onClick={props.onHide}>Close</CustomButton> */}
        </div>
      )}
    </Modal>
  );
};

export default CustomModal;
