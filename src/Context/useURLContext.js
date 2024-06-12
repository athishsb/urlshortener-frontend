import { useContext } from "react";
import URLContext from "./URLContext";

const useURLContext = () => {
  return useContext(URLContext);
};

export default useURLContext;
