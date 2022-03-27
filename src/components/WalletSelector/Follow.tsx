import { SPECTO_SWAP_ADDRESS } from "lib/config/env";
import { ethers } from "ethers";
import { useAccount, useSigner } from "wagmi";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { SearchIcon } from "@heroicons/react/solid";

export const Follow = ({ tokenId }) => {
  const [{ data: accountData }] = useAccount();
  const [{ data, error, loading }, getSigner] = useSigner();
  const [id, setId] = useState();

  // ABI for Specto Swap
  const spectoSwapABI = [
    "constructor(address _collectionNFTAddress, address _followNFTAddress)",
    "function swapToLens(uint256 tokenId) external",
    "function swapFromLens(uint256 tokenId) external",
  ];
  // provider for ethers
  async function swapToLens(tokenId: number) {
    let provider = new ethers.providers.InfuraProvider("maticmum", {
      infura: process.env.INFURA_PROJECT_ID,
    });
    console.log({ SPECTO_SWAP_ADDRESS });

    let spectoSwapContract = new ethers.Contract(
      "0x89E87a7Ba64A4658c91DEa824D2876Fb8f4B68a2",
      spectoSwapABI,
      data
    );
    let res = await spectoSwapContract.swapToLens(tokenId);
    console.log(res);
  }

  async function swapFromLens(tokenId: number) {
    let provider = new ethers.providers.InfuraProvider("maticmum", {
      infura: process.env.INFURA_PROJECT_ID,
    });
    let spectoSwapContract = new ethers.Contract(
      "0x89E87a7Ba64A4658c91DEa824D2876Fb8f4B68a2",
      spectoSwapABI,
      data
    );
    let res = await spectoSwapContract.swapFromLens(tokenId);
    console.log(res);
  }

  const Follow = (tokenId: number) => {
    swapToLens(1);
  };

  const Unfollow = (tokenId: number) => {
    swapFromLens(1);
  };

  //input for token Id

  return (
    <div className="space-x-4 ">
      <button
        type="button"
        className="inline-flex justify-center rounded-md border border-transparent bg-primary-green px-4 py-2 text-sm font-medium text-white hover:bg-opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-green focus-visible:ring-offset-2"
        onClick={() => Follow(tokenId)}
      >
        Follow
      </button>
    </div>
  );
};
