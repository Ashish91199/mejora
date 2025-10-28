import React, { useEffect, useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { Link } from "react-router-dom";
import { BsCheck, BsCopy } from "react-icons/bs";
import FooterNav from "./component/FooterNav";
import toast from "react-hot-toast";
import {
  getdepositAddress,
  getProfile,
  getDepositHistory,
} from "./helper/apifunction";
import { handleDeposit, isLoggedIn, registerUser } from "./helper/web3";

// 🧩 wagmi imports
import { useAccount, useDisconnect } from "wagmi";
import WalletConnectProvider from "./WalletConnectProvider.jsx/WalletConnectProvider";

export default function Deposit() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const [user, setUser] = useState(null);
  const [userdata, setUserdata] = useState(null);
  const [selectedAmount, setSelectedAmount] = useState(54);
  const [order_id, setOrderId] = useState(null);
  const [inputValue, setInputValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [depositHistory, setDepositHistory] = useState([]);
  const [isUserExists, setIsUserExist] = useState(false)

  // ✅ Telegram user
  useEffect(() => {
    if (window.Telegram?.WebApp?.initDataUnsafe?.user) {
      setUser(window.Telegram.WebApp.initDataUnsafe.user);
    }
  }, []);

  // ✅ Fetch Profile
  useEffect(() => {
    const getUser = async () => {
      if (!user) return;
      try {
        const res = await getProfile(user?.id);
        setUserdata(res?.data);
      } catch (err) {
        console.error(err);
      }
    };
    getUser();
  }, [user]);


  useEffect(() => {
    const isUserLogin = async () => {
      try {
        const isLogin = await isLoggedIn(address);
        console.log({ isLogin })
        if (isLogin) {
          setIsUserExist(true);
          toast("Already registered!", { icon: "ℹ️" });
          return;
        }
      } catch (error) {
        setIsUserExist(false)
      }
    }
    isUserLogin()
  }, [address])


  // ✅ Deposit history
  useEffect(() => {
    const fetchDepositHistory = async () => {
      if (!address) return;
      try {
        const res = await getDepositHistory(address);
        if (res.status === 200) setDepositHistory(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDepositHistory();
  }, [address]);

  // ✅ Deposit address
  useEffect(() => {
    if (!user || selectedAmount <= 0) return;
    const getAddress = async () => {
      const res = await getdepositAddress(
        user?.id,
        "binance",
        selectedAmount,
        order_id
      );
      if (res.status === 200 && !order_id) {
        setInputValue(res?.data?.address);
        setOrderId(res?.data?.order_id);
      }
    };
    getAddress();
  }, [selectedAmount, user]);

  // ✅ Copy
  const handleCopy = (value) => {
    if (value) navigator.clipboard.writeText(value);
    toast.success("Copied!");
  };

  // ✅ Auto-register
  // if (!address || !userdata) return;




  const handleRegister = async () => {
    let loadingToast = null;
    try {

      loadingToast = toast.loading("Registering...");
      const registered = await registerUser(
        userdata.referral_address,
        userdata.user_id
      );
      console.log({ registered })
      toast.dismiss(loadingToast);
      registered ? toast.success("Registered successfully!") : toast.error("Failed to Register!");
    } catch (err) {
      console.log(err)
      toast.dismiss(loadingToast);
      toast.error("Registration failed!");
    }
  };
  //   useEffect(() => {
  //   register();
  // }, [address, userdata]);

  return (
    <div className="page_container">
      <div className="inner_page_layout">
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

        {/* Network */}
        <div className="col-12 mb-3 mb-2">
          <div className="d-flex gap-2">
            <span className="btn btn-sm btn-darker d-flex align-items-center orange_bg">
              BEP 20 <BsCheck className="ms-1" />
            </span>
          </div>
        </div>

        {/* Amount */}
        <div className="col-12 mb-3 mb-2">
          <label className="text-gray mb-2">Amount</label>
          <div className="input-group">
            <span className="input-group-text">$</span>
            <input
              type="number"
              className="form-control"
              value={selectedAmount}
              readOnly
            />
          </div>
        </div>

        {/* Wallet + Deposit */}
        <div className="d-flex align-items-center gap-3">
          {!isConnected ? (
            // Use RainbowKit Connect Button directly
            <WalletConnectProvider />
          ) : (
            <>
              <button
                onClick={async () => {
                  setLoading(true);
                  await handleDeposit(userdata.user_id, address, selectedAmount);
                  setLoading(false);
                }}
                className="connectcss"
                disabled={loading}
              >
                {loading ? "Processing..." : "Deposit"}
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={() => disconnect()}
              >
                Disconnect
              </button>
            </>
          )}
        </div>
        {(!isUserExists && isConnected) && <div>
          <button onClick={handleRegister} className="btn btn-primary">Register</button>
        </div>}

        {/* Deposit Address */}
        {inputValue && (
          <div className="col-12 mb-3 mb-2">
            <label className="text-gray mb-2">Deposit Address</label>
            <div className="d-flex align-items-center gap-2">
              <input
                type="text"
                className="form-control"
                value={inputValue}
                readOnly
              />
              <button
                className="btn btn-darker"
                onClick={() => handleCopy(inputValue)}
              >
                <BsCopy />
              </button>
            </div>
          </div>
        )}
      </div>

      <FooterNav />
    </div>
  );
}
