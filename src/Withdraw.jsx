import React, { useEffect, useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { Link } from "react-router-dom";
import { BsCopy } from "react-icons/bs";
import FooterNav from "./component/FooterNav";
import { getdepositAddress, getProfile } from "./helper/apifunction";
import { useAccount } from "wagmi";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Deposit() {
    const { address } = useAccount();
    const [user, setUser] = useState(null);
    const [selectedAmount, setSelectedAmount] = useState("");
    const [order_id, setOrderId] = useState(null);
    const [inputValue, setInputValue] = useState(null);
    const [error, setError] = useState("");
    const [userData, setUserData] = useState(null);

    // ✅ AOS animation init
    useEffect(() => {
        AOS.init({ duration: 600, easing: "ease-in-out", once: true });
    }, []);

    // ✅ Telegram WebApp user
    useEffect(() => {
        if (window.Telegram?.WebApp?.initDataUnsafe?.user) {
            setUser(window.Telegram?.WebApp?.initDataUnsafe?.user);
        }
    }, [window.Telegram?.WebApp?.initDataUnsafe?.user]);

    // ✅ Fetch user withdraw balance
    useEffect(() => {
        if (address) {
            const fetchUserData = async () => {
                try {
                    const res = await getProfile(address);
                    if (res?.data) {
                        setUserData(res.data);
                    }
                } catch (err) {
                    console.error("Error fetching withdraw balance:", err);
                }
            };
            fetchUserData();
        }
    }, [address]);

    // ✅ Fetch deposit address (for Binance)
    useEffect(() => {
        if (user && selectedAmount >= 10) {
            const getAddress = async () => {
                const res = await getdepositAddress(user?.id, "binance", selectedAmount, order_id);
                if (res.status === 200 && !order_id) {
                    setInputValue(res?.data?.address);
                    setOrderId(res?.data?.order_id);
                }
            };
            getAddress();
        }
    }, [selectedAmount, user]);

    // ✅ Copy wallet address
    const handleCopy = () => {
        if (inputValue) navigator.clipboard.writeText(inputValue);
    };

    // ✅ Handle amount input
    const handleAmountChange = (e) => {
        const value = e.target.value;
        setSelectedAmount(value);
        if (value < 10) {
            setError("Minimum withdrawal amount is $10");
            setInputValue(null);
        } else {
            setError("");
        }
    };

    // ✅ Withdraw balance calc
    const withdrawBalance = userData
        ? (userData.earning_balance + userData.spinearnBalance + userData.rankIncome).toFixed(2)
        : "0.00";

    return (
        <div className="page_container">
            <div className="inner_page_layout">
                {/* 🔙 Back Button */}
                <div className="position-relative mb-4 py-1">
                    <div
                        className="backButton mb-3"
                        style={{
                            position: "relative",
                            zIndex: 10000,  // ✅ fix click issue
                        }}
                    >
                        <Link className="anchor_pointer text-white" to="/wallet">
                            <MdKeyboardArrowLeft className="fs-1" />
                        </Link>
                    </div>
                    <div className="text-center" data-aos="fade-up">
                        <h4 className="fw-bold text-gradient">Withdraw Funds</h4>
                        <p className="text-gray fs-12 mb-0">Securely withdraw your available balance</p>
                    </div>
                </div>

                {/* 💰 Withdraw Balance Card */}
                <div data-aos="zoom-in">
                    <div className="card mb-4 shadow-sm border-0 rounded-3 glass-card p-2">
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

                {/* 🔗 Deposit / Withdraw Address */}
                {inputValue && (
                    <div className="mb-4" data-aos="fade-up">
                        <label className="text-gray mb-2 fs-13">Your Wallet Address</label>
                        <div className="d-flex align-items-center gap-2">
                            <input
                                type="text"
                                className="form-control glass-input"
                                value={inputValue}
                                readOnly
                            />
                            <button className="btn btn-gradient-2 rounded-circle" onClick={handleCopy}>
                                <BsCopy />
                            </button>
                        </div>
                    </div>
                )}

                {/* 🔘 Withdraw Button */}
                <div className="text-center mt-4" data-aos="zoom-in">
                    <button className="btn btn-gradient-3 px-5 py-2 rounded-pill fw-semibold">
                        Proceed Withdraw
                    </button>
                </div>
            </div>
            <FooterNav />
        </div>
    );
}
