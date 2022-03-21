import Image from "next/image";
import { NetworkSelector } from "../NetworkSelector";
import { ThemeSwitcher } from "../ThemeSwitcher";
import WalletSelector from "../WalletSelector";

export const Header = () => {
  return (
    <div className="sticky top-0 mx-auto flex w-full max-w-7xl justify-between p-4">
      <div className="flex items-center justify-center space-x-2">
        <Image src="/images/ecto-logo.png" width={30} height={30} />
        <p className="hidden text-lg sm:inline-flex">Specto</p>
      </div>

      <div className="flex items-center space-x-2">
        <ThemeSwitcher />
        <NetworkSelector />
        <WalletSelector />
      </div>
    </div>
  );
};
