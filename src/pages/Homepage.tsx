// import React from 'react'
import classes from "./HomePage.module.scss";
import HeroSection from "../components/home/HeroSection";
import FictionSection from "../components/home/FictionSection";

function HomePage() {
  return (
    <div className={classes.homePage}>
      <HeroSection />
      <FictionSection />
    </div>
  );
}

export default HomePage;
