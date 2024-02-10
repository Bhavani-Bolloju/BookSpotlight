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

  return (
    <section className={classes.homePage}>
      <HeroSection />
      <main>
        <ScienceSection bookmarks={bookmarks} />
        {/* <BiographySection bookmarks={bookmarks} />
        <FictionSection bookmarks={bookmarks} />
        <MysterySection bookmarks={bookmarks} /> */}
      </main>
    </section>
  );
}

export default HomePage;
