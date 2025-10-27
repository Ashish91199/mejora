import React, { useEffect, useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { Link } from "react-router-dom";
import { BsCheck, BsCopy } from "react-icons/bs";
import FooterNav from "./component/FooterNav";
import { getdepositAddress, getProfile, getDepositHistory } from "./helper/apifunction";
import { useAccount } from "wagmi";
import { handleDeposit, isLoggedIn, registerUser } from "./helper/web3";
import toast from "react-hot-toast";
import { AppKitButton } from "@reown/appkit/react";

export default function Deposit() {
  const { address, isConnected } = useAccount();
  const [user, setUser] = useState(null);
  const [userdata, setUserdata] = useState(null);
  const [selectedAmount, setSelectedAmount] = useState(54);
  const [order_id, setOrderId] = useState(null);
  const [inputValue, setInputValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [depositHistory, setDepositHistory] = useState([]);

  // ✅ Telegram WebApp user data
  useEffect(() => {
    if (window.Telegram?.WebApp?.initDataUnsafe?.user) {
      setUser(window.Telegram.WebApp.initDataUnsafe.user);
    }
  }, []);

  // ✅ Get User Profile from backend
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await getProfile(user?.id);
        setUserdata(res?.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    if (user) getUser();
  }, [user]);

  // ✅ Get deposit history when wallet is connected
  useEffect(() => {
    const fetchDepositHistory = async () => {
      if (!address) return;
      try {
        const res = await getDepositHistory(address);
        if (res.status === 200) {
          setDepositHistory(res.data);
        }
      } catch (error) {
        console.error("Error fetching deposit history:", error);
      }
    };
    fetchDepositHistory();
  }, [address]);

  // ✅ Fetch deposit address when user & amount ready
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

  // ✅ Copy Address
  const handleCopy = (value) => {
    if (value) navigator.clipboard.writeText(value);
    toast.success("Address copied!");
  };

  // ✅ Auto register user when both wallet & telegram user available
  useEffect(() => {
    if (!address || !userdata) return;

    const register = async () => {
      try {
        const isLogin = await isLoggedIn(address);
        if (isLogin) {
          toast("Already registered!", { icon: "ℹ️" });
          return;
        }

        if (!userdata.referral_address || !userdata.user_id) {
          toast.error("Referral Address or UserId missing!");
          return;
        }

        const loadingToast = toast.loading("Registering...");
        const registered = await registerUser(userdata.referral_address, userdata.user_id);
        toast.dismiss(loadingToast);

        if (registered) toast.success("✅ Registration Successful!");
        else toast.error("❌ Registration Failed!");
      } catch (error) {
        toast.error("Registration error!");
        console.error(error);
      }
    };

    register();
  }, [address, userdata]);

  // ✅ Render UI
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

        {/* Chain Label */}
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
            <input type="number" className="form-control" value={selectedAmount} readOnly />
          </div>
        </div>

        {/* Wallet Connect + Deposit Button */}
        <div className="d-flex align-items-center gap-3">
          <AppKitButton />
          {isConnected && (
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
          )}
        </div>

        {/* Deposit Address */}
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
      </div>

      <FooterNav />
    </div>
  );
}
