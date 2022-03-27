/* eslint-disable @next/next/no-img-element */
import { Footer } from "components/Footer";
import { Header } from "components/Header";
import { getProfiles } from "components/profile/getProfile";
import { Follow } from "components/WalletSelector/Follow";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAccount, useSigner } from "wagmi";
import { useFollowingQuery } from "generated/graphql";
import { ethers } from "ethers";

/**
 * Collections page.
 */

export const getStaticProps = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();

  return {
    props: { profiles: data },
  };
};

const Collections = ({ profiles, address }) => {
  const [search, setSearch] = useState("");
  const [{ data: accountData }] = useAccount({ fetchEns: true });
  const [{ data, error, loading }, getSigner] = useSigner();

  useEffect(() => {
    console.log(data);
  }, [data]);

  console.log(accountData?.address);

  const collectionABI = [
    "function walletOfOwner(address _owner) public view returns(uint256[] memory)",
  ];

  async function walletOfOwner() {
    let provider = new ethers.providers.InfuraProvider(
      "maticmum",
      "706af4be1ee6441e93cff2fccc22e8cd"
    );
    let lensHubContract = new ethers.Contract(
      "0xcc55940eFd4a2fbd08f5422D2Df2c3e5ea9a33E7",
      collectionABI,
      data
    );
    let res = await lensHubContract.walletOfOwner(accountData.address);
    console.log(res.toString());
  }

  return (
    <div className="h-screen w-full justify-between bg-primary-light text-black dark:bg-primary-dark dark:text-white">
      <Head>
        <title>Collections</title>
        <meta name="description" content="Specto Collections Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl">Welcome to Specto</div>
          <button
            className="mx-1 rounded-lg bg-primary-green py-2 px-4"
            onClick={() => walletOfOwner()}
          >
            Get Profiles
          </button>

          <div className="mx-auto mt-10 max-w-7xl justify-between">
            <div>Not Following</div>
            <div className=" mx-auto grid grid-cols-2 gap-4 p-8 md:max-w-7xl md:grid-cols-4 lg:grid-cols-6">
              {profiles.map((profile) => (
                <Link href={"/collections/" + profile.id} key={profile.id}>
                  <a className="">
                    <div className=" items-center space-y-2">
                      <div className="rounded-2xl border border-gray-400 ">
                        <div>
                          <div className="absolute ml-2 mt-1 dark:text-black">
                            #{profile.id}
                          </div>
                        </div>
                        <div className="mt-2">{profile.name}</div>
                        <div className="flex p-2">
                          <Follow />
                        </div>
                      </div>
                    </div>
                  </a>
                </Link>
              ))}
            </div>
            <div>Following</div>

            <div className=" mx-auto grid grid-cols-2 gap-4 p-8 md:max-w-7xl md:grid-cols-4 lg:grid-cols-6">
              ToDo
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Collections;
