import React, { useEffect, useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { Link } from "react-router-dom";
import { BsCheck, BsCopy } from "react-icons/bs";
import FooterNav from "./component/FooterNav";
import { getdepositAddress, getProfile, getDepositHistory } from "./helper/apifunction";
import ConnectWallet from "./Connectwallet";
import { useAccount } from "wagmi";
import { handleDeposit, isLoggedIn, registerUser } from "./helper/web3";
import { useAspect } from "@react-three/drei";




export default function Deposit() {
  const { address, isConnected } = useAccount();
  const [user, setUser] = useState(null);
  const [userdata, setUserdata] = useState(null);
  const [selectedAmount, setSelectedAmount] = useState(54); // default amount
  const [order_id, setOrderId] = useState(null);
  const [inputValue, setInputValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [depositHistory, setDepositHistory] = useState([]); // Already present, but make sure you use it


  // // Dummy deposit history data
  // const [depositHistory, setDepositHistory] = useState([
  //   { id: 1, amount: 54, status: "Completed", date: "2025-10-07", txId: "0x12345ABC" },

  // ]);

  // Set Telegram WebApp user 
  useEffect(() => {
    if (window.Telegram?.WebApp?.initDataUnsafe?.user) {
      setUser(window.Telegram?.WebApp?.initDataUnsafe?.user);
    }
  }, [window.Telegram?.WebApp?.initDataUnsafe?.user]);

  // Fetch deposit address (always BEP20)

  useEffect(() => {
    const getUser = async (address) => {
      try {
        const res = await getProfile(address);
        // console.log({ res })
        setUserdata(res?.data);
      } catch (error) {
        console.error("Error during signup:", error);
      }
    };


    if (address) getUser("1703020047");
  }, [address])
  useEffect(() => {
    const fetchDepositHistory = async () => {
      if (!address) return; // address check

      try {
        const res = await getDepositHistory(address);
        if (res.status === 200) {
          setDepositHistory(res.data); // set deposit history
        } else {
          console.error("Failed to fetch deposit history", res);
        }
      } catch (error) {
        console.error("Error fetching deposit history:", error);
      }
    };

    fetchDepositHistory();
  }, [address]);

  useEffect(() => {
    const getUser = async (address) => {
      try {
        const res = await getDepositHistory(address);
        // console.log({ res })
        setUserdata(res?.data);
      } catch (error) {
        console.error("Error during signup:", error);
      }
    };


    if (address) getUser("1703020047");
  }, [address])


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

  useEffect(() => {
    // Run only if required data is available
    if (!address || !userdata?.referral_address || !userdata?.user_id) return;

    const register = async () => {
      try {
        if (!address) {
          setIsOpen(false)
          return;
        }
        const isLogin = await isLoggedIn(address);
        console.log(isLogin, "in register")
        if (isLogin) {
          setIsOpen(false)
          return
        }; // already registered
        setIsOpen(true);
        console.log(userdata.referral_address, userdata.user_id, isOpen, "123")
        if (isOpen) {
          return
        }
        const registered = await registerUser(userdata.referral_address, userdata.user_id);
        if (registered) {

          console.log("✅ User registered successfully");
          setIsOpen(false)
        }
      } catch (error) {
        console.error("Registration failed:", error);
        setIsOpen(false)
      }
    };

    if (address || !isOpen) register();
  }, [address]);


  // const handleDeposit = async () => {
  //   const res = await deposit
  // }

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
          <div className="d-flex align-items-center gap-3">
            <div>
              <ConnectWallet />
            </div>
            {isConnected && <div>
              <button
                onClick={() => handleDeposit(address, 54)} // Deposit 54 USDT
                className="cosmuno-account-btn"
                disabled={loading}
              >
                {loading ? "Processing..." : "Deposit"}
              </button>
            </div>}
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
