import React, { useEffect, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useReconnect } from "wagmi";
import toast from "react-hot-toast";

function WalletConnectProvider() {
    const { address, isConnected } = useAccount();
    const { reconnect } = useReconnect();
    const [hasRetried, setHasRetried] = useState(false);

    // ✅ Retry logic when connected
    useEffect(() => {
        if (isConnected && !hasRetried) {
            setHasRetried(true); // prevent infinite retry
            toast.success("Wallet connected!");

            // 🧠 Telegram WebApp can lose wagmi context — force refresh
            setTimeout(() => {
                reconnect(); // try to rehydrate wagmi connection
            }, 500);

            // Optionally reload your data or trigger any custom logic:
            // fetchProfile(address);
            // handleRegisterIfNeeded();
            // window.location.reload(); // <- use only if needed
        }
    }, [isConnected, address, hasRetried, reconnect]);

    return (
        <ConnectButton.Custom>
            {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                authenticationStatus,
                mounted,
            }) => {
                const isReady = mounted && authenticationStatus !== "loading";
                const connected =
                    isReady &&
                    account &&
                    chain &&
                    (!authenticationStatus || authenticationStatus === "authenticated");

                if (!isReady) return null;

                // ⛔ Not connected
                if (!connected) {
                    return (
                        <button onClick={openConnectModal} className="connectcss">
                            Connect Wallet
                        </button>
                    );
                }

                // 🚫 Wrong network
                if (chain.unsupported) {
                    return (
                        <button
                            onClick={openChainModal}
                            className="cosmuno-wrong-network-btn"
                        >
                            Wrong Network
                        </button>
                    );
                }

                // ✅ Connected
                return (
                    <div className="cosmuno-wallet-connected-container">
                        <button onClick={openChainModal} className="cosmuno-network-btn">
                            {chain.hasIcon && (
                                <div className="cosmuno-chain-icon">
                                    {chain.iconUrl && (
                                        <img
                                            alt={chain.name ?? "Chain icon"}
                                            src={chain.iconUrl}
                                            className="cosmuno-chain-icon-img"
                                        />
                                    )}
                                </div>
                            )}
                            {chain.name}
                        </button>

                        <button onClick={openAccountModal} className="cosmuno-account-btn">
                            <span className="cosmuno-account-name">
                                {account.displayName}
                            </span>
                            {account.displayBalance && (
                                <span className="cosmuno-account-balance">
                                    {account.displayBalance}
                                </span>
                            )}
                        </button>
                    </div>
                );
            }}
        </ConnectButton.Custom>
    );
}

export default WalletConnectProvider;
