import { gql } from "@apollo/client";
import { prettyJSON } from "../../lib/lens/helpers";
import { pollUntilIndexed } from "./indexer";
import { initializeApollo } from "lib/apollo/client";

const CREATE_PROFILE = `
  mutation($request: CreateProfileRequest!) { 
    createProfile(request: $request) {
      ... on RelayerResult {
        txHash
      }
      ... on RelayError {
        reason
      }
			__typename
    }
 }
`;

const createProfileRequest = (createProfileRequest: {
  handle: string;
  profilePictureUri?: string;
  followNFTURI?: string;
}) => {
  return initializeApollo().mutate({
    mutation: gql(CREATE_PROFILE),
    variables: {
      request: createProfileRequest,
    },
  });
};

export const createProfile = async (
  handle: string,
  profilePictureUri: string
) => {
  const result = await createProfileRequest({
    handle,
    profilePictureUri,
  });

  prettyJSON("create profile: result", result.data);

  if (result.data.createProfile.__typename === "RelayError") {
    throw new Error(result.data.createProfile.reason);
  }

  console.log("poll until indexed");
  await pollUntilIndexed(result.data.createProfile.txHash);

  console.log("profile has been indexed");

  return result.data;
};
