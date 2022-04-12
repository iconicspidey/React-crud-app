import React from "react";
import Home from "./component/Home";
import GlobalProvider from "./globalstate/GlobalState";

function app() {
  return (
    <GlobalProvider>
      <Home />
    </GlobalProvider>
  );
}

export default app;
