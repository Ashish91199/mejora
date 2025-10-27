import React from "react";
import { createRoot } from "react-dom/client";
import { createAppKit } from "@reown/appkit/react";
import { WagmiProvider } from "wagmi";
import { mainnet, arbitrum } from "@reown/appkit/networks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

import App from "./App";
import { store } from "./redux/store";

import "./App.css";
import "./index.css";

// ✅ 1. Setup Query Client
const queryClient = new QueryClient();

// ✅ 2. Use your *real* Project ID from Reown dashboard
// 👉 Go to https://dashboard.reown.com → Copy Project ID
const projectId = "37fee02b4b61416e511c21b2ef5e5bd1"; // e.g. "c97e6e83c42b71e2613b123456789abc"

// ✅ 3. Add correct metadata (MUST match domain or localhost)
const metadata = {
  name: "AppKit DApp",
  description: "Deposit Page Example",
  url: window.location.origin, // auto detects correct origin
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
};
export const bscTestnet = {
  id: 97, // BSC Testnet chainId
  name: "BSC Testnet",
  network: "bsc-testnet",
  nativeCurrency: {
    name: "Binance Coin",
    symbol: "BNB",
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ["https://data-seed-prebsc-1-s1.binance.org:8545/"] },
  },
  blockExplorers: {
    default: { name: "BscScan Testnet", url: "https://testnet.bscscan.com" },
  },
  testnet: true,
};
// ✅ 4. Define supported networks
const networks = [bscTestnet];

// ✅ 5. Create Wagmi adapter
const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true,
});

// ✅ 6. Initialize Reown AppKit modal
createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  features: {
    analytics: true, // optional
  },
});

export const config = wagmiAdapter.wagmiConfig;
// ✅ 7. Render App
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <Toaster />
          <App />
        </Provider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);