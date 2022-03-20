import { NetworkSelector } from "components/NetworkSelector";
import { ThemeSwitcher } from "components/ThemeSwitcher";
import WalletSelector from "components/WalletSelector";
import React from "react";

/**
 * Home page.
 */
const Home: React.FC = () => (
  <>
    <div className="bg-primary text-contrast min-h-screen max-w-7xl mx-auto justify-between">
      <div className="flex">
        <ThemeSwitcher />
        <NetworkSelector />
        <WalletSelector />
      </div>
    </div>
  </>
);

export default Home;
