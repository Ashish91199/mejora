import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "@rainbow-me/rainbowkit/styles.css";
import { connectorsForWallets, getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { bscTestnet, opBNBTestnet } from "viem/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { Toaster } from "react-hot-toast";
import {
  binanceWallet,
  metaMaskWallet,
  tokenPocketWallet,
  trustWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { Provider } from "react-redux";
import { store } from "./redux/store.js";

// const connectors = connectorsForWallets(
//   [
//     {
//       groupName: 'Recommended',
//       wallets: [trustWallet, metaMaskWallet, tokenPocketWallet, binanceWallet, walletConnectWallet],
//     },
//   ],
//   {
//     appName: 'My RainbowKit App',
//     projectId: '37fee02b4b61416e511c21b2ef5e5bd1',

//   }
// );
export const config = getDefaultConfig({
  // connectors,
  appName: "My RainbowKit App",
  projectId: "37fee02b4b61416e511c21b2ef5e5bd1",
  chains: [bscTestnet],
  ssr: true,
});

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <RainbowKitProvider>
        <Toaster />
        <Provider store={store}>
          <App />
        </Provider>
      </RainbowKitProvider>
    </QueryClientProvider>
  </WagmiProvider>
);