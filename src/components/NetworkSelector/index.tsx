import React, { Fragment } from "react";
import { useNetwork, useAccount } from "wagmi";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";

export const NetworkSelector = () => {
  const [{ data: accountData }] = useAccount({ fetchEns: true });
  const [{ data: networkData, error: switchNetworkError }, switchNetwork] =
    useNetwork();

  if (accountData) {
    return (
      <div>
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="rounded-lg border border-black px-2 py-1">
              <div className="flex items-center">
                {networkData.chain.name}
                <ChevronDownIcon
                  className="-mr-1 ml-2 h-5 w-5"
                  aria-hidden="true"
                />
              </div>
            </Menu.Button>
          </div>

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
              <div className="my-2 flex flex-col">
                {switchNetwork &&
                  networkData.chains.map((x) =>
                    x.id === networkData.chain?.id ? null : (
                      <button
                        className="mx-1 rounded-sm bg-opacity-80 hover:bg-primary-green"
                        key={x.id}
                        onClick={() => switchNetwork(x.id)}
                      >
                        {x.name}
                      </button>
                    )
                  )}
                {switchNetworkError && switchNetworkError?.message}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    );
  }

  return <></>;
};
