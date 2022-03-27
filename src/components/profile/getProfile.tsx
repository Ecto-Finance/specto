import { initializeApollo } from "lib/apollo/client";
import { gql } from "@apollo/client";
import { prettyJSON } from "../../lib/lens/helpers";

const GET_PROFILES = `
  query($request: ProfileQueryRequest!) {
    profiles(request: $request) {
      items {
        id
        name
        bio
        location
        website
        twitterUrl
        picture {
          ... on NftImage {
            contractAddress
            tokenId
            uri
            verified
          }
          ... on MediaSet {
            original {
              url
              mimeType
            }
          }
          __typename
        }
        handle
        coverPicture {
          ... on NftImage {
            contractAddress
            tokenId
            uri
            verified
          }
          ... on MediaSet {
            original {
              url
              mimeType
            }
          }
          __typename
        }
        ownedBy
        depatcher {
          address
          canUseRelay
        }
        stats {
          totalFollowers
          totalFollowing
          totalPosts
          totalComments
          totalMirrors
          totalPublications
          totalCollects
        }
        followModule {
          ... on FeeFollowModuleSettings {
            type
            amount {
              asset {
                symbol
                name
                decimals
                address
              }
              value
            }
            recipient
          }
          __typename
        }
      }
      pageInfo {
        prev
        next
        totalCount
      }
    }
  }
`;

export const getProfilesRequest = (ownedBy) => {
  return initializeApollo().query({
    query: gql(GET_PROFILES),
    variables: {
      request: {
        ownedBy,
      },
    },
  });
};

export const getProfiles = async (address) => {
  console.log("profiles of: address", address);

  const request = { ownedBy: address };

  const profilesFromProfileIds = await getProfilesRequest(request);

  prettyJSON("profiles: result", profilesFromProfileIds.data);

  return profilesFromProfileIds.data;
};
