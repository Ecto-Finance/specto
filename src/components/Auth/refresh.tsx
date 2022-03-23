import { initializeApollo } from "lib/apollo/client";
import { gql } from "@apollo/client";

const REFRESH_AUTHENTICATION = `
  mutation($request: RefreshRequest!) { 
    refresh(request: $request) {
      accessToken
      refreshToken
    }
 }
`;

export const refreshAuth = (refreshToken: string) => {
  return initializeApollo().mutate({
    mutation: gql(REFRESH_AUTHENTICATION),
    variables: {
      request: {
        refreshToken,
      },
    },
  });
};
