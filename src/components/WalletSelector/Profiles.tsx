/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { useAccount, useSigner } from "wagmi";
import { ethers } from "ethers";
import { Footer } from "components/Footer";
import { Follow } from "components/WalletSelector/Follow";

/**
 * Profiles page.
 */

const Profiles = ({ profiles, address }) => {
  const [{ data: accountData }] = useAccount({ fetchEns: true });
  const [{ data, error, loading }, getSigner] = useSigner();
  const [nfts, setNfts] = useState(null);

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

    setNfts(res.toString().split(","));
  }

  useEffect(() => {
    walletOfOwner();
  }, [nfts]);

  return (
    <div className="h-screen w-full justify-between bg-primary-light text-black dark:bg-primary-dark dark:text-white">
      <div className="flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl">Welcome to Specto</div>

          {accountData?.address ? (
            <div className=" mx-auto  grid grid-cols-2 gap-4 p-8 md:max-w-7xl md:grid-cols-4 lg:grid-cols-6">
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
          ) : (
            ""
          )}
          <div className="mx-auto mt-10 max-w-7xl justify-between">
            <div>Not Following</div>

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

export default Profiles;
