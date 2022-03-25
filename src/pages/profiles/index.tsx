import React, { Fragment, useState } from "react";
import Head from "next/head";
import Link from "next/link";

import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { useAccount } from "wagmi";

import { Footer } from "components/Footer";
import { Header } from "components/Header";
import { getProfiles } from "components/profile/getProfile";

/**
 * User profile page.
 */

export const getStaticProps = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();

  return {
    props: { profiles: data },
  };
};

const Profile = ({ profiles }) => {
  const [message, setMessage] = React.useState("");
  const [{ data: accountData }] = useAccount({ fetchEns: true });

  return (
    <div className="h-screen w-full justify-between bg-primary-light text-black dark:bg-primary-dark dark:text-white">
      <Head>
        <title>Profile</title>
        <meta name="description" content="Specto Profile Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="text-center">
        <button
          className="ml-2 rounded-lg bg-primary-green px-4 py-2 hover:bg-opacity-70"
          onClick={async () =>
            setMessage(await getProfiles(accountData?.address))
          }
        >
          Get My Profiles
        </button>
        <Menu as="div" className=" inline-block text-left">
          <Menu.Button className="z-50 rounded-lg px-2 py-1">
            <div className=" flex rounded-lg bg-primary-green px-2 py-2 hover:bg-opacity-70">
              <div className="ml-2"> All Profiles</div>
              <ChevronDownIcon
                className="mr-1 mt-1 ml-2 flex h-5 w-5"
                aria-hidden="true"
              />
            </div>
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute mt-2 rounded-md bg-white text-black shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-zinc-600 dark:text-white">
              <div className="p-2">
                {" "}
                {profiles.map((profile) => (
                  <Link href={"/profiles/" + profile.id} key={profile.id}>
                    <a className="">
                      <div className="space-y-2">{profile.name}</div>
                    </a>
                  </Link>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
