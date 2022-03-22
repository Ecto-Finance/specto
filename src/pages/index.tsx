import { Footer } from "components/Footer";
import { Header } from "components/Header";
import Head from "next/head";
import React from "react";

/**
 * Home page.
 */
const Home: React.FC = () => (
  <div className="h-screen w-full justify-between bg-primary-light text-black dark:bg-primary-dark dark:text-white">
    <Head>
      <title>Home</title>
      <meta name="description" content="Welcome to Specto" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Header />
    <div className="flex flex-col items-center justify-center">
      Main Section for Home Page
    </div>
    <Footer />
  </div>
);

export default Home;
