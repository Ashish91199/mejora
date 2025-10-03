import React, { useEffect, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import "./ConnectWallet.css";
import { useAccount } from "wagmi";
import axios from "axios";
function ConnectWallet() {

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
                const isConnected =
                    isReady &&
                    account &&
                    chain &&
                    (!authenticationStatus || authenticationStatus === "authenticated");

                // Return null if not ready to prevent layout shift
                if (!isReady) return null;

                // Not connected state
                if (!isConnected) {
                    return (
                        <button onClick={openConnectModal} className="cosmuno-connect-btn">
                            Connect Wallet
                        </button>
                    );
                }

                // Wrong network state
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

                // Connected state
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

export default ConnectWallet;