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
import "@rainbow-me/rainbowkit/styles.css";
import toast from "react-hot-toast";
import { userData } from "three/src/nodes/TSL.js";




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
  // Set Telegram WebApp user 
  useEffect(() => {
    if (window.Telegram?.WebApp?.initDataUnsafe?.user) {
      setUser(window.Telegram?.WebApp?.initDataUnsafe?.user);
    }
  }, [window.Telegram?.WebApp?.initDataUnsafe?.user]);

  // Fetch deposit address (always BEP20)

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await getProfile(user?.id);
        // console.log({ res })
        setUserdata(res?.data);
      } catch (error) {
        console.error("Error during signup:", error);
      }
    };


    if (user) getUser();
  }, [user])
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
    // Exit early if either address or userdata is not ready
    if (!address || !userdata) return;

    const register = async () => {
      try {
        if (!address) {
          toast.error("Please connect your wallet first!");
          setIsOpen(false);
          return;
        }
        const isLogin = await isLoggedIn(address);
        if (isLogin) {
          toast("You are already registered!", { icon: "ℹ️" });
          setIsOpen(false);
          return;
        }

        if (!userdata.referral_address || !userdata.user_id) {
          toast.error("Referral Address or UserId is required!");
          setIsOpen(false);
          return;
        }

        setIsOpen(true);
        const loadingToast = toast.loading("Registering user...");

        const registered = await registerUser(userdata.referral_address, userdata.user_id);

        toast.dismiss(loadingToast);

        if (registered) {
          toast.success("✅ Registration Successful!");
        } else {
          toast.error("❌ Registration Failed!");
        }
        setIsOpen(false);

      } catch (error) {
        console.error("Registration failed:", error);
        toast.error("Something went wrong during registration!");
        setIsOpen(false);
      }
    };

    register();
  }, [address, userdata]); // ✅ runs only when both are available




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
                onClick={() => {
                  setLoading(true);
                  handleDeposit(userdata.user_id, address, 54);
                  setLoading(false);
                }} // Deposit 54 USDT
                className="connectcss"
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

        </div>
      </div>
      <FooterNav />

    </div>
  );
}
