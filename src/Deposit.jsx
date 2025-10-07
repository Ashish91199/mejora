import React, { useEffect, useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { Link } from "react-router-dom";
import { BsCheck, BsCopy } from "react-icons/bs";
import FooterNav from "./component/FooterNav";
import { getdepositAddress } from "./helper/apifunction";
import ConnectWallet from "./Connectwallet";

export default function Deposit() {
  const [user, setUser] = useState(null);
  const [selectedAmount, setSelectedAmount] = useState(54); // default amount
  const [order_id, setOrderId] = useState(null);
  const [inputValue, setInputValue] = useState(null);

  // Dummy deposit history data
  const [depositHistory, setDepositHistory] = useState([
    { id: 1, amount: 54, status: "Completed", date: "2025-10-07", txId: "0x12345ABC" },

  ]);

  // Set Telegram WebApp user
  useEffect(() => {
    if (window.Telegram?.WebApp?.initDataUnsafe?.user) {
      setUser(window.Telegram?.WebApp?.initDataUnsafe?.user);
    }
  }, [window.Telegram?.WebApp?.initDataUnsafe?.user]);

  // Fetch deposit address (always BEP20)
  useEffect(() => {
    if (user && selectedAmount > 0) {
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

  const handleCopy = (value) => {
    if (value) navigator.clipboard.writeText(value);
  };

  return (
    <div>
      <div className="page_container">
        <div className="inner_page_layout">
          {/* Header */}
          <div className="position-relative mb-5 py-1">
            <div className="backButton">
              <Link className="anchor_pointer text-white" to="/wallet">
                <MdKeyboardArrowLeft className="fs-1" />
              </Link>
            </div>
            <div className="text-center">
              <h4>Deposit</h4>
            </div>
          </div>

          {/* Chain label (always BEP20) */}
          <div className="col-12 mb-3 mb-2">
            <div className="d-flex gap-2">
              <span className="btn btn-sm btn-darker d-flex align-items-center orange_bg">
                BEP 20 <BsCheck className="ms-1" />
              </span>
            </div>
          </div>

          {/* Amount input */}
          <div className="col-12 mb-3 mb-2">
            <label className="text-gray mb-2">Amount</label>
            <div className="input-group">
              <span className="input-group-text">$</span>
              <input
                type="number"
                className="form-control"
                placeholder="Amount"
                value={selectedAmount}
                readOnly
              />
            </div>
          </div>

          {/* Connect Wallet button */}
          <div className="col-6 mb-3 mb-2">
            <ConnectWallet />
          </div>

          {/* Deposit Address & Copy */}
          {inputValue && (
            <div className="col-12 mb-3 mb-2">
              <label className="text-gray mb-2">Deposit Address</label>
              <div className="d-flex align-items-center gap-2">
                <input type="text" className="form-control" value={inputValue} readOnly />
                <button className="btn btn-darker" onClick={() => handleCopy(inputValue)}>
                  <BsCopy />
                </button>
              </div>
            </div>
          )}

          {/* 3D-Style Deposit History Table */}
          <div className="col-12 mt-4">
            <h5 className="mb-3 text-white">Deposit History</h5>
            <div className="d-flex flex-column gap-3">
              {depositHistory.map((item, index) => (
                <div
                  key={item.id}
                  className="deposit-card p-3 d-flex justify-content-between align-items-center shadow-lg"
                >
                  <div className="d-flex gap-3 align-items-center">
                    <span className="text-white fs-5">{index + 1}.</span>
                    <div>
                      <div className="text-white">Amount: ${item.amount}</div>
                      <div
                        className={`status-badge ${item.status === "Completed" ? "completed" : "pending"
                          }`}
                      >
                        {item.status}
                      </div>
                    </div>
                  </div>
                  <div className="d-flex gap-3 align-items-center">
                    <div className="text-white">Date: {item.date}</div>
                    <input
                      type="text"
                      value={item.txId}
                      readOnly
                      className="form-control form-control-sm text-center tx-input"
                    />
                    <button className="btn btn-copy" onClick={() => handleCopy(item.txId)}>
                      <BsCopy />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <FooterNav />

    </div>
  );
}
