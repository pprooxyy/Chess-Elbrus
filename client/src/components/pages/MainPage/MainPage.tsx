import React from "react";
import "./MainPage.css";
import Navbar from "../../organisms/Navbar/Navbar";
import MainPlaySection from "../../molecules/MainPagePlaySection/MainpagePlaySection";
import MainPuzzles from "../../molecules/MainPagePuzzles/MainPagePuzzles";
import MainNews from "../../molecules/MainPageNews/MainPageNews";

function MainPage() {
  return (
    <>
      <Navbar />
      <div className="main-page-wrapper">
        <MainPlaySection />
        <MainPuzzles />
        <MainNews />
      </div>
    </>
  );
}

export default MainPage;
