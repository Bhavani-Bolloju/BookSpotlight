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

import { useInView, InView } from "react-intersection-observer";

function HomePage() {
  const [bookmarks, setBookmarks] = useState<string[] | []>([]);

  const [bioInView, setBioInView] = useState(false);
  const [fictionInView, setFictionInView] = useState(false);
  const [mysteryInView, setMysteryInView] = useState(false);

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

  const { inView, ref } = useInView({
    threshold: 0.1,
    triggerOnce: true,
    delay: 100
  });

  // console.log(inView);
  return (
    <section className={classes.homePage}>
      <HeroSection />
      <main ref={ref}>
        <div className={classes.section}>
          {inView && (
            <ScienceSection
              bookmarks={bookmarks}
              toggleBookmark={toggleBookmarkHandler}
            />
          )}
        </div>
        <InView
          as="div"
          onChange={(inView) => {
            setBioInView(inView);
          }}
          threshold={0.1}
          delay={100}
          triggerOnce={true}
          className={classes.section}
        >
          {bioInView && (
            <BiographySection
              bookmarks={bookmarks}
              toggleBookmark={toggleBookmarkHandler}
            />
          )}
        </InView>

        <InView
          as="div"
          onChange={(inView) => {
            // console.log("fiction in view", inView);
            setFictionInView(inView);
          }}
          threshold={0.1}
          delay={100}
          triggerOnce={true}
          className={classes.section}
        >
          {fictionInView && (
            <FictionSection
              bookmarks={bookmarks}
              toggleBookmark={toggleBookmarkHandler}
            />
          )}
        </InView>

        <InView
          as="div"
          onChange={(inView) => {
            setMysteryInView(inView);
          }}
          threshold={0.1}
          delay={100}
          triggerOnce={true}
          className={classes.section}
        >
          {mysteryInView && (
            <MysterySection
              bookmarks={bookmarks}
              toggleBookmark={toggleBookmarkHandler}
            />
          )}
        </InView>
      </main>
    </section>
  );
}

export default HomePage;
