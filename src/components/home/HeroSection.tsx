// import React from 'react'
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import CustomButton from "../ui/Button";
import React, { useContext, useState } from "react";

import CustomModal from "../ui/CustomModal";
import classes from "./HeroSection.module.scss";
import { modifyBookmarks } from "../../firebase/services";
import { AuthContext } from "../../context/AuthContext";
import useUser from "../custom-hook/useUser";
import { BookDetailsProp } from "../../firebase/services";
import { getBookmarks } from "../../firebase/services";

function HeroSection() {
  const [inputQuery, setInputQuery] = useState("");

  const [modalShow, setModalShow] = useState(false);

  const auth = useContext(AuthContext);
  const user = useUser(auth?.uid);
  const [bookmarks, setBookmarks] = useState<string[] | []>([]);

  //input handler
  const handleInput = async function (e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    setInputQuery(value);
  };

  const handleSearch = async function () {
    if (inputQuery.trim().length <= 0) return;
    setModalShow(true);
  };

  const toggleBookmarkHandler = async function (
    bookDetails: BookDetailsProp,
    isBookmarked: boolean
  ) {
    if (!user) return;

    await modifyBookmarks(user?.docId, bookDetails, isBookmarked);

    const req = await getBookmarks(user?.docId);
    setBookmarks(req);
  };

  // console.log(inputQuery, "input");

  return (
    <header className={classes.heroSection}>
      <h1 className={classes["heroSection__header"]}>
        to know is to learn, to learn is to grow
      </h1>
      <div className={classes["heroSection__search"]}>
        <InputGroup>
          <Form.Control
            placeholder="search here"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            value={inputQuery}
            onChange={handleInput}
          />
          <CustomButton type="button" value="button" onClick={handleSearch}>
            Search
          </CustomButton>
        </InputGroup>
      </div>
      {modalShow && inputQuery && (
        <CustomModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          query={inputQuery}
          toggleBookmark={toggleBookmarkHandler}
          bookmarks={bookmarks}
        />
      )}
    </header>
  );
}

export default HeroSection;
