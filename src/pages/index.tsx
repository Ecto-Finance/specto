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
      <meta name="description" content="Welcome to the Ecto Marketplace" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Header />
    <Footer />
  </div>
);

export default Home;
