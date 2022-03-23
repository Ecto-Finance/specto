import { createHttpLink } from "@apollo/client";

//import { API_BASE_URL } from "lib/config/env";

/**
 * Isomorphic GraphQL HTTP API link.
 */
const httpLink = createHttpLink({
  uri: "https://api-mumbai.lens.dev/",
  credentials: "same-origin",
});

export default httpLink;
