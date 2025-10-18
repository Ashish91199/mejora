import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/UserTable.css";
import { apiUrl } from "../Config";
import { FaRegCopy } from "react-icons/fa";
import toast from "react-hot-toast";

const Deposithistory = () => {
    const [users, setUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const itemsPerPage = 10;
    const [copied, setCopied] = useState(null);

    const copyToClipboard = async (textToCopy, setCopy) => {
        try {
            // Navigator clipboard API (secure context only)
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(textToCopy);
                toast.success("Referral Copied");
                setCopied(textToCopy);
            } else {
                // Fallback: hidden textarea method
                const textArea = document.createElement("textarea");
                textArea.value = textToCopy;
                textArea.style.position = "absolute";
                textArea.style.left = "-999999px";
                document.body.prepend(textArea);
                textArea.select();

                document.execCommand("copy");
                toast.success("Referral Copied");
                setCopied(textToCopy);

                textArea.remove();
            }
        } catch (error) {
            console.error("Copy failed", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${apiUrl}/Users`, {
                    params: {
                        page: currentPage,
                        limit: itemsPerPage,
                        search: search.trim() || undefined,
                    },
                });

                setUsers(response?.data?.data?.users || []);
                setTotalUsers(response?.data?.data?.totalUsers || 0);
                setError(null);
                window.scrollTo({ top: 0, behavior: "smooth" });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [currentPage, search]);

    const handleSearch = (e) => {
        e.preventDefault();
        setCurrentPage(1);
    };

    const totalPages = Math.ceil(totalUsers / itemsPerPage);

    const paginate = (pageNumber) => {
        if (pageNumber !== "...") setCurrentPage(pageNumber);
    };

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };


    const generatePagination = (currentPage, totalPages) => {
        const delta = 1;
        const visiblePages = [];
        const finalPages = [];

        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 ||
                i === totalPages ||
                (i >= currentPage - delta && i <= currentPage + delta)
            ) {
                visiblePages.push(i);
            }
        }

        let prev = null;
        for (let page of visiblePages) {
            if (prev !== null) {
                if (page - prev === 2) {
                    finalPages.push(prev + 1);
                } else if (page - prev > 2) {
                    finalPages.push("...");
                }
            }
            finalPages.push(page);
            prev = page;
        }

        return finalPages;
    };

    return (
        <div className="table-container">
            <h2 className="table-title mb-3">
                <i className="fas fa-users"></i> Deposit History List
            </h2>

            {/* Search & Total Users */}
            <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
                <form
                    className="d-flex gap-2 align-items-center"
                    onSubmit={handleSearch}
                >
                    <input
                        type="text"
                        placeholder="Search by user..."
                        className="form-control"
                        style={{ maxWidth: "200px" }}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button className="btn btn-outline-primary" type="submit">
                        Search
                    </button>
                </form>

                <span className="text-muted">
                    Total Users: <strong>{totalUsers}</strong>
                </span>
            </div>

            {/* Table */}
            <div className="table-scroll">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Sr.No.</th>
                            <th>Username</th>
                            <th>User ID</th>
                            <th>Telegram ID</th>
                            <th>Deposit Amount</th>
                            <th>TransactionHash</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            Array.from({ length: itemsPerPage }).map((_, idx) => (
                                <tr key={idx}>
                                    <td colSpan="7" className="text-center">
                                        Loading...
                                    </td>
                                </tr>
                            ))
                        ) : users.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="text-center">
                                    No records found.
                                </td>
                            </tr>
                        ) : (
                            users.map((user, index) => (
                                <tr key={user?._id || index}>
                                    <td>{(currentPage - 1) * itemsPerPage + index + 1}.</td>

                                    {/* Username */}
                                    <td>{user?.username || "-"}</td>

                                    {/* User ID */}
                                    <td>{user?.user_id || "-"}</td>

                                    {/* Telegram ID */}
                                    <td>{user?.telegram_id || "N/A"}</td>

                                    {/* Parent / Referrer */}
                                    <td>{user?.referrer_id || "N/A"}</td>

                                    {/* Wallet Address with Copy Option */}
                                    <td>
                                        {user?.user_address ? (
                                            <>
                                                {`${user.user_address.slice(0, 6)}...${user.user_address.slice(-6)}`}{" "}
                                                <FaRegCopy
                                                    size={14}
                                                    style={{
                                                        cursor: "pointer",
                                                        color: copied === user.user_address ? "#28a745" : "#adb5bd",
                                                        transition: "color 0.2s ease",
                                                        marginLeft: "8px",
                                                    }}
                                                    onClick={() => copyToClipboard(user.user_address)}
                                                />
                                                {copied === user.user_address && (
                                                    <span
                                                        style={{
                                                            fontSize: "0.75rem",
                                                            color: "#28a745",
                                                            fontWeight: "500",
                                                            marginLeft: "8px",
                                                        }}
                                                    >
                                                        Copied!
                                                    </span>
                                                )}
                                            </>
                                        ) : (
                                            "-"
                                        )}
                                    </td>

                                    {/* Date */}
                                    <td>{formatDate(user?.createdAt)}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>


            {/* Pagination */}
            {totalPages > 1 && (
                <div className="pagination mt-3">
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <i className="fas fa-chevron-left"></i>
                    </button>

                    {generatePagination(currentPage, totalPages).map((page, index) => (
                        <button
                            key={index}
                            onClick={() => paginate(page)}
                            className={page === currentPage ? "active" : ""}
                            disabled={page === "..."}
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        <i className="fas fa-chevron-right"></i>
                    </button>
                </div>
            )}
        </div>
    );
};

export default Deposithistory;
