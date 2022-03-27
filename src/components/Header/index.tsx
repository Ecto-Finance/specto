import Image from "next/image";
import { NetworkSelector } from "../NetworkSelector";
import { ThemeSwitcher } from "../ThemeSwitcher";
import WalletSelector from "components/WalletSelector";
import Link from "next/link";

export const Header = () => {
  return (
    <div className="sticky top-0 mx-auto flex w-full max-w-7xl justify-between bg-primary-light p-4 dark:bg-primary-dark">
      <div className="flex items-center justify-center space-x-2">
        <div>
          <button className="align-middle text-lg sm:inline-flex">
            <Link href="/" passHref>
              <Image
                src="/images/specto-black.png"
                alt=""
                width={40}
                height={40}
              />
            </Link>
          </button>
        </div>

        <button className="hidden text-lg sm:inline-flex">
          <Link href="/">Specto</Link>
        </button>
      </div>

      <div className="flex items-center space-x-2">
        <ThemeSwitcher />
        <NetworkSelector />
        <WalletSelector />
      </div>
    </div>
  );
};
