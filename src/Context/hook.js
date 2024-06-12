import { useContext } from "react";
import { NameContext } from "./context";

// Create a custom hook to use the context
const useGlobalContext = () => {
  return useContext(NameContext);
};

export { useGlobalContext };
