/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";

import { OPENSEA_API_KEY } from "lib/config/env";

export const Profiles = () => {
  const [collection, setCollections] = useState({});

  const findCollection = () => {
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

  return (
    <div className="">
      <div className="text-center">
        {" "}
        <button
          className="rounded-lg bg-primary-green px-2 py-1 hover:bg-opacity-70"
          onClick={() => findCollection()}
        >
          Find Collection
        </button>
      </div>
      <div className="flex">
        <img src={collection.image_url} className="mx-4 mb-4 mt-4 h-40 pl-4 " />
        <div className="mt-3 text-center">
          <h1 className="underline">
            {collection.collection?.name} ({collection.symbol}){" "}
            <span className="text-xs">{collection.schema_name}</span>
          </h1>
          <div> {collection.address}</div>
          <div> {collection.collection?.banner_image_url}</div>
          <div className="flex underline">
            {" "}
            <img src="/images/discord.svg" alt="" />@
            {collection.collection?.discord_url}
          </div>
          <div className="flex underline">
            {" "}
            <img src="/images/twitter.svg" alt="" />@
            {collection.collection?.twitter_username}
          </div>
          <div> {collection.collection?.description}</div>
        </div>
      </div>
    </div>
  );
};
