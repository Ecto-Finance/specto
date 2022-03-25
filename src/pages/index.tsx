/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { Footer } from "components/Footer";
import { Header } from "components/Header";

/**
 * Home page.
 */

export const getStaticProps = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();

  return {
    props: { profiles: data },
  };
};

const Home = ({ profiles }) => {
  const [search, setSearch] = useState("");

  return (
    <div className="h-screen w-full justify-between bg-primary-light text-black dark:bg-primary-dark dark:text-white">
      <Head>
        <title>Profile</title>
        <meta name="description" content="Specto Profile Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="text-center">
        <div className="text-2xl">
          Welcome to Specto. A Lens-Protocol hackathon project.
        </div>
        <div className="w-screen">
          <div className="mt-4 items-center">
            <input
              className="rounded-md border-gray-400 bg-gray-50 text-sm text-black selection:bg-green-200 focus:border-primary-green focus:ring-primary-green"
              type="text"
              placeholder="Search by name..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className=" mx-auto  grid grid-cols-2 gap-4 p-8 md:max-w-7xl md:grid-cols-4 lg:grid-cols-6">
          {profiles
            .filter((profile: { name: string }) => {
              if (search == "") {
                return profile;
              } else if (
                profile.name.toLowerCase().includes(search.toLowerCase())
              ) {
                return profile;
              }
            })
            .map((profile) => (
              <Link href={"/profiles/" + profile.id} key={profile.id}>
                <a className="">
                  <div className=" items-center space-y-2">
                    <div className="rounded-2xl border border-gray-400 ">
                      <div>
                        {" "}
                        <div className="absolute ml-2 mt-1 dark:text-black">
                          {" "}
                          #{profile.id}
                        </div>
                        <img
                          src="/images/lens.jpg"
                          alt=""
                          className="rounded-2xl"
                        />{" "}
                      </div>
                      <div className="p-2">{profile.name}</div>
                    </div>
                  </div>
                </a>
              </Link>
            ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
