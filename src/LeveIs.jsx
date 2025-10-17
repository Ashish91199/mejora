import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FiUser, FiDollarSign, FiHash, FiCalendar } from "react-icons/fi";
import FooterNav from "./component/FooterNav";
import { getLevelIncomeHistory } from "./helper/apifunction";

function LevelIncomeHistory() {
    const [user, setUser] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        AOS.init({ duration: 600, easing: "ease-in-out", once: true });
    }, []);

    useEffect(() => {
        if (window.Telegram?.WebApp?.initDataUnsafe?.user) {
            setUser(window.Telegram.WebApp.initDataUnsafe.user);
        }
    }, [window.Telegram?.WebApp?.initDataUnsafe?.user]);

    useEffect(() => {
        const fetchLevelIncome = async () => {
            try {
                const res = await getLevelIncomeHistory(user?.id);
                setData(res?.data || []);
            } catch (error) {
                console.error("Error fetching level income:", error);
            }
        };

        if (user) fetchLevelIncome();
    }, [user]);

    return (
        <>
            <div className="page_container">
                <div className="inner_page_layout">
                    <h4 className="text-center mb-3">Level Income History</h4>

                    <div className="dep-hist-holder-container">
                        <div className="dep-hist-title pt-3 pb-4">Your Level Income ({data?.length})</div>

                        {data.length > 0 ? (
                            data.map((item, index) => (
                                <div className="dep-hist-card mb-4" key={index} data-aos="fade-up">
                                    <div className="dep-hist-serial-badge">{index + 1}</div>
                                    <div className="dep-hist-card-body">
                                        <div className="dep-hist-card-content">
                                            <div className="dep-hist-card-item">
                                                <div className="dep-hist-icon"><FiUser /></div>
                                                <div>
                                                    <span className="dep-hist-label">From User</span><br />
                                                    <span className="dep-hist-value">{item?.fromUserId || "N/A"}</span>
                                                </div>
                                            </div>

                                            <div className="dep-hist-card-item">
                                                <div className="dep-hist-icon"><FiDollarSign /></div>
                                                <div>
                                                    <span className="dep-hist-label">Amount</span><br />
                                                    <span className="dep-hist-value">{(item?.amount / 1e18).toFixed(4)}</span>
                                                </div>
                                            </div>

                                            <div className="dep-hist-card-item">
                                                <div className="dep-hist-icon"><FiHash /></div>
                                                <div>
                                                    <span className="dep-hist-label">Level</span><br />
                                                    <span className="dep-hist-value">Level {item?.level || "N/A"}</span>
                                                </div>
                                            </div>

                                            <div className="dep-hist-card-item">
                                                <div className="dep-hist-icon"><FiCalendar /></div>
                                                <div>
                                                    <span className="dep-hist-label">Date</span><br />
                                                    <span className="dep-hist-value">
                                                        {item?.createdAt
                                                            ? `${new Date(item.createdAt).toLocaleDateString()} ${new Date(item.createdAt).toLocaleTimeString()}`
                                                            : "N/A"}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="dep-hist-card">
                                <div className="dep-hist-card-body dep-hist-empty-state">
                                    <p className="dep-hist-text-gray mb-0">No level income history available</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <FooterNav />
        </>
    );
}

export default LevelIncomeHistory;
