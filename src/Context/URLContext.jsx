import { createContext, useState } from "react";
import PropTypes from "prop-types";

const URLContext = createContext();

export const URLProvider = ({ children }) => {
  const [todayURLlist, setTodayURLlist] = useState([]);
  const [monthlyURLlist, setMonthlyURLlist] = useState([]);

  return (
    <URLContext.Provider
      value={{ todayURLlist, setTodayURLlist, monthlyURLlist, setMonthlyURLlist }}
    >
      {children}
    </URLContext.Provider>
  );
};

URLProvider.propTypes = {
  children: PropTypes.node,
};

export default URLContext;
