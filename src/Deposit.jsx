import React, { useEffect, useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { Link } from "react-router-dom";
import { BsCheck, BsCopy } from "react-icons/bs";
import FooterNav from "./component/FooterNav";
import { getdepositAddress } from "./helper/apifunction";
import ConnectWallet from "./Connectwallet";

export default function Deposit() {
  const [user, setUser] = useState(null);
  const [selectedAmount, setSelectedAmount] = useState("");
  const [order_id, setOrderId] = useState(null);
  const [inputValue, setInputValue] = useState(null);

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

  const handleCopy = () => {
    if (inputValue) {
      navigator.clipboard.writeText(inputValue);
    }
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
            <label className="text-gray mb-2">Enter Amount</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter Amount"
              value={selectedAmount}
              onChange={(e) => setSelectedAmount(e.target.value)}
            />
          </div>

          {/* Connect Wallet button (placeholder) */}
          <div className="col-6 mb-3 mb-2">
            <ConnectWallet />
          </div>

          {/* Deposit Address & Copy */}
          {inputValue && (
            <div className="col-12 mb-3 mb-2">
              <label className="text-gray mb-2">Deposit Address</label>
              <div className="d-flex align-items-center gap-2">
                <input type="text" className="form-control" value={inputValue} readOnly />
                <button className="btn btn-darker" onClick={handleCopy}>
                  <BsCopy />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <FooterNav />
    </div>
  );
}
