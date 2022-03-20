import { NetworkSelector } from "components/NetworkSelector";
import { ThemeSwitcher } from "components/ThemeSwitcher";
import WalletSelector from "components/WalletSelector";
import React from "react";

/**
 * Home page.
 */
const Home: React.FC = () => (
  <>
    <div className="bg-primary text-contrast min-h-screen">
      {" "}
      Home page
      <WalletSelector />
      <NetworkSelector />
      <ThemeSwitcher />
    </div>
  </>
);

export default Home;
