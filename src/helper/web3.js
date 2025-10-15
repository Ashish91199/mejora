import {
    readContract,
    writeContract,
    waitForTransactionReceipt,
} from "@wagmi/core";

import { contractAddress, contractAddressABI, contractToken, contractTokenABI } from "../ContractAbi";
import { config } from "../main";
import toast from "react-hot-toast";


export async function registerUser(referralAddress, telegramId) {
    try {
        if (!referralAddress || !telegramId) {
            console.log("Missing referral or telegram ID");
            return false;
        }

        const res = await writeContract(config, {
            abi: contractAddressABI,
            address: contractAddress,
            functionName: "_registerUser",
            args: [referralAddress, telegramId]
        });

        const result = await waitForTransactionReceipt({ hash: res });
        return result
    } catch (err) {
        console.error("Web3 Registration Error:", err);
        return false;
    }
}


export async function isLoggedIn(userAddress) {
    try {
        const res = await readContract(config, {
            abi: contractAddressABI,
            address: contractAddress,
            functionName: "isUserExists",
            args: [userAddress]
        })
        return res;
    } catch (error) {
        console.log(error, "error in register");
        return false;
    }
}



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


export const handleDeposit = async (user_id, userAddress, depositAmount) => {
    try {
        const allowance = await checkAllowance(config, userAddress);
        console.log("Current allowance:", allowance);

        if (allowance < depositAmount) {
            const approvalToast = toast.loading("Approving tokens...");

            const approve = await approveToken(depositAmount);
            if (!approve) {
                toast.error("Failed to approve tokens!", { id: approvalToast });
                return;
            }

            toast.success("✅ Tokens approved!", { id: approvalToast });
        }

        // const depositToast = toast.loading(`Depositing ${depositAmount} USDT...`);

        const res = await writeContract(config, {
            abi: contractAddressABI,
            address: contractAddress,
            functionName: '_deposit',
            args: [user_id, (depositAmount * 1e18).toLocaleString("fullwide", { useGrouping: false })]
        });

        const result = await waitForTransactionReceipt({ hash: res });

        toast.success("✅ Deposit successful!";

        return result;

    } catch (err) {
        console.error(err);
        toast.error("❌ Deposit failed! Check console for details.");
    }
};
