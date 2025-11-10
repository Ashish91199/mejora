import React, { useEffect, useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { Link } from "react-router-dom";
import { BsCopy } from "react-icons/bs";
import FooterNav from "./component/FooterNav";
import { getdepositAddress, getProfile, withdrwaRewardIncome } from "./helper/apifunction";
import { useAccount } from "wagmi";
import AOS from "aos";
import "aos/dist/aos.css";
import toast from "react-hot-toast";
import { withDrawRewardToken } from "./helper/web3";

export default function Deposit() {
    const { address } = useAccount();
    const [user, setUser] = useState(null);
    const [selectedAmount, setSelectedAmount] = useState("");
    const [error, setError] = useState("");
    const [userData, setUserData] = useState(null);
    const [withdrawRequest, setWithdrawRequest] = useState(null);
    const [refreshreward, setRewardRefresh] = useState(false);
    const [loading, setLoading] = useState(false);

    // Initialize animation
    useEffect(() => {
        AOS.init({ duration: 600, easing: "ease-in-out", once: true });
    }, []);

    // Get Telegram user (if in Telegram)
    useEffect(() => {
        if (window.Telegram?.WebApp?.initDataUnsafe?.user) {
            setUser(window.Telegram.WebApp.initDataUnsafe.user);
        }
    }, []);

    // Fetch user profile when address or refreshreward changes
    useEffect(() => {
        if (address) {
            const getUser = async () => {
                try {
                    const res = await getProfile(address);
                    setUserData(res?.data);
                } catch (error) {
                    console.error("Error during signup:", error);
                }
            };
            getUser();
        }
    }, [address, refreshreward]); // Added refreshreward as dependency

    async function claimReward() {
        if (loading) return; // prevent re-click while loading
        setLoading(true);

        try {
            if (userData.earning_balance < 10) {
                toast.error("Minimum withdrawal is $10");
                setLoading(false);
                return;
            }

            const fData = {
                amount: Number(selectedAmount),
                walletAddress: address,
            };

            const res = await withdrwaRewardIncome(fData);

            if (res?.success) {
                await withDrawRewardToken(
                    res.user_id,
                    res.vrsSign.amount,
                    res.vrsSign.signature.v,
                    res.vrsSign.signature.r,
                    res.vrsSign.signature.s,
                    setRewardRefresh,
                    setLoading,
                    res.deadline
                );
            } else {
                toast.error(res?.message || "Failed to claim reward");
                setLoading(false);
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
            setLoading(false);
        }
    }

    return (
        <div className="page_container">
            <div className="inner_page_layout">
                {/* Back Button */}
                <div className="position-relative mb-4 py-1">
                    <div
                        className="backButton mb-3"
                        style={{
                            position: "relative",
                            zIndex: 10000,
                        }}
                    >
                        <Link className="anchor_pointer text-white" to="/wallet">
                            <MdKeyboardArrowLeft className="fs-1" />
                        </Link>
                    </div>
                    <div className="text-center" data-aos="fade-up">
                        <h4 className="fw-bold text-gradient">Withdraw Funds</h4>
                        <p className="text-gray fs-12 mb-0">
                            Securely withdraw your available balance
                        </p>
                    </div>
                </div>

                {/* Withdraw Balance Card */}
                <div data-aos="zoom-in">
                    <div className="card mb-4 shadow-sm border-0 rounded-3 glass-card p-2 ">
                        <div className="card-body d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center gap-3">
                                <img src="/images/Withdraw.png" width="32px" alt="Withdraw" />
                                <div>
                                    <div className="text-lgray fs-13">Withdraw Balance</div>
                                    <div className="fw-bold fs-5 text-white">
                                        ${userData?.earning_balance?.toFixed(2) || "0.00"}
                                    </div>
                                </div>
                            </div>
                            <span className="badge bg-gradient text-white px-3 py-2 rounded-pill fs-12">
                                Available
                            </span>
                        </div>
                    </div>
                </div>

                {/* Withdraw Input */}
                <div className="mb-3" data-aos="fade-up">
                    <label className="text-gray mb-2 fs-13">Enter Withdraw Amount</label>
                    <input
                        type="number"
                        className="form-control glass-input"
                        placeholder="Enter amount (min $10)"
                        value={selectedAmount}
                        onChange={(e) => {
                            setSelectedAmount(e.target.value);
                            setError("");
                        }}
                        min={10}
                    />
                    {error && <small className="text-danger">{error}</small>}
                </div>
                <div className="text-center mt-4" data-aos="zoom-in">
                    <button
                        className="btn btn-gradient-3 px-5 py-2 rounded-pill fw-semibold"
                        onClick={claimReward}
                        disabled={loading} // Disable button while loading
                    >
                        {loading ? (
                            <div className="spinner-border spinner-border-sm text-light" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        ) : (
                            "Withdraw"
                        )}
                    </button>
                </div>
                {/* Withdraw Status */}
                {withdrawRequest && (
                    <div className="card mt-3 shadow-sm border-0 glass-card p-3" data-aos="fade-up">
                        <h6 className="text-white fw-semibold mb-2">Withdraw Status</h6>
                        <div className="d-flex justify-content-between text-white fs-13">
                            <span>Amount:</span>
                            <strong>${withdrawRequest.amount}</strong>
                        </div>
                        <div className="d-flex justify-content-between text-white fs-13">
                            <span>Status:</span>
                            <strong
                                className={
                                    withdrawRequest.status === "Pending"
                                        ? "text-warning"
                                        : "text-success"
                                }
                            >
                                {withdrawRequest.status}
                            </strong>
                        </div>
                        <div className="d-flex justify-content-between text-white fs-13">
                            <span>Request Time:</span>
                            <strong>{withdrawRequest.createdAt}</strong>
                        </div>
                    </div>
                )}
            </div>
            <FooterNav />
        </div>
    );
}