import { useState } from "react";

// Custom hook to check if the user is authenticated
const useAuth = () => {
  const accessToken = localStorage.getItem("token");
  const userName = localStorage.getItem("token");
  // Use state to store the authentication status
  const [isAuthenticated] = useState(() => {
    // Return true if both token and user exist, otherwise return false
    return accessToken && userName ? true : false;
  });

  // Return the authentication status
  return isAuthenticated;
};

export default useAuth;
