import React, { useEffect, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
import "./ConnectWallet.css";
import { contractAddress, contractAddressABI } from "./ContractAbi";
console.log("contractAddress", contractAddress);
console.log("contractAddressABI", contractAddressABI);

function ConnectWallet() {
    const { address } = useAccount();
    const [userExists, setUserExists] = useState(false);

    const checkUserExists = async (walletAddress) => {
        if (!walletAddress) return;

        try {
            // Create a provider directly from window.ethereum
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = new ethers.Contract(contractAddress, contractAddressABI, provider);

            const exists = await contract.isUserExists(walletAddress);
            setUserExists(exists);
        } catch (error) {
            console.error("Error checking user:", error);
        }
    };

    useEffect(() => {
        if (address) {
            checkUserExists(address);
        }
    }, [address]);

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

                if (!isReady) return null;

                if (!isConnected) {
                    return (
                        <button onClick={openConnectModal} className="cosmuno-connect-btn">
                            Connect Wallet
                        </button>
                    );
                }

                if (userExists) {
                    return (
                        <div className="cosmuno-wallet-connected-container">
                            <span>Wallet already registered!</span>
                        </div>
                    );
                }

                if (chain.unsupported) {
                    return (
                        <button onClick={openChainModal} className="cosmuno-wrong-network-btn">
                            Wrong Network
                        </button>
                    );
                }

                return (
                    <div className="cosmuno-wallet-connected-container">
                        <button onClick={openChainModal} className="cosmuno-network-btn">
                            {chain.hasIcon && chain.iconUrl && (
                                <img
                                    alt={chain.name ?? "Chain icon"}
                                    src={chain.iconUrl}
                                    className="cosmuno-chain-icon-img"
                                />
                            )}
                            {chain.name}
                        </button>

                        <button onClick={openAccountModal} className="cosmuno-account-btn">
                            {account.displayBalance && (
                                <span className="cosmuno-account-balance">{account.displayBalance}</span>
                            )}
                        </button>
                    </div>
                );
            }}
        </ConnectButton.Custom>
    );
}

export default ConnectWallet;
