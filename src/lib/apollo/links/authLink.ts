import { ApolloLink } from "@apollo/client";
import { getAuthenticationToken } from "lib/lens/state";

const authLink = new ApolloLink((operation, forward) => {
  // Retrieve the authorization token from local storage.
  const token = getAuthenticationToken();

  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      "x-access-token": token ? `Bearer ${token}` : "",
    },
  });

  // Call the next link in the middleware chain.
  return forward(operation);
});

export default authLink;
