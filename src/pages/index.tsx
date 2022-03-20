import { Header } from "components/Header";
import { NetworkSelector } from "components/NetworkSelector";
import { ThemeSwitcher } from "components/ThemeSwitcher";
import WalletSelector from "components/WalletSelector";
import React from "react";

/**
 * Home page.
 */
const Home: React.FC = () => (
  <div className="h-screen w-full justify-between bg-[#dddddd] text-black dark:bg-[#272727] dark:text-white">
    <Header />
  </div>
);

export default Home;
