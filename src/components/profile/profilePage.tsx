/* eslint-disable @next/next/no-img-element */
import { useEffect, useState, Dispatch, SetStateAction, Fragment } from "react";
import { Menu, Transition, Dialog } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { profileNFT } from "../../lib/lens/profileNFT";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import { getProfiles, getProfilesRequest } from "./getProfile";
import { OPENSEA_API_KEY } from "lib/config/env";
import React from "react";
import { prettyJSON } from "lib/lens/helpers";

// not sure why the setProfile interface is like that, but we rolling with it.
interface Props {
  profile: profileNFT;
  setProfile: Dispatch<SetStateAction<profileNFT | undefined>>;
}

export const ProfileSelector = ({ profile, setProfile }: Props) => {
  const [message, setMessage] = React.useState("");
  const [recepient, setRecepient] = useState<string>("");
  const [{ data: accountData }] = useAccount({ fetchEns: true });
  const [collection, setCollections] = useState({});
  const zeroAddress = ethers.constants.AddressZero;
  let [isOpen, setIsOpen] = useState(false);
  const profiles = [
    {
      name: (
        <button key={1} className="" onClick={() => findGhouls()}>
          Lost Ghouls
        </button>
      ),
      logoPath: "",
      address: zeroAddress,
    },
    {
      name: (
        <button key={2} className="" onClick={() => findSouls()}>
          Lost Soul Sanctuary
        </button>
      ),
      logoPath: "",
      address: zeroAddress,
    },
  ];

  //this is using OS as an example profile page.
  const findSouls = () => {
    const options = {
      method: "GET",
      headers: { "X-API-KEY": OPENSEA_API_KEY },
    };

    fetch(
      "https://api.opensea.io/api/v1/asset_contract/0x0FB69D1dC9954a7f60e83023916F2551E24F52fC",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setCollections(response);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    console.log(collection);
  }, [collection]);

  //adddddd
  const findGhouls = () => {
    const options = {
      method: "GET",
      headers: { "X-API-KEY": OPENSEA_API_KEY },
    };

    fetch(
      "https://api.opensea.io/api/v1/asset_contract/0x9738055845b6f657f8ACFE0F0A90953C55f64004",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setCollections(response);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    console.log(collection);
  }, [collection]);

  return (
    <div>
      <div className=" text-center">
        <div>
          <input
            className="border-contrast rounded border px-4 py-1.5 text-black"
            id="recepient"
            value={recepient}
            onChange={(e) => setRecepient(e.target.value)}
            placeholder="search by address"
          />
          <button
            className="ml-2 rounded-lg bg-primary-green px-4 py-2 hover:bg-opacity-70"
            onClick={async () =>
              setMessage(await getProfiles(accountData?.address))
            }
          >
            Get Profiles
          </button>

          <button onClick={() => setIsOpen(true)}>
            <Menu as="div" className="relative inline-block text-left ">
              <Menu.Button className="rounded-lg px-2 py-1">
                {profile ? (
                  <div className="flex rounded-lg bg-primary-green px-2 py-2 hover:bg-opacity-70">
                    <div className="ml-2"> {profile.name}</div>
                    <ChevronDownIcon
                      className="mr-1 mt-1 ml-2 flex h-5 w-5"
                      aria-hidden="true"
                    />
                  </div>
                ) : (
                  <div className="flex rounded-lg bg-primary-green px-4 py-2 hover:bg-opacity-70">
                    Specto Profiles
                    <ChevronDownIcon
                      className="ml-2  mt-1 flex h-5 w-5"
                      aria-hidden="true"
                    />
                  </div>
                )}
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
                <Menu.Items className="absolute right-0 mt-2 w-44 rounded-md bg-white text-black shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-zinc-600 dark:text-white">
                  {profiles.map((profile, i) => (
                    <button key={i} onClick={() => setProfile(profiles[i])}>
                      <div className="flex w-44 items-center p-2">
                        <div key={i}>{profile.name}</div>
                      </div>
                    </button>
                  ))}
                </Menu.Items>
              </Transition>
            </Menu>
          </button>

          <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
            <div className="flex justify-center text-center ">
              <Dialog.Overlay className="fixed inset-0 flex bg-black opacity-50" />
              <div className="absolute top-60 rounded-xl bg-white p-10 pt-3">
                <div className="flex p-8 text-black">
                  <img
                    src={collection.image_url}
                    alt=""
                    className="h-40 rounded-lg"
                  />
                  <div>
                    {" "}
                    {collection.collection?.name}
                    <button onClick={() => setIsOpen(true)}>
                      <Menu as="div" className="relative inline-block">
                        <Menu.Button className="rounded-lg px-2 py-1">
                          <div className="flex text-black">
                            <p>Info</p>
                            <ChevronDownIcon
                              className="ml-2 mt-1 flex h-5 w-5"
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
                          <Menu.Items className="absolute  mt-2 rounded-md bg-white p-4 text-black shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-zinc-600 dark:text-black">
                            <div className="mb-10 text-white sm:mb-0">
                              <div> {collection.collection?.name} </div>
                              <div>{collection.symbol}</div>
                              <div> {collection.address}</div>
                              <div> {collection.schema_name}</div>
                            </div>{" "}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </button>
                    <button onClick={() => setIsOpen(true)}>
                      <Menu
                        as="div"
                        className="relative inline-block dark:text-white"
                      >
                        <Menu.Button className="rounded-lg px-2 py-1">
                          <div className="flex text-black">
                            <p>stats</p>
                            <ChevronDownIcon
                              className="ml-2  mt-1 flex h-5 w-5"
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
                          <Menu.Items className="absolute right-0 mt-2 w-44 rounded-md bg-white text-black shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-zinc-600 dark:text-black">
                            <div
                              id="wrapper"
                              className="mx-auto max-w-xl px-4 py-4"
                            >
                              <div
                                id="Followers"
                                className="flex flex-col justify-center rounded border border-gray-300 bg-white "
                              >
                                <p className="text-center text-gray-500">
                                  Followers <span>#</span>
                                </p>
                              </div>

                              <div
                                id="Following"
                                className="mt-4 flex flex-col justify-center rounded border border-gray-300 bg-white sm:mt-0"
                              >
                                <p className="text-center text-gray-500">
                                  Following <span>#</span>
                                </p>
                              </div>

                              <div
                                id="Posts"
                                className="mt-4 flex flex-col justify-center rounded border border-gray-300 bg-white sm:mt-0"
                              >
                                <p className="text-center text-gray-500">
                                  Posts <span>#</span>
                                </p>
                              </div>
                              <div
                                id="Comments"
                                className="mt-4 flex flex-col justify-center rounded border border-gray-300 bg-white sm:mt-0"
                              >
                                <p className="text-center  text-gray-500">
                                  Comments <span>#</span>
                                </p>
                              </div>
                              <div
                                id="Mirrors"
                                className="mt-4 flex flex-col justify-center rounded border border-gray-300 bg-white sm:mt-0"
                              >
                                <p className="text-center text-gray-500">
                                  Mirrors <span>#</span>
                                </p>
                              </div>
                              <div
                                id="Publications"
                                className="mt-4 flex flex-col justify-center rounded border border-gray-300 bg-white sm:mt-0"
                              >
                                <p className="text-center text-gray-500">
                                  Publications <span>#</span>
                                </p>
                              </div>
                              <div
                                id="Comments"
                                className="mt-4 flex flex-col justify-center rounded border border-gray-300 bg-white sm:mt-0"
                              >
                                <p className="text-center text-gray-500">
                                  Comments <span>#</span>
                                </p>
                              </div>
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </button>
                  </div>
                  <div className="ml-4">
                    {" "}
                    {collection.collection?.description}
                  </div>{" "}
                </div>
              </div>
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
};
