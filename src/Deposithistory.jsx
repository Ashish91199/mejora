import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import { FaHandHoldingDroplet } from "react-icons/fa6";
import { AiOutlineSwap } from "react-icons/ai";
import { SiRocket } from "react-icons/si";
import { MdOutlineToken } from "react-icons/md";
import { Link } from "react-router-dom";
import FooterNav from "./component/FooterNav";
import { getDepositHistory } from "./helper/apifunction";
import { formatNumber } from "./helper/Math";
import { FiUser, FiDollarSign, FiHash, FiCalendar } from "react-icons/fi";

function Deposithistory() {
    const [user, setUser] = useState(null);
    const [data, setUserData] = useState(null);
    console.log(data, "123456789");
    const [rank_history, setRankHistory] = useState(null);

    // Initialize AOS on component mount
    useEffect(() => {
        AOS.init({
            duration: 600,
            easing: "ease-in-out",
            once: true,
        });
    }, []);

    useEffect(() => {
        if (window.Telegram?.WebApp?.initDataUnsafe?.user) {
            setUser(window.Telegram?.WebApp?.initDataUnsafe?.user);
        }
    }, [window.Telegram?.WebApp?.initDataUnsafe?.user]);

    useEffect(() => {
        const Rank = async () => {
            try {
                const res = await getDepositHistory(user?.id);
                console.log(res, "res1111");
                setUserData(res?.data);
                setRankHistory(res?.result);
            } catch (error) {
                console.error("Error during signup:", error);
            }
        };

        if (user) Rank();
    }, [user]);

    return (
        <>
            <div className="page_container">
                <div className="inner_page_layout">
                    <div>
                        <div className="mb-3 text-center">
                            <h4 className="mb-1">Deposit History</h4>
                        </div>
                        <div className="card mb-2">
                            <div className="card-body">
                                <div className="d-flex gap-2 justify-content-between align-items-center">
                                    <div className="d-flex gap-3 align-items-center">
                                        <div className="circle_bg">{data?.first_name?.slice(0, 2).toUpperCase()}</div>
                                        <div className="">
                                            <p className="mb-0">Total Deposit</p>
                                            <div className="text-gray">{data?.depositAmt} 0</div>
                                        </div>
                                    </div>
                                    <div>#{data?.rank}</div>
                                </div>
                            </div>
                        </div>

                        <div className="dep-hist-holder-container">
                            <div className="dep-hist-title pt-3 pb-4">{formatNumber(data?.holder)} Deposit History</div>

                            {data && data.length > 0 ? (
                                data.map((item, index) => (
                                    <div
                                        className="dep-hist-card mb-4"
                                        key={item?.username || item?.first_name}
                                        data-aos="fade-up"
                                    >
                                        <div className="dep-hist-serial-badge">{index + 1}</div>
                                        <div className="dep-hist-card-body">
                                            <div className="dep-hist-card-content">
                                                <div className="dep-hist-card-item">
                                                    <div className="dep-hist-icon"><FiUser /></div>
                                                    <div>
                                                        <span className="dep-hist-label">User ID</span>
                                                        <br />
                                                        <span className="dep-hist-value">{item?.tuserId || "N/A"}</span>
                                                    </div>
                                                </div>
                                                <div className="dep-hist-card-item">
                                                    <div className="dep-hist-icon"><FiDollarSign /></div>
                                                    <div>
                                                        <span className="dep-hist-label">Deposit Amount</span>
                                                        <br />
                                                        <span className="dep-hist-value">{(item?.depositAmt / 1e18).toFixed(4)}</span>
                                                    </div>
                                                </div>
                                                <div className="dep-hist-card-item">
                                                    <div className="dep-hist-icon"><FiHash /></div>
                                                    <div className="dep-hist-tooltip">
                                                        <span className="dep-hist-label">Transaction Hash</span>
                                                        <br />
                                                        <span className="dep-hist-value dep-hist-text-mono">
                                                            {item?.transactionHash
                                                                ? `${item.transactionHash.slice(0, 6)}...${item.transactionHash.slice(-4)}`
                                                                : "N/A"}
                                                            {item?.transactionHash && (
                                                                <span className="dep-hist-tooltip-text">{item.transactionHash}</span>
                                                            )}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="dep-hist-card-item">
                                                    <div className="dep-hist-icon"><FiCalendar /></div>
                                                    <div>
                                                        <span className="dep-hist-label">Date & Time</span>
                                                        <br />
                                                        <span className="dep-hist-value">
                                                            {item?.createdAt
                                                                ? `${new Date(item.createdAt).toLocaleDateString()} ${new Date(
                                                                    item.createdAt
                                                                ).toLocaleTimeString()}`
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
                                        <p className="dep-hist-text-gray mb-0">No deposit history available</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <FooterNav />
        </>
    );
}

export default Deposithistory;