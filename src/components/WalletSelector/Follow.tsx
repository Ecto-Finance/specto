import { SPECTO_SWAP_ADDRESS } from "lib/config/env";
import { ethers } from "ethers";
import { useAccount, useSigner } from "wagmi";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { SearchIcon } from "@heroicons/react/solid";

export const Follow = (tokenId) => {
  const [{ data: accountData }] = useAccount();
  const [{ data, error, loading }, getSigner] = useSigner();
  const [id, setId] = useState();
  let [isOpen, setIsOpen] = useState(false);

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
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleChange = (tokenId: any) => {
    setId(tokenId);
  };

  const Follow = (tokenId: number) => {
    swapToLens(0);
  };

  const Unfollow = (tokenId: number) => {
    swapFromLens(0);
  };

  //input for token Id

  return (
    <div className="space-x-4 ">
      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="rounded-lg bg-primary-green px-2 py-1 hover:bg-opacity-70"
        >
          Follow
        </button>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-50" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="my-8 inline-block w-full max-w-md transform overflow-hidden rounded-2xl bg-primary-light p-6 text-left align-middle text-black shadow-xl transition-all dark:bg-secondary-dark dark:text-white">
                <Dialog.Title
                  as="h3"
                  className="text-center text-lg font-light leading-6"
                >
                  Enter token Id of collection.
                </Dialog.Title>
                <div className="mx-auto mt-4 space-x-4 text-center">
                  <input
                    className=" w-24 rounded-md border-gray-300 bg-gray-50 text-sm text-black selection:bg-green-200 focus:border-primary-green focus:ring-primary-green"
                    type="text"
                    placeholder="Enter Id..."
                    onChange={(e) => handleChange(e.target.value)}
                  />

                  {accountData ? (
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-primary-green px-4 py-2 text-sm font-medium text-white hover:bg-opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-green focus-visible:ring-offset-2"
                      onClick={() => Follow(tokenId)}
                    >
                      Follow
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-primary-green px-4 py-2 text-sm font-medium text-white hover:bg-opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-green focus-visible:ring-offset-2"
                      onClick={() => Unfollow(tokenId)}
                    >
                      Unfollow
                    </button>
                  )}
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};
