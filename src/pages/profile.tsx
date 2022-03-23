import { Footer } from "components/Footer";
import { Header } from "components/Header";
import { Profiles } from "components/profile/getProfile";
import Head from "next/head";
import React from "react";

/**
 * User profile page.
 */
const Profile: React.FC = () => (
  <div className="h-screen w-full justify-between bg-primary-light text-black dark:bg-primary-dark dark:text-white">
    <Head>
      <title>Profile</title>
      <meta name="description" content="Specto Profile Page" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Header />
    <div className="flex items-center justify-center">
      Main Section for Profile Page
    </div>
    <Profiles />
    <Footer />
  </div>
);

export default Profile;
