import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FiUser, FiDollarSign, FiHash, FiCalendar } from "react-icons/fi";
import FooterNav from "./component/FooterNav";
import { getDepositHistory } from "./helper/apifunction"; // Make sure you have this function
import { formatNumber } from "./helper/Math";
import { Link } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";

function Deposithistory() {
    const [user, setUser] = useState(null);
    const [depositData, setDepositData] = useState([]);
    const [withdrawData, setWithdrawData] = useState([]);
    const [activeTab, setActiveTab] = useState("deposit"); // deposit or withdraw

    // Initialize AOS
    useEffect(() => {
        AOS.init({ duration: 600, easing: "ease-in-out", once: true });
    }, []);

    // Set Telegram user
    useEffect(() => {
        const tgUser = window?.Telegram?.WebApp?.initDataUnsafe?.user;
        if (tgUser) setUser(tgUser);
    }, []);

    // Fetch deposit and withdraw history
    useEffect(() => {
        if (!user?.id) return;

        const fetchDeposit = async () => {
            try {
                const res = await getDepositHistory(user.id);
                setDepositData(res?.data || []);
            } catch (err) {
                console.error("Error fetching deposit history:", err);
            }
        };

        const fetchWithdraw = async () => {
            try {
                const res = await getWithdrawHistory(user.id);
                setWithdrawData(res?.data || []);
            } catch (err) {
                console.error("Error fetching withdraw history:", err);
            }
        };

        fetchDeposit();
        fetchWithdraw();
    }, [user]);

    const totalDeposit = depositData.reduce(
        (acc, item) => acc + Number(item?.depositAmt || 0) / 1e18,
        0
    );

    return (
        <>
            <div className="page_container">
                <div className="inner_page_layout">
                    <div className="position-relative mb-5 py-1">
                        <div className="backButton">
                            <Link className="anchor_pointer text-white" to="/home">
                                <MdKeyboardArrowLeft className="fs-1" />
                            </Link>
                        </div>
                        <div className="mb-5 text-center">
                            <h4 className="mb-3">History</h4>
                        </div>

                        {/* Tabs */}
                        <div className="d-flex justify-content-center gap-3 mb-3">
                            <button
                                className={`tabbtn ${activeTab === "deposit" ? "active" : ""}`}
                                onClick={() => setActiveTab("deposit")}
                            >
                                Deposit History
                            </button>
                            <button
                                className={`tabbtn ${activeTab === "withdraw" ? "active" : ""}`}
                                onClick={() => setActiveTab("withdraw")}
                            >
                                Withdraw History
                            </button>
                        </div>

                        {/* Total Deposit (only for deposit tab) */}
                        {activeTab === "deposit" && (
                            <div className="card mb-2 d-none">
                                <div className="card-body d-flex align-items-center gap-3">
                                    <div className="circle_bg">
                                        <FiUser />
                                    </div>
                                    <div>
                                        <p className="mb-0">Total Deposit</p>
                                        <div className="text-gray">{formatNumber(totalDeposit.toFixed(2))}</div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Deposit Tab */}
                        {activeTab === "deposit" && (
                            <div className="dep-hist-holder-container">
                                {depositData.length > 0 ? (
                                    depositData.map((item, index) => (
                                        <div
                                            className="dep-hist-card mb-4"
                                            key={item?.transactionHash || index}
                                            data-aos="fade-up"
                                        >
                                            <div className="dep-hist-serial-badge">{index + 1}</div>
                                            <div className="dep-hist-card-body">
                                                {/* User ID */}
                                                <div className="dep-hist-card-item">
                                                    <div className="dep-hist-icon">
                                                        <FiUser />
                                                    </div>
                                                    <div>
                                                        <span className="dep-hist-label">User ID</span>
                                                        <br />
                                                        <span className="dep-hist-value">{item?.tuserId || "N/A"}</span>
                                                    </div>
                                                </div>

                                                {/* Deposit Amount */}
                                                <div className="dep-hist-card-item">
                                                    <div className="dep-hist-icon">
                                                        <FiDollarSign />
                                                    </div>
                                                    <div>
                                                        <span className="dep-hist-label">Deposit Amount</span>
                                                        <br />
                                                        <span className="dep-hist-value">
                                                            {(item?.depositAmt ? item.depositAmt / 1e18 : 0).toFixed(2)}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Transaction Hash */}
                                                <div className="dep-hist-card-item">
                                                    <div className="dep-hist-icon">
                                                        <FiHash />
                                                    </div>
                                                    <div className="dep-hist-tooltip">
                                                        <span className="dep-hist-label">Transaction Hash</span>
                                                        <br />
                                                        <span className="dep-hist-value dep-hist-text-mono">
                                                            {item.transactionHash
                                                                ? `${item.transactionHash.slice(0, 6)}...${item.transactionHash.slice(-4)}`
                                                                : "N/A"}
                                                            {item.transactionHash && (
                                                                <span className="dep-hist-tooltip-text">{item.transactionHash}</span>
                                                            )}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Date & Time */}
                                                <div className="dep-hist-card-item">
                                                    <div className="dep-hist-icon">
                                                        <FiCalendar />
                                                    </div>
                                                    <div>
                                                        <span className="dep-hist-label">Date & Time</span>
                                                        <br />
                                                        <span className="dep-hist-value">
                                                            {item.createdAt
                                                                ? `${new Date(item.createdAt).toLocaleDateString()} ${new Date(
                                                                    item.createdAt
                                                                ).toLocaleTimeString()}`
                                                                : "N/A"}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center text-gray">No deposit history available</p>
                                )}
                            </div>
                        )}

                        {/* Withdraw Tab */}
                        {activeTab === "withdraw" && (
                            <div className="dep-hist-holder-container">
                                {withdrawData.length > 0 ? (
                                    withdrawData.map((item, index) => (
                                        <div
                                            className="dep-hist-card mb-4"
                                            key={item?.transactionHash || index}
                                            data-aos="fade-up"
                                        >
                                            <div className="dep-hist-serial-badge">{index + 1}</div>
                                            <div className="dep-hist-card-body">
                                                <div className="dep-hist-card-item">
                                                    <div className="dep-hist-icon">
                                                        <FiDollarSign />
                                                    </div>
                                                    <div>
                                                        <span className="dep-hist-label">Withdraw Amount</span>
                                                        <br />
                                                        <span className="dep-hist-value">
                                                            {(item?.withdrawAmt ? item.withdrawAmt / 1e18 : 0).toFixed(2)}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="dep-hist-card-item">
                                                    <div className="dep-hist-icon">
                                                        <FiHash />
                                                    </div>
                                                    <div className="dep-hist-tooltip">
                                                        <span className="dep-hist-label">Transaction Hash</span>
                                                        <br />
                                                        <span className="dep-hist-value dep-hist-text-mono">
                                                            {item.transactionHash
                                                                ? `${item.transactionHash.slice(0, 6)}...${item.transactionHash.slice(-4)}`
                                                                : "N/A"}
                                                            {item.transactionHash && (
                                                                <span className="dep-hist-tooltip-text">{item.transactionHash}</span>
                                                            )}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="dep-hist-card-item">
                                                    <div className="dep-hist-icon">
                                                        <FiCalendar />
                                                    </div>
                                                    <div>
                                                        <span className="dep-hist-label">Date & Time</span>
                                                        <br />
                                                        <span className="dep-hist-value">
                                                            {item.createdAt
                                                                ? `${new Date(item.createdAt).toLocaleDateString()} ${new Date(
                                                                    item.createdAt
                                                                ).toLocaleTimeString()}`
                                                                : "N/A"}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center text-gray">No withdraw history available</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <FooterNav />
        </>
    );
}

export default Deposithistory;
