import React from "react";
import Image from "next/image";

export const Footer = () => {
  return (
    <div className=" w-full bg-primary-light dark:bg-primary-dark">
      <div className="relative flex items-center">
        <div className="flex-grow border-t border-gray-400"></div>
        <span className="mx-4 flex-shrink text-gray-400">
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
