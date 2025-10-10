import React, { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
    readContract,
    writeContract,
    waitForTransaction,
    waitForTransactionReceipt,
} from "@wagmi/core";
import {
    contractTokenABI,
    contractToken,
    contractAddressABI,
    contractAddress,
} from "./ContractAbi"; // adjust paths
import "./ConnectWallet.css";
import { config } from "./main";

function ConnectWallet() {
    const [loading, setLoading] = useState(false)

    const shortenAddress = (addr) =>
        addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : "";
    return (
        <div className="cosmuno-wallet-container">
            <ConnectButton.Custom>
                {({
                    account,
                    chain,
                    openAccountModal,
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

                    if (!isReady) return null;

                    if (!isConnected) {
                        return (
                            <button
                                onClick={openConnectModal}
                                className="cosmuno-connect-btn"
                            >
                                Connect Wallet
                            </button>
                        );
                    }

                    if (chain.unsupported) {
                        return (
                            <button className="cosmuno-wrong-network-btn">
                                Wrong Network
                            </button>
                        );
                    }

                    return (
                        <div className="cosmuno-wallet-connected-container">
                            <button
                                onClick={openAccountModal}
                                className="cosmuno-account-btn"
                            >
                                {shortenAddress(account.address)}
                            </button>
                            {/* <button
                                onClick={() => handleDeposit(account.address, 54)} // Deposit 54 USDT
                                className="cosmuno-account-btn"
                                disabled={loading}
                            >
                                {loading ? "Processing..." : "Deposit"}
                            </button> */}
                        </div>
                    );
                }}
            </ConnectButton.Custom>
        </div>
    );
}

export default ConnectWallet;
