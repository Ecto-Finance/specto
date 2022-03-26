import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { SearchIcon } from "@heroicons/react/solid";
import { pinJSONToIPFS } from "lib/pinata/pinata";

import { OPENSEA_API_KEY, LENS_PROXY_ADDRESS } from "lib/config/env";
import { useCreateProfileMutation, useProfilesQuery } from "generated/graphql";

import { ethers } from "ethers";
import { useConnect, useSigner } from "wagmi";

export const Migrate = () => {
  const [colAddress, setColAddress] = useState("");
  const [colName, setColName] = useState("");
  let [isOpen, setIsOpen] = useState(false);

  const [createProfile] = useCreateProfileMutation();
  const [{ data, error, loading }, getSigner] = useSigner();

  // ABI for Lens hub
  const lensHubABI = [
    "constructor(address followNFTImpl, address collectNFTImpl)",
    "function follow(uint256[] calldata profileIds, bytes[] calldata datas) external",
  ];
  // provider for ethers
  async function sendFollow(profileId: number) {
    let provider = new ethers.providers.InfuraProvider("maticmum", {
      infura: process.env.INFURA_PROJECT_ID,
    });
    let lensHubContract = new ethers.Contract(
      LENS_PROXY_ADDRESS,
      lensHubABI,
      data
    );
    let res = await lensHubContract.follow([profileId]);
    console.log(res);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function buildProfileHandle() {
    return "test" + (Math.random() * 100).toString();
  }

  const findCollection = async (contractAddress: string) => {
    let randomHandle = buildProfileHandle();
    /*const { data: getProfile, loading, error } = useProfilesQuery({
    variables: {
      request: {
        randomHandle,
      },
    },
  });*/

    const options = {
      method: "GET",
      headers: { "X-API-KEY": OPENSEA_API_KEY },
    };

    let response = await fetch(
      `https://api.opensea.io/api/v1/asset_contract/${contractAddress}`,
      options
    );
    let res = await response.json();
    //setColName(res.name); //could be used to make handle dynamic, but someone could front run and grab for ex: lostsoulssanctuary handle already
    let pinataOut = await pinJSONToIPFS({
      pinataMetadata: {
        name: res.name,
      },
      pinataContent: {
        response,
      },
    });
    if (pinataOut.success == true) {
      let createProfileOut = await createProfile({
        variables: {
          request: {
            handle: randomHandle,
            profilePictureUri: `ipfs://${pinataOut.ipfsHash}`,
          },
        },
      });
      console.log(createProfileOut);
      // call follow from contract
      //let profileIdOut = getProfile;
      //console.log(profileIdOut);
      //sendFollow()
    } else {
      console.log("Error with Pinata");
    }
  };

  const handleChange = (address: any) => {
    setColAddress(address);
  };

  const submitAddress = (contractAddress: string) => {
    findCollection(contractAddress);
    setIsOpen(false);
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="rounded-lg bg-primary-green px-2 py-1 hover:bg-opacity-70"
        >
          Migrate
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
                <Dialog.Title as="h3" className="text-lg font-medium leading-6">
                  Enter Contract Address
                </Dialog.Title>

                <div className="relative mt-4">
                  <div className="pointer-events-none absolute inset-y-0 flex items-center pl-3">
                    <SearchIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    className="block w-full rounded-md border-gray-300 bg-gray-50 pl-10 text-sm text-black selection:bg-green-200 focus:border-primary-green focus:ring-primary-green"
                    type="text"
                    placeholder="Contract Address..."
                    onChange={(e) => handleChange(e.target.value)}
                  />
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-primary-green px-4 py-2 text-sm font-medium text-white hover:bg-opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-green focus-visible:ring-offset-2"
                    onClick={() => submitAddress(colAddress)}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
