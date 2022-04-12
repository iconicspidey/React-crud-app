import React, { createContext, useReducer } from "react";

const initial = {
  users: [],
};
export const GloabalContext = createContext();

const GlobalProvider = ({ children }) => {
  function reducer(user, action) {
    const { type, payload } = action;
    const { users } = user;

    switch (type) {
      case "add":
        return {
          ...user,
          users: [payload, ...users],
        };
        break;
      case "remove":
        return users.some((prev) => prev.editStatus == true)
          ? user
          : {
              ...user,
              users: users.filter((prev) => prev.id !== payload),
            };
        break;
      case "edit":
        return {
          ...user,
          users: payload,
        };

      default:
    }
  }
  const [state, dispatch] = useReducer(reducer, initial);

  return (
    <GloabalContext.Provider value={{ state, dispatch }}>
      {children}
    </GloabalContext.Provider>
  );
};
export default GlobalProvider;
