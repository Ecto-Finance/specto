/* eslint-disable prettier/prettier */
export const setAuthenticationToken = (token) => {
  localStorage.setItem("auth_token", token);
};

export const getAuthenticationToken = () => {
  return localStorage.getItem("auth_token");
};

export const removeAuthenticationToken = () => {
  return localStorage.removeItem("auth_token");
};
