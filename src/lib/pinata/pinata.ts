import axios from "axios";

import { PINATA_API_KEY, PINATA_API_SECRET } from "lib/config/env";

export const pinJSONToIPFS = async (JSONBody: any) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
  return axios
    .post(url, JSONBody, {
      headers: {
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_API_SECRET,
      },
    })
    .then(function (response) {
      return {
        success: true,
        ipfsHash: response.data.IpfsHash,
        pinataUrl:
          "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash,
      };
    })
    .catch(function (error) {
      return {
        success: false,
        ipfsHash: null,
        pinataUrl: error.message,
      };
    });
};
