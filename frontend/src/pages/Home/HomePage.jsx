import React from "react";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Header/Navbar";
import TrendingSection from "../../components/TrendingSection";

const HomePage = () => {
  return (
    <>
      <section className="bg-bgLight dark:bg-bgDark flex flex-col md:flex-row h-screen">
        <Header />
        <div className="container max-w-full h-full relative top-[80px] md:top-0">
          Test
        </div>
        <TrendingSection />
      </section>
      <Navbar />
    </>
  );
};

export default HomePage;
