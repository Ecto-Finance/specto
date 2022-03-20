import { Footer } from "components/Footer";
import { Header } from "components/Header";
import React from "react";

/**
 * Home page.
 */
const Home: React.FC = () => (
  <div className="h-screen w-full justify-between bg-[#dddddd] text-black dark:bg-[#272727] dark:text-white">
    <Header />
    <Footer />
  </div>
);

export default Home;
