import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "@rainbow-me/rainbowkit/styles.css";

import { RainbowKitProvider, connectorsForWallets, getDefaultWallets } from "@rainbow-me/rainbowkit";
import { createConfig, http } from "@wagmi/core";
import {
  mainnet,
  sepolia,
  bsc,
  polygon,
  avalanche,
  optimism,
  arbitrum,
  opBNB,
  bscTestnet,
  opBNBTestnet,
} from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiConfig } from "wagmi";
import { Toaster } from "react-hot-toast";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import {
  binanceWallet,
  metaMaskWallet,
  tokenPocketWallet,
  trustWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
// Create a QueryClient instance
const queryClient = new QueryClient();

const chains = [

  bsc

];
const transports = {

  [bsc.id]: http("https://bsc-dataseed.binance.org/", {
    batch: true,
    fallback: [
      "https://bsc-dataseed1.defibit.io/",
      "https://bsc-dataseed1.ninicoin.io/",
    ],
  }),


};



const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [
        trustWallet,
        metaMaskWallet,
        tokenPocketWallet,
        binanceWallet,
        walletConnectWallet,
      ],
    },
  ],
  {
    appName: "My RainbowKit App",
    projectId: "a00fd414445702b7dcd0ef56dba0b1df",
  }
);
// Get default wallets
// const { connectors } = getDefaultWallets({
//   appName: "My App",
//   projectId: "a00fd414445702b7dcd0ef56dba0b1df",
//   chains,
// });

// Create Wagmi config
const wagmiConfig = createConfig({
  chains,
  connectors,
  transports,
  autoConnect: true,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider chains={chains}>
            <Toaster />
            <App />
          </RainbowKitProvider>
        </WagmiConfig>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);

// Export wagmiConfig for use in other files (e.g., WalletDetails.jsx)
export const config = wagmiConfig;