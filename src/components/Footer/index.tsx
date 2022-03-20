import React from "react";
import Image from "next/image";

export const Footer = () => {
  return (
    <div className="fixed bottom-0 w-full">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center space-y-2 p-4 sm:flex-row sm:justify-between sm:space-y-0">
        <div className="flex items-center justify-center space-x-4 text-lg">
          <a className=" cursor-pointer uppercase text-gray-600  underline hover:text-[#64c64e] md:block">
            Docs
          </a>
          <a className=" cursor-pointer uppercase text-gray-600 underline hover:text-[#64c64e] md:block">
            Support
          </a>
          <a className=" cursor-pointer uppercase text-gray-600 underline hover:text-[#64c64e] md:block">
            Terms
          </a>
          <a className=" cursor-pointer uppercase text-gray-600 underline hover:text-[#64c64e] md:block">
            Contact
          </a>
        </div>

        <div className="flex items-center space-x-4 text-center">
          <a href="https://twitter.com/EctoXYZ">
            <Image src="/images/twitter.svg" alt="" width={30} height={30} />
          </a>
          <a href="https://github.com/Ecto-Finance">
            <Image src="/images/github.svg" alt="" width={30} height={30} />
          </a>
          <a href="https://discord.com/invite/4FTahmYnRm">
            <Image src="/images/discord.svg" alt="" width={30} height={30} />
          </a>
          <a href="https://docs.ecto.xyz/ecto/start-here">
            <Image src="/images/gitbook.svg" alt="" width={30} height={30} />
          </a>
        </div>
      </div>
      <div className="relative flex items-center">
        <div className="flex-grow border-t border-gray-400"></div>
        <span className="mx-4 flex-shrink text-gray-400">
          {" "}
          <Image src="/images/ecto-logo.png" alt="" width={30} height={30} />
        </span>
        <div className="flex-grow border-t border-gray-400"></div>
      </div>
      <p className="my-6 w-full text-center text-gray-600">
        © 2022 Lost Labs LLC
      </p>
    </div>
  );
};
