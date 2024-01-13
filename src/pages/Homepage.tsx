// import React from 'react'
import classes from "./HomePage.module.scss";
import HeroSection from "../components/home/HeroSection";

function HomePage() {
  return (
    <div className={classes.homePage}>
      <HeroSection />
    </div>
  );
}

export default HomePage;
