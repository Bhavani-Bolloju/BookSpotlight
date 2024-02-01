// import React from 'react'
import classes from "./HomePage.module.scss";
import HeroSection from "../components/home/HeroSection";
import ScienceSection from "../components/home/ScienceSection";
import BiographySection from "../components/home/BiographySection";
import FictionSection from "../components/home/FictionSection";
import MysterySection from "../components/home/MysterySection";

function HomePage() {
  return (
    <section className={classes.homePage}>
      <HeroSection />
      <main>
        <ScienceSection />
        <BiographySection />
        <FictionSection />
        <MysterySection />
      </main>
    </section>
  );
}

export default HomePage;
