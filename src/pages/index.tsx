/* eslint-disable @next/next/no-img-element */
import { Footer } from "components/Footer";
import { Header } from "components/Header";
import { Follow } from "components/WalletSelector/Follow";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useAccount, useSigner } from "wagmi";
import { ethers } from "ethers";
import { COLLECTION_NFT_ADDRESS } from "lib/config/env";
import { useFollowNfTsOwnedLazyQuery } from "generated/graphql";
/**
 * Collections page.
 */

const Home = ({ profiles, address }) => {
  const [{ data: accountData }] = useAccount({ fetchEns: true });
  const [{ data, error, loading }, getSigner] = useSigner();
  const [getFollowNFTs] = useFollowNfTsOwnedLazyQuery();
  const [nfts, setNfts] = useState(null);
  const [lensNfts, setLensNfts] = useState([]);

  const collectionABI = [
    "function walletOfOwner(address _owner) public view returns(uint256[] memory)",
  ];

  async function walletOfOwner() {
    let provider = new ethers.providers.InfuraProvider(
      "maticmum",
      "706af4be1ee6441e93cff2fccc22e8cd"
    );
    let lensHubContract = new ethers.Contract(
      COLLECTION_NFT_ADDRESS,
      collectionABI,
      data
    );
    console.log("COLLECTION ADDRESS: ", COLLECTION_NFT_ADDRESS);
    let res = await lensHubContract.walletOfOwner(accountData.address);

    setNfts(res.toString().split(","));
  }

  const followNFTs = async () => {
    let getFollowerNFTsOut = await getFollowNFTs({
      variables: {
        request: {
          address: accountData.address,
          profileId: localStorage.getItem("profileId"),
        },
      },
    });

    console.log(getFollowerNFTsOut);

    setLensNfts(getFollowerNFTsOut.data.followerNftOwnedTokenIds.tokensIds);
  };

  useEffect(() => {
    console.log(lensNfts);
  }, [lensNfts]);

  return (
    <div className="h-screen w-full justify-between bg-primary-light text-black dark:bg-primary-dark dark:text-white">
      <Head>
        <title>Collections</title>
        <meta name="description" content="Specto Collections Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="flex items-center justify-center bg-primary-light text-black dark:bg-primary-dark dark:text-white">
        <div className="text-center">
          {accountData?.address ? (
            <div>
              {" "}
              <button
                className="mx-1 rounded-lg bg-primary-green py-2 px-4"
                onClick={() => walletOfOwner()}
              >
                Get Profiles
              </button>
              <button
                className="mx-1 rounded-lg bg-primary-green py-2 px-4"
                onClick={() => followNFTs()}
              >
                Get Follow NFTs
              </button>
              <div className="mt-6 flex flex-col items-center justify-center">
                <p>Here are my NFTs</p>
                <div className=" mx-auto mb-40 grid grid-cols-2 gap-4 p-8 md:max-w-7xl md:grid-cols-4 lg:grid-cols-6">
                  {nfts &&
                    nfts.map((nfts, index) => {
                      return (
                        <div key={index}>
                          <div className="absolute ml-2 mt-1 dark:text-black">
                            {" "}
                            {nfts}
                          </div>
                          <img
                            src="/images/lens.jpg"
                            alt=""
                            className="rounded-2xl"
                          />{" "}
                          <Follow tokenId={nfts} />
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <p>Here are my Lens follow NFTs</p>
                <div className=" mx-auto mb-40 grid grid-cols-2 gap-4 p-8 md:max-w-7xl md:grid-cols-4 lg:grid-cols-6">
                  {lensNfts &&
                    lensNfts.map((nft, index) => {
                      return (
                        <div key={index}>
                          <div className="absolute ml-2 mt-1 dark:text-black">
                            {nft}
                          </div>
                          <img
                            src="/images/lens.jpg"
                            alt=""
                            className="rounded-2xl"
                          />{" "}
                          <div className="space-x-4 ">
                            <button
                              type="button"
                              className="inline-flex justify-center rounded-md border border-transparent bg-primary-green px-4 py-2 text-sm font-medium text-white hover:bg-opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-green focus-visible:ring-offset-2"
                            >
                              Unfollow
                            </button>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          ) : (
            <div className="mb-80">
              <div className="mt-80">
                {" "}
                <div className="text-5xl">Welcome to Specto.</div>
                <div className="mt-4">
                  Please connect your wallet to Metamask to view the
                  application.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
