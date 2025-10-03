import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "@rainbow-me/rainbowkit/styles.css";
import { connectorsForWallets, getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { opBNBTestnet } from "viem/chains";
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

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [trustWallet, metaMaskWallet, tokenPocketWallet, binanceWallet, walletConnectWallet],
    },
  ],
  {
    appName: 'My RainbowKit App',
    projectId: 'YOUR_PROJECT_ID',
  }
);
export const config = getDefaultConfig({
  connectors,
  appName: "My RainbowKit App",
  projectId: "my project Id",
  chains: [opBNBTestnet],
  ssr: true,
});

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <RainbowKitProvider>
        <Toaster />
        <App />
      </RainbowKitProvider>
    </QueryClientProvider>
  </WagmiProvider>
);