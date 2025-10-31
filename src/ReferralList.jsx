// ReferralList.jsx
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { url } from "./helper/apifunction";
import { useAccount } from "wagmi";

const ReferralList = () => {
  const { address } = useAccount();
  const [rawTree, setRawTree] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState(1); // default Level 1
  const [loading, setLoading] = useState(false);

  // ---------- FETCH ----------
  const fetchReferrals = async () => {
    if (!address) return;
    setLoading(true);
    try {
      const res = await axios.get(`${url}/referrals/${address}`);
      console.log("API tree:", res.data.data);          // DEBUG
      setRawTree(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReferrals();
  }, [address]);

  // ---------- FLATTEN ----------
  const flatList = useMemo(() => {
    const flatten = (nodes, lvl = 1) => {
      if (!Array.isArray(nodes)) return [];
      return nodes.flatMap((n) => {
        const item = {
          _id: n._id,
          username: n.username || "Wallet User",
          user_id: n.user_id,
          deposit_balance: n.deposit_balance,
          createdAt: n.createdAt,
          level: lvl,
        };
        const subs = Array.isArray(n.children) ? flatten(n.children, lvl + 1) : [];
        return [item, ...subs];
      });
    };
    const result = flatten(rawTree);
    console.log("Flattened:", result);                 // DEBUG
    return result;
  }, [rawTree]);

  // ---------- FILTER ----------
  const displayed = useMemo(() => {
    return selectedLevel === "all"
      ? flatList
      : flatList.filter((u) => u.level === Number(selectedLevel));
  }, [flatList, selectedLevel]);

  // ---------- HELPERS ----------
  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const levelCounts = useMemo(() => {
    const counts = {};
    for (let i = 1; i <= 6; i++) {
      counts[i] = flatList.filter((u) => u.level === i).length;
    }
    return counts;
  }, [flatList]);

  return (
    <div className="bg-black min-vh-100 p-3">
      <h6 className="dep-hist-title pt-3 pb-4">List of Your Friends</h6>

      {/* ---------- SELECT ---------- */}
      <div className="mb-4">
        <label className="text-white me-2">Filter by Level:</label>
        <select
          className="form-select d-inline-block w-auto"
          style={{ backgroundColor: "#222", color: "#fff", borderColor: "#f3ba2f" }}
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
        >
          <option value="all">All Levels</option>
          {[1, 2, 3, 4, 5, 6].map((lvl) => (
            <option key={lvl} value={lvl}>
              Level {lvl} ({levelCounts[lvl]})
            </option>
          ))}
        </select>
      </div>

      {/* ---------- COUNT ---------- */}
      <div className="text-white-50 fs-12 mb-3">
        Showing {displayed.length} user(s) on{" "}
        {selectedLevel === "all" ? "all levels" : `Level ${selectedLevel}`}
      </div>

      {/* ---------- LIST ---------- */}
      {loading ? (
        <div className="text-center text-white-50 fs-12 py-4">Loading...</div>
      ) : displayed.length > 0 ? (
        <div className="d-flex flex-wrap gap-3 justify-content-start">
          {displayed.map((friend, idx) => (
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
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: "#f3ba2f",
                    color: "#000",
                    fontWeight: "bold",
                  }}
                >
                  {friend.username.charAt(0).toUpperCase()}
                </div>
              </div>

              <div className="flex-grow-1">
                <div className="fw-bold fs-13">{friend.username}</div>
                <div className="fs-12">ID: {friend.user_id}</div>
                <div className="fs-12">
                  Deposit: $ {(friend.deposit_balance / 1e18).toFixed(4)}
                </div>
                <div className="fs-11">Joined: {formatDate(friend.createdAt)}</div>
                <div className="fs-11 text-warning">Level: {friend.level}</div>
              </div>

              <div className="ms-auto fs-11">#{idx + 1}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-white-50 fs-12 py-4">
          No users on {selectedLevel === "all" ? "any level" : `Level ${selectedLevel}`} yet.
        </div>
      )}
    </div>
  );
};

export default ReferralList;