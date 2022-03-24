import { Footer } from "components/Footer";
import { Header } from "components/Header";
import { getProfiles } from "components/profile/getProfile";
import { ProfileSelector } from "components/profile/profilePage";
import { profileNFT } from "lib/lens/profileNFT";
import Head from "next/head";
import React, { useState } from "react";
/**
 * User profile page.
 */

//after adding the const, I had to change things and I'm not completely sure why. More info on this

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<profileNFT | undefined>(undefined);

  return (
    <div className="h-screen w-full justify-between bg-primary-light text-black dark:bg-primary-dark dark:text-white">
      <Head>
        <title>Profile</title>
        <meta name="description" content="Specto Profile Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="flex items-center justify-center"></div>
      <div>
        <ProfileSelector profile={profile} setProfile={setProfile} />
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
