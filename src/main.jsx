import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "@rainbow-me/rainbowkit/styles.css";

import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
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
} from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiConfig } from "wagmi";
import { Toaster } from "react-hot-toast";
import { store } from "./redux/store";
import { Provider } from "react-redux";

// Create a QueryClient instance
const queryClient = new QueryClient();

const chains = [
  // mainnet,
  // sepolia,
  // bsc,
  // polygon,
  // avalanche,
  // optimism,
  // arbitrum,
  // opBNB,
  bscTestnet
];
const transports = {
  [mainnet.id]: http(
    "https://eth-mainnet.g.alchemy.com/v2/tO_FPsuW9FEXXtmHOauwN",
    { batch: true }
  ),
  [sepolia.id]: http(
    "https://eth-sepolia.g.alchemy.com/v2/tO_FPsuW9FEXXtmHOauwN",
    { batch: true }
  ),
  [bsc.id]: http("https://bsc-dataseed.binance.org/", {
    batch: true,
    fallback: [
      "https://bsc-dataseed1.defibit.io/",
      "https://bsc-dataseed1.ninicoin.io/",
    ],
  }),
  [polygon.id]: http(
    "https://polygon-mainnet.g.alchemy.com/v2/tO_FPsuW9FEXXtmHOauwN",
    { batch: true }
  ),
  [avalanche.id]: http(
    "https://avalanche-mainnet.infura.io/v3/tO_FPsuW9FEXXtmHOauwN",
    { batch: true }
  ),
  [optimism.id]: http(
    "https://opt-mainnet.g.alchemy.com/v2/tO_FPsuW9FEXXtmHOauwN",
    { batch: true }
  ),
  [arbitrum.id]: http("https://arb1.arbitrum.io/rpc", { batch: true }),
  [opBNB.id]: http("https://opbnb-mainnet-rpc.bnbchain.org", { batch: true }),
  [bscTestnet.id]: http("https://bsc-testnet-rpc.publicnode.com", { batch: true }),


};

// Get default wallets
const { connectors } = getDefaultWallets({
  appName: "My App",
  projectId: "a00fd414445702b7dcd0ef56dba0b1df",
  chains,
});

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