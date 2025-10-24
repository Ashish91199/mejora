import React from "react";
import { createRoot } from "react-dom/client";
import { createAppKit, AppKitButton } from "@reown/appkit/react";
import { WagmiProvider } from "wagmi";
import { arbitrum, mainnet } from "@reown/appkit/networks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import App from "./App";
import { store } from "./redux/store";
import "./App.css";
import "./index.css";

const queryClient = new QueryClient();

// ✅ Use your real Project ID here:
const projectId = "YOUR_REAL_PROJECT_ID"; // Example: "1234abcd5678efgh"

// ✅ Metadata must match your actual accessible domain
const metadata = {
  name: "AppKit DApp",
  description: "Deposit Page Example",
  url: window.location.origin, // auto-detects correct host
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
};

const networks = [mainnet, arbitrum];

const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true,
});

// Initialize Reown AppKit modal
createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  features: {
    analytics: true,
  },
});

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
