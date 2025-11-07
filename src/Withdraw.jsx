import React, { useEffect, useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { Link } from "react-router-dom";
import { BsCopy } from "react-icons/bs";
import FooterNav from "./component/FooterNav";
import { getdepositAddress, getProfile } from "./helper/apifunction";
import { useAccount } from "wagmi";
import AOS from "aos";
import "aos/dist/aos.css";
import toast from "react-hot-toast";

export default function Deposit() {
    const { address } = useAccount();
    const [user, setUser] = useState(null);
    const [selectedAmount, setSelectedAmount] = useState("");
    const [order_id, setOrderId] = useState(null);
    const [inputValue, setInputValue] = useState(null);
    const [error, setError] = useState("");
    const [userData, setUserData] = useState(null);
    const [withdrawRequest, setWithdrawRequest] = useState(null); // ✅ Withdraw request state

    // ✅ Initialize animation
    useEffect(() => {
        AOS.init({ duration: 600, easing: "ease-in-out", once: true });
    }, []);

    // ✅ Get Telegram user (if in Telegram)
    useEffect(() => {
        if (window.Telegram?.WebApp?.initDataUnsafe?.user) {
            setUser(window.Telegram.WebApp.initDataUnsafe.user);
        }
    }, []);

    // ✅ For now, test data (50$ balance)
    useEffect(() => {
        // Simulated API response
        const testData = {
            earning_balance: 30,
            spinearnBalance: 10,
            rankIncome: 10,
        };
        setUserData(testData);
    }, []);

    // ✅ Copy wallet address
    const handleCopy = () => {
        if (inputValue) {
            navigator.clipboard.writeText(inputValue);
            toast.success("Address copied!");
        }
    };

    // ✅ Handle amount input
    const handleAmountChange = (e) => {
        const value = e.target.value;
        setSelectedAmount(value);
        if (value < 10) {
            setError("Minimum withdraw amount is $10");
        } else if (value > 50) {
            setError("You don't have enough balance!");
        } else {
            setError("");
        }
    };

    // ✅ Withdraw balance calc (test data)
    const withdrawBalance = userData
        ? (userData.earning_balance + userData.spinearnBalance + userData.rankIncome).toFixed(2)
        : "0.00";

    // ✅ Proceed Withdraw (Mock request)
    const handleWithdraw = async () => {
        if (selectedAmount < 10) return toast.error("Minimum $10 required");
        if (selectedAmount > withdrawBalance) return toast.error("Insufficient balance");

        // simulate API request creation
        const mockRequest = {
            id: Date.now(),
            amount: selectedAmount,
            status: "Pending", // until admin confirms
            createdAt: new Date().toLocaleString(),
        };

        setWithdrawRequest(mockRequest);
        toast.loading("Withdraw request submitted... awaiting admin confirmation");

        // Simulate admin approval after 5 seconds
        setTimeout(() => {
            setWithdrawRequest((prev) => ({ ...prev, status: "Approved" }));
            toast.dismiss();
            toast.success("Withdraw Approved by Admin!");
        }, 5000);
    };

    return (
        <div className="page_container">
            <div className="inner_page_layout">
                {/* 🔙 Back Button */}
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

                {/* 💰 Withdraw Balance Card */}
                <div data-aos="zoom-in">
                    <div className="card mb-4 shadow-sm border-0 rounded-3 glass-card p-2 d-none">
                        <div className="card-body d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center gap-3">
                                <img src="/images/Withdraw.png" width="32px" alt="Withdraw" />
                                <div>
                                    <div className="text-lgray fs-13">Withdraw Balance</div>
                                    <div className="fw-bold fs-5 text-white">
                                        ${withdrawBalance}
                                    </div>
                                </div>
                            </div>
                            <span className="badge bg-gradient text-white px-3 py-2 rounded-pill fs-12">
                                Available
                            </span>
                        </div>
                    </div>
                </div>

                {/* 💸 Withdraw Input */}
                <div className="mb-3" data-aos="fade-up">
                    <label className="text-gray mb-2 fs-13">Enter Withdraw Amount</label>
                    <input
                        type="number"
                        className="form-control glass-input"
                        placeholder="Enter amount (min $10)"
                        value={selectedAmount}
                        onChange={handleAmountChange}
                        min={10}
                    />
                    {error && <small className="text-danger">{error}</small>}
                </div>
                <div className="text-center mt-4" data-aos="zoom-in">
                    <button
                        className="btn btn-gradient-3 px-5 py-2 rounded-pill fw-semibold d-none"
                        onClick={handleWithdraw}
                    >
                        Withdraw
                    </button>
                </div>
                {/* 📦 Withdraw Status */}
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
