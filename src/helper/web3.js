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
        console.log({ referralAddress, telegramId })
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
        if (result.status === "success") {
            return true
        }
        return false
    } catch (err) {
        console.log(err)
        console.error("Web3 Registration Error:", err);
        return false;
    }
}


export async function isLoggedIn(userAddress) {
    console.log("login userAddress", userAddress)
    try {
        const res = await readContract(config, {
            abi: contractAddressABI,
            address: contractAddress,
            functionName: "isUserExists",
            args: [userAddress]
        })
        const hash = await waitForTransactionReceipt(config, {
            hash: res
        });
        if (hash.status === "success") {
            return true
        }
        return false;
    } catch (error) {
        console.log(error, "error in login");
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
        console.log(result, "dffddfdf");
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
    console.log({ user_id, userAddress, depositAmount })
    try {
        const allowance = await checkAllowance(userAddress);
        console.log("Current allowance:", allowance);

        if (allowance < depositAmount) {
            const approvalToast = toast.loading("Approving tokens...");

            const approve = await approveToken(depositAmount);
            if (!approve) {
                toast.dismiss(approvalToast);
                toast.error("Failed to approve tokens!");
                return false;
            }
            toast.dismiss(approvalToast);
            toast.success("✅ Tokens approved!");
        }

        const depositToast = toast.loading(`Depositing ${depositAmount} USDT...`);

        const res = await writeContract(config, {
            abi: contractAddressABI,
            address: contractAddress,
            functionName: '_deposit',
            args: [user_id, (depositAmount * 1e18).toLocaleString("fullwide", { useGrouping: false })]
        });
        // console.log("res 12345", res);
        const result = await waitForTransactionReceipt(config, { hash: res });
        // console.log("result true", result);
        if (result.status === "success") {
            toast.dismiss(depositToast);
            toast.success("✅ Deposit successful!");
            return true;
        }
        toast.dismiss(depositToast);
        toast.error("Deposit Failed!");
        return false;

    } catch (err) {
        console.error(err, "error");
        toast.error(" Deposit Failed!");
        setTimeout(() => toast.dismiss(), 2000);  // ✅ यह line error के बाद
    }
};
