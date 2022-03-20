import React, { useState, Dispatch, SetStateAction, Fragment } from "react";
import { useNetwork } from "wagmi";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";

type Props = {};

export const NetworkSelector = () => {
  const [{ data: networkData, error: switchNetworkError }, switchNetwork] =
    useNetwork();

  return (
    <div>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="border border-black rounded-lg px-2 py-1">
            <div className="flex">
              Switch Network
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
          <Menu.Items className="origin-bottom-right  w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="flex flex-col mt-2 ">
              {switchNetwork &&
                networkData.chains.map((x) =>
                  x.id === networkData.chain?.id ? null : (
                    <button key={x.id} onClick={() => switchNetwork(x.id)}>
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
};
