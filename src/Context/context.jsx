// Get token from Login and set in global context
// or set token in local storage

import { createContext, useState } from "react";
import PropTypes from "prop-types";

const NameContext = createContext(); //step 1

const NameProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({
    fname: "",
    lname: "",
    email: "",
    id: "",
  });
  const [isLogged, setIsLogged] = useState(false);

  return (
    // step 2
    <NameContext.Provider
      value={{ currentUser, setCurrentUser, isLogged, setIsLogged }}
    >
      {children}
    </NameContext.Provider>
  );
};

NameProvider.propTypes = {
  children: PropTypes.node,
};

export { NameContext, NameProvider };
