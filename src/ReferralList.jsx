import React, { useEffect, useState } from "react";
import axios from "axios";
import { url } from "./helper/apifunction";

const ReferralList = () => {
    const [user, setUser] = useState(null);
    const [levelData, setLevelData] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (window.Telegram?.WebApp?.initDataUnsafe?.user) {
            setUser(window.Telegram?.WebApp?.initDataUnsafe?.user);
        }
    }, [window.Telegram?.WebApp?.initDataUnsafe?.user]);

    const fetchReferrals = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${url}/referrals/${user?.id}`);
            setLevelData(res.data.data || []);
        } catch (err) {
            console.error("Error fetching referrals:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) fetchReferrals();
    }, [user]);

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    return (
        <div className="bg-black min-vh-100 p-3">
            <h6 className="dep-hist-title pt-3 pb-4">
                List of Your Friends
            </h6>

            {loading ? (
                <div className="text-center text-white-50 fs-12 py-4">Loading...</div>
            ) : levelData && levelData.length > 0 ? (
                <div className="d-flex flex-wrap gap-3 justify-content-start">
                    {levelData.map((friend, index) => (
                        <div
                            key={friend._id}
                            className="rounded-4 p-3 d-flex align-items-center"
                            style={{
                                flex: "1 1 calc(50% - 10px)",
                                minWidth: "260px",
                                backgroundColor: "#000",
                                border: "2px solid #f3ba2f",
                                color: "#fff",
                            }}
                        >
                            <div className="me-3">
                                <div className="rounded-circle d-flex align-items-center justify-content-center"
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        backgroundColor: "#f3ba2f",
                                        color: "#000",
                                        fontWeight: "bold"
                                    }}>
                                    {friend.username.charAt(0).toUpperCase()}
                                </div>
                            </div>

                            <div>
                                <div className="fw-bold fs-13">{friend.username}</div>
                                <div className="fs-12">ID: {friend.user_id}</div>
                                <div className="fs-11">
                                    Joined: {formatDate(friend.createdAt)}
                                </div>
                            </div>

                            <div className="ms-auto fs-11">#{index + 1}</div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center text-white-50 fs-12 py-4">
                    No friends invited yet.
                </div>
            )}
        </div>
    );
};

export default ReferralList;
