import {
  SPECTO_SWAP_ADDRESS,
  INFURA_ID,
  COLLECTION_NFT_ADDRESS,
} from "lib/config/env";
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

  const erc721ABI = [
    "function setApprovalForAll(address operator, bool _approved)",
  ];
  // provider for ethers
  async function swapToLens(tokenId: number) {
    let provider = new ethers.providers.InfuraProvider(
      "maticmum",
      "706af4be1ee6441e93cff2fccc22e8cd"
    );
    console.log(tokenId);

    let spectoSwapContract = new ethers.Contract(
      SPECTO_SWAP_ADDRESS,
      spectoSwapABI,
      data
    );
    let collectionContract = new ethers.Contract(
      COLLECTION_NFT_ADDRESS,
      erc721ABI,
      data
    );
    let resOut = await collectionContract.setApprovalForAll(
      SPECTO_SWAP_ADDRESS,
      true
    );
    await resOut.wait(5);

    let res = await spectoSwapContract.connect(data).swapToLens(tokenId);
  }

  async function swapFromLens(tokenId: number) {
    let provider = new ethers.providers.InfuraProvider(
      "maticmum",
      "706af4be1ee6441e93cff2fccc22e8cd"
    );
    console.log({ SPECTO_SWAP_ADDRESS });

    let spectoSwapContract = new ethers.Contract(
      SPECTO_SWAP_ADDRESS,
      spectoSwapABI,
      data
    );
    // Follow NFT approval
    let followNFTAddress = localStorage.getItem("followAddress");
    let followNFTContract = new ethers.Contract(
      followNFTAddress,
      erc721ABI,
      data
    );

    let resOut = await followNFTContract.setApprovalForAll(
      SPECTO_SWAP_ADDRESS,
      true
    );
    await resOut.wait(3);

    let collectionNFTContract = new ethers.Contract(
      COLLECTION_NFT_ADDRESS,
      erc721ABI,
      data
    );
    let resOut2 = await collectionNFTContract.setApprovalForAll(
      SPECTO_SWAP_ADDRESS,
      true
    );
    await resOut2.wait(3);

    let res = await spectoSwapContract.connect(data).swapFromLens(tokenId);
    console.log(res);
  }

  const Follow = (tokenIdIn: number) => {
    swapToLens(tokenIdIn);
  };

  const Unfollow = (tokenIdIn: number) => {
    swapFromLens(tokenIdIn);
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
