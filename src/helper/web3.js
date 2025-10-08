import {
    readContract,
    writeContract,
    waitForTransactionReceipt,
} from "@wagmi/core";
import { config } from "./main";
import { contractAddress, contractAddressABI, contractToken, contractTokenABI } from "../ContractAbi";

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
            args: ["MEJ5698963",]
        })
        alert("Deposit successful!");
    } catch (err) {
        console.error(err);
        alert("Deposit failed, see console for details.");
    }
    setLoading(false);
};