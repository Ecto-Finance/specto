import { onError } from "@apollo/client/link/error";

/**
 * Apollo error link.
 */
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.error(
        `[GraphQL Error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );

  if (networkError) console.error(`[Network Error]: ${networkError}`);
});

export default errorLink;
