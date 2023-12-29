import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Sepolia } from "@thirdweb-dev/chains";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";

import { StateContextProvider } from "./context";
import App from "./App";
import "./index.css";
import { Footer } from "./components";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ThirdwebProvider
    desiredChainId={ChainId.Sepolia}
    activeChain={Sepolia}
    clientId="65af5efe940207956d019ad36e02a00e"
  >
    <Router>
      <StateContextProvider>
        <App />
        <Footer />
      </StateContextProvider>
    </Router>
  </ThirdwebProvider>
);
