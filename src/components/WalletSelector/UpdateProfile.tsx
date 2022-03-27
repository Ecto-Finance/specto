import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useUpdateProfileMutation } from "generated/graphql";

export const UpdateProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");
  const [twitter, setTwitter] = useState("");
  const [updateProfileMutation] = useUpdateProfileMutation();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleNameChange = (name: string) => {
    setName(name);
  };

  const handleBioChange = (bio: string) => {
    setBio(bio);
  };

  const handleLocationChange = (location: string) => {
    setLocation(location);
  };

  const handleWebsiteChange = (website: string) => {
    setWebsite(website);
  };

  const handleTwitterChange = (twitter: string) => {
    setTwitter(twitter);
  };

  const submitUpdate = async () => {
    let updateProfileInfo = await updateProfileMutation({
      variables: {
        request: {
          name: name,
          profileId: "0x03f0",
          bio: bio,
          location: location,
          website: website,
          twitterUrl: twitter,
        },
      },
    });

    //console.log(updateProfileInfo);
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
          Profile
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
                  Update Profile Information
                </Dialog.Title>

                <div className="relative mt-4 flex flex-col space-y-2">
                  <input
                    className="block w-full rounded-md border-gray-300 bg-gray-50 pl-10 text-sm text-black selection:bg-green-200 focus:border-primary-green focus:ring-primary-green"
                    type="text"
                    placeholder="Update Name..."
                    onChange={(e) => handleNameChange(e.target.value)}
                  />
                  <input
                    className="block w-full rounded-md border-gray-300 bg-gray-50 pl-10 text-sm text-black selection:bg-green-200 focus:border-primary-green focus:ring-primary-green"
                    type="text"
                    placeholder="Update Bio..."
                    onChange={(e) => handleBioChange(e.target.value)}
                  />
                  <input
                    className="block w-full rounded-md border-gray-300 bg-gray-50 pl-10 text-sm text-black selection:bg-green-200 focus:border-primary-green focus:ring-primary-green"
                    type="text"
                    placeholder="Update Location..."
                    onChange={(e) => handleLocationChange(e.target.value)}
                  />
                  <input
                    className="block w-full rounded-md border-gray-300 bg-gray-50 pl-10 text-sm text-black selection:bg-green-200 focus:border-primary-green focus:ring-primary-green"
                    type="text"
                    placeholder="Update Website..."
                    onChange={(e) => handleWebsiteChange(e.target.value)}
                  />
                  <input
                    className="block w-full rounded-md border-gray-300 bg-gray-50 pl-10 text-sm text-black selection:bg-green-200 focus:border-primary-green focus:ring-primary-green"
                    type="text"
                    placeholder="Update Twitter..."
                    onChange={(e) => handleTwitterChange(e.target.value)}
                  />
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-primary-green px-4 py-2 text-sm font-medium text-white hover:bg-opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-green focus-visible:ring-offset-2"
                    onClick={() => submitUpdate()}
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
