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
    const [loading, setLoading] = useState(false);

    const shortenAddress = (addr) =>
        addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : "";

    // Check token allowance

    async function checkAllowance(userAddress) {
        try {
            const result = await readContract(config, {
                abi: contractTokenABI,
                address: contractToken,
                functionName: "allowance",
                args: [userAddress, contractAddress], // use correct variable
            });
            console.log({ allowance: result });
            return Number(result) / 1e18; // convert wei to token amount
        } catch (err) {
            console.error("Error checking allowance:", err);
            return 0;
        }
    }

    async function approveToken(amt) {
        try {
            const result = await writeContract(config, {
                abi: contractTokenABI,
                address: contractToken,
                functionName: "approve",
                args: [
                    contractAddress,
                    (amt * 1e18).toLocaleString("fullwide", { useGrouping: false }),
                ],
            });
            const res = await waitForTransactionReceipt(config, { hash: result });
            if (res?.status === "success") {
                return true;
            }
            return false;
        } catch (error) {
            return false;
        }
    }
    // Handle deposit flow
    const handleDeposit = async (userAddress, depositAmount) => {
        setLoading(true);
        try {
            const allowance = await checkAllowance(config, userAddress); // pass config
            console.log("Current allowance:", allowance);

            if (allowance < depositAmount) {
                console.log("Approving tokens...");
                const approve = await approveToken(depositAmount);
                if (!approve) {
                    alert("Failed to Approve!");
                    return;
                }
                console.log("Tokens approved!");
            }

            console.log(`Depositing ${depositAmount} USDT...`);
            const res = await writeContract(config, {
                abi: contractAddressABI,
                address: contractAddress,
                functionName: 'deposit',
                args: []
            })
            alert("Deposit successful!");
        } catch (err) {
            console.error(err);
            alert("Deposit failed, see console for details.");
        }
        setLoading(false);
    };

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
                            <button
                                onClick={() => handleDeposit(account.address, 10)} // Deposit 10 USDT
                                className="cosmuno-account-btn"
                                disabled={loading}
                            >
                                {loading ? "Processing..." : "Deposit"}
                            </button>
                        </div>
                    );
                }}
            </ConnectButton.Custom>
        </div>
    );
}

export default ConnectWallet;
