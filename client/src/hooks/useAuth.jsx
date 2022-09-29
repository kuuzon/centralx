import { useContext, useDebugValue } from "react";
import AuthContext from "../contexts/AuthContext";

// Create useAuth HOOK to access AuthContext values [ACCESSES the WRAPPER]
const useAuth = () => {
  // DEBUG: Displays whether user is logged in properly or not (only when DevTools opened)
  const { user } = useContext(AuthContext);
  useDebugValue(user, user => user?.id ? "Logged In" : "Logged Out");

  return useContext(AuthContext);
}

export default useAuth;