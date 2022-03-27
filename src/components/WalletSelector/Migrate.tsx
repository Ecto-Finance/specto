import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { SearchIcon } from "@heroicons/react/solid";
import { pinJSONToIPFS } from "lib/pinata/pinata";

import { OPENSEA_API_KEY, LENS_PROXY_ADDRESS, INFURA_ID } from "lib/config/env";
import {
  useCreateProfileMutation,
  useProfilesLazyQuery,
  useFollowNfTsOwnedLazyQuery,
} from "generated/graphql";

import { ethers } from "ethers";
import { useConnect, useSigner, useAccount } from "wagmi";

export const Migrate = () => {
  const [colAddress, setColAddress] = useState("");
  const [colName, setColName] = useState("");
  let [isOpen, setIsOpen] = useState(false);

  const [createProfile] = useCreateProfileMutation();
  const [{ data: accountData }, disconnect] = useAccount({ fetchEns: true });
  const [{ data, error, loading }, getSigner] = useSigner();
  const [getProfile] = useProfilesLazyQuery();
  const [getFollowNFTs] = useFollowNfTsOwnedLazyQuery();

  // ABI for Lens hub
  const lensHubABI = [
    "constructor(address followNFTImpl, address collectNFTImpl)",
    "function follow(uint256[] calldata profileIds, bytes[] calldata datas) external",
  ];

  const erc721ABI = [
    "function safeTransferFrom(address from,address to,uint256 tokenId) external",
  ];

  const spectoSwapABI = [
    "constructor(address _collectionNFTAddress, address _followNFTAddress)",
    "function updateFollowNFTAddress(address _newAddress)",
  ];

  async function sendFollow(profileId: string) {
    let provider = new ethers.providers.InfuraProvider(
      "maticmum",
      "706af4be1ee6441e93cff2fccc22e8cd"
    );
    let lensHubContract = new ethers.Contract(
      "0xd7B3481De00995046C7850bCe9a5196B7605c367",
      lensHubABI,
      data
    );
    let res = await lensHubContract.follow([profileId], [[]]);
    return res;
  }

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function buildProfileHandle() {
    return "test" + Math.floor(Math.random() * 10000).toString();
  }

  const findCollection = async (contractAddress: string) => {
    let randomHandle: string = buildProfileHandle();
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
      // 1. Create Profile
      let createProfileOut = await createProfile({
        variables: {
          request: {
            handle: randomHandle,
            profilePictureUri: `ipfs://${pinataOut.ipfsHash}`,
            followNFTURI: `ipfs://QmQdyKTPhtxZiQgCKyaED2A2ERrh9UgDpCU5sZ26bw696X/`,
          },
        },
      });
      console.log(createProfileOut);
      // 2. Wait for transaction to complete
      let provider = new ethers.providers.InfuraProvider(
        "maticmum",
        "706af4be1ee6441e93cff2fccc22e8cd"
      );
      await provider.waitForTransaction(
        //@ts-ignore
        createProfileOut.data.createProfile.txHash,
        2
      );
      // 3. Get Profile Id
      console.log(
        //@ts-ignore
        `Done waiting for tx:${createProfileOut.data.createProfile.txHash}`
      );
      let profileIdOut = await getProfile({
        variables: {
          request: {
            handles: [randomHandle],
          },
        },
      });
      console.log(profileIdOut);
      console.log(profileIdOut.data.profiles.items[0].ownedBy);
      console.log(profileIdOut.data.profiles.items[0].id);

      // 4. Follow
      let followTxOut = await sendFollow(
        profileIdOut.data.profiles.items[0].id
      );
      console.log(followTxOut);
      await followTxOut.wait(2);

      console.log(
        //@ts-ignore
        `Send Follow Confirmed`
      );
      // 5. GET FollowNFT Address from profileid & Migrator Address
      let getFollowerNFTsOut = await getFollowNFTs({
        variables: {
          request: {
            address: profileIdOut.data.profiles.items[0].ownedBy,
            profileId: profileIdOut.data.profiles.items[0].id,
          },
        },
      });
      localStorage.setItem("profileId", profileIdOut.data.profiles.items[0].id);
      console.log(getFollowerNFTsOut);

      // 6. Call Follow, which mints to the Migrator Address
      console.log(`Profile ID set to local storage`);
      console.log(
        getFollowerNFTsOut,
        getFollowerNFTsOut.data.followerNftOwnedTokenIds.followerNftAddress
      );

      // 7. Send FollowNFT, update spectoswap w/ address
      let followNFT = new ethers.Contract(
        getFollowerNFTsOut.data.followerNftOwnedTokenIds.followerNftAddress,
        erc721ABI,
        data
      );
      console.log(
        //@ts-ignore
        `Sending tokenId:0 FollowerNFT from ${accountData.address} to SpectoSwap`
      );

      // 8. Send FollowNFT, to SpectoSwap
      let res = await followNFT
        .connect(data)
        .safeTransferFrom(
          accountData.address,
          "0x89E87a7Ba64A4658c91DEa824D2876Fb8f4B68a2",
          1
        );

      // 9. Update spectoswap w/ address
      let spectoswap = new ethers.Contract(
        "0x89E87a7Ba64A4658c91DEa824D2876Fb8f4B68a2",
        spectoSwapABI,
        data
      );
      await spectoswap.updateFollowNFTAddress(
        getFollowerNFTsOut.data.followerNftOwnedTokenIds.followerNftAddress
      );

      /////////////////////////////////////////////////////////////////////////////////
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
