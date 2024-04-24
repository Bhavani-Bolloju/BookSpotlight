// import React from 'react'
import classes from "./HomePage.module.scss";
import HeroSection from "../components/home/HeroSection";
import ScienceSection from "../components/home/ScienceSection";
import BiographySection from "../components/home/BiographySection";
import FictionSection from "../components/home/FictionSection";
import MysterySection from "../components/home/MysterySection";
import { useState, useEffect, useContext } from "react";

import useUser from "../components/custom-hook/useUser";
import { AuthContext } from "../context/AuthContext";
import { getBookmarks } from "../firebase/services";
import { BookDetailsProp } from "../firebase/services";
import { modifyBookmarks } from "../firebase/services";

function HomePage() {
  const [bookmarks, setBookmarks] = useState<string[] | []>([]);

  const ctx = useContext(AuthContext);
  const user = useUser(ctx?.uid);

  useEffect(() => {
    const bookmarks = async function (docId: string) {
      const req = await getBookmarks(docId);
      setBookmarks(req);
    };

    if (user && user?.docId) {
      bookmarks(user?.docId);
    }
  }, [user]);

  const toggleBookmarkHandler = async function (
    bookDetails: BookDetailsProp,
    isBookmarked: boolean
  ) {
    if (!user) return;

    await modifyBookmarks(user?.docId, bookDetails, isBookmarked);

    const req = await getBookmarks(user?.docId);
    setBookmarks(req);
  };

  return (
    <section className={classes.homePage}>
      <HeroSection />
      <main>
        <ScienceSection
          bookmarks={bookmarks}
          toggleBookmark={toggleBookmarkHandler}
        />
        {/* <BiographySection
          bookmarks={bookmarks}
          toggleBookmark={toggleBookmarkHandler}
        />
        <FictionSection
          bookmarks={bookmarks}
          toggleBookmark={toggleBookmarkHandler}
        />
        <MysterySection
          bookmarks={bookmarks}
          toggleBookmark={toggleBookmarkHandler}
        /> */}
      </main>
    </section>
  );
}

export default HomePage;
