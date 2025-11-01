import React, { useEffect, useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { Link, useSearchParams } from "react-router-dom";
import { BsCheck, BsCopy } from "react-icons/bs";
import FooterNav from "./component/FooterNav";
import toast from "react-hot-toast";
import {
  getdepositAddress,
  getProfile,
  getDepositHistory,
  registerApp,
  getUserData,
} from "./helper/apifunction";
import { handleDeposit, isLoggedIn, registerUser } from "./helper/web3";
import { useAccount } from "wagmi";
import WalletConnectProvider from "./WalletConnectProvider.jsx/WalletConnectProvider";
import ConnectWallet from "./Connectwallet";

export default function Deposit() {
  const { address, isConnected } = useAccount();
  const [searchParams] = useSearchParams();
  const [userData, setUserData] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [user, setUser] = useState(null);
  const [userdata, setUserdata] = useState(null);
  const [selectedAmount, setSelectedAmount] = useState(54);
  const [order_id, setOrderId] = useState(null);
  const [inputValue, setInputValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [depositHistory, setDepositHistory] = useState([]);
  const [isUserExists, setIsUserExist] = useState(true);
  const [referralAddress, setReferralAddress] = useState("");
  const [isTelegramEnv, setIsTelegramEnv] = useState(false);

  // Detect Telegram environment
  useEffect(() => {
    const isTelegram = window.Telegram?.WebApp?.initDataUnsafe?.user;
    setIsTelegramEnv(!!isTelegram);

    if (isTelegram) {
      setUser(window.Telegram.WebApp.initDataUnsafe.user);
    }
  }, []);

  // Auto-fill referral address from URL ?user=0x...
  useEffect(() => {
    const refFromUrl = searchParams.get("user");
    if (refFromUrl && !referralAddress) {
      setReferralAddress(refFromUrl);
    }
  }, [searchParams, referralAddress]);

  // Fetch Profile
  useEffect(() => {
    const getUser = async () => {
      if (!user) return;

      try {
        const res = await getProfile(user?.id);
        setUserdata(res?.data);

        // Check if user exists in contract for Telegram
        if (isTelegramEnv && address) {
          const isLogin = await isLoggedIn(address);
          setIsUserExist(isLogin);
        }
      } catch (err) {
        console.error(err);
      }
    };

    getUser();

    if (address) {
      getUserData(address).then((res) => {
        if (res) {
          setUserData(res?.data?.user_address);
        }
      });
    }
  }, [user, address, isTelegramEnv, refresh]);

  // Deposit history
  useEffect(() => {
    if (!address) return;

    const fetchDepositHistory = async () => {
      try {
        const res = await getDepositHistory(address);
        if (res.status === 200) setDepositHistory(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDepositHistory();
  }, [address]);

  // Deposit address
  useEffect(() => {
    if (!user || selectedAmount <= 0 || !isUserExists) return;

    const getAddress = async () => {
      try {
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
      } catch (err) {
        console.error(err);
      }
    };

    getAddress();
  }, [selectedAmount, user, isUserExists, order_id]);

  // Copy to clipboard
  const handleCopy = (value) => {
    if (value) {
      navigator.clipboard.writeText(value);
      toast.success("Copied!");
    }
  };

  // Handle Register for Dapp (manual referral input)
  const handleRegisterDapp = async () => {
    let loadingToast = null;

    try {
      if (!referralAddress) {
        toast.error("Referral address required!");
        return;
      }

      if (!address) {
        toast.error("Please connect your wallet!");
        return;
      }
      const userExist = await isLoggedIn(address);

      if (userExist) {
        toast.error("User Already Exist");
        return;
      }
      const useerExist = await isLoggedIn(referralAddress);

      if (!useerExist) {
        toast.error("Invalid Referral Id");
        return;
      }
      loadingToast = toast.loading("Registering...");
      const registered = await registerApp(address, referralAddress);

      console.log({ registered });
      toast.dismiss(loadingToast);
      toast.success("Registered successfully!");
      setRefresh(!refresh);
      setIsUserExist(true);
    } catch (err) {
      console.error(err);
      toast.dismiss(loadingToast);
      toast.error(err?.message || "Registration failed!");
    }
  };

  // Handle Deposit
  const handleDepositClick = async () => {
    try {
      setLoading(true);

      if (!address) {
        toast.error("Please connect your wallet!");
        return;
      }

      const userExist = await isLoggedIn(address);
      console.log(userExist, "userExist");

      if (!userExist) {
        const uData = await getUserData(address);
        console.log(uData, "uData");

        if (uData?.data?.user_address) {
          const registered = await registerUser(
            uData.data.referral_address,
            uData.data.user_id
          );
          console.log("User registered:", registered);
        } else {
          console.warn("No user data found for registration!");
        }
      }

      const userId = isTelegramEnv ? userdata?.user_id : address;
      await handleDeposit(userId, address, selectedAmount);

      toast.success("Deposit successful!");
    } catch (err) {
      console.error(err);
      toast.error(err?.message || "Deposit failed!");
    } finally {
      setLoading(false);
    }
  };

  // Render only wallet connect option if not connected
  if (!isConnected) {
    return (
      <div className="page_container">
        <div className="inner_page_layout">
          <div className="text-center">
            <h4 className="mb-4">Connect Your Wallet</h4>
            <p className="text-gray mb-4">
              Please connect your wallet to proceed with registration or deposit.
            </p>
            <WalletConnectProvider />
          </div>
        </div>
      </div>
    );
  }

  // Full UI after wallet connection
  return (
    <div className="page_container">
      <div className="inner_page_layout">
        {/* Header */}
        <div className="position-relative mb-4 py-1">
          <div className="backButton">
            <Link className="anchor_pointer text-white" to="/wallet">
              <MdKeyboardArrowLeft className="fs-1" />
            </Link>
          </div>
          <div className="text-center">
            <h4>{isUserExists ? "Deposit" : "Register"}</h4>
          </div>
        </div>

        {/* Registration Section */}
        {!userData && !isTelegramEnv ? (
          <div className="registration-container">
            <div className="text-center mb-4">
              <div className="register-image-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&q=80"
                  alt="Registration"
                  className="register-image"
                />
              </div>
              <h5 className="mt-3 mb-2">Welcome! Let's Get Started</h5>
              <p className="text-gray small">
                {isTelegramEnv
                  ? "Connect your wallet and register to start depositing"
                  : "Enter a referral address to register"}
              </p>
            </div>

            <div className="registration-form">
              {isTelegramEnv && userdata ? (
                <div className="col-12">
                  <div className="info-card mb-3">
                    <p className="mb-2">
                      <strong>User ID:</strong> {userdata.user_id}
                    </p>
                    <p className="mb-0">
                      <strong>Referral:</strong>{" "}
                      {userdata.referral_address?.slice(0, 6)}...
                      {userdata.referral_address?.slice(-4)}
                    </p>
                  </div>
                  <button
                    onClick={handleRegisterDapp} // Note: handleRegisterBot is not defined, using handleRegisterDapp
                    className="btn btn-primary w-100 register-btn"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Registering...
                      </>
                    ) : (
                      "Register Now"
                    )}
                  </button>
                </div>
              ) : (
                <div className="col-12">
                  <label className="text-gray mb-2 fw-bold">
                    Referral Address
                  </label>
                  <input
                    type="text"
                    className="form-control mb-3 referral-input"
                    placeholder="0x..."
                    value={referralAddress}
                    onChange={(e) => setReferralAddress(e.target.value)}
                  />
                  <button
                    onClick={handleRegisterDapp}
                    className="btn btn-primary w-100 register-btn"
                    disabled={loading || !referralAddress}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Registering...
                      </>
                    ) : (
                      "Register Now"
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <>
            {/* Deposit Section */}
            <div className="col-12 mb-3">
              <label className="text-gray mb-2 fw-bold">Network</label>
              <div className="d-flex gap-2">
                <span className="btn btn-sm btn-darker d-flex align-items-center network-badge">
                  <img
                    src="https://cryptologos.cc/logos/bnb-bnb-logo.png"
                    alt="BNB"
                    className="network-icon me-2"
                  />
                  BEP 20 <BsCheck className="ms-1" />
                </span>
              </div>
            </div>

            <div className="col-12 mb-3">
              <label className="text-gray mb-2 Euphoric">Amount</label>
              <div className="input-group amount-input-group">
                <span className="input-group-text">$</span>
                <input
                  type="number"
                  className="form-control"
                  value={selectedAmount}
                  onChange={(e) => setSelectedAmount(e.target.value)}
                  min="1"
                />
              </div>
            </div>

            <div className="d-flex align-items-center gap-3 mb-3">
              <button
                onClick={handleDepositClick}
                className="connectcss deposit-btn"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Processing...
                  </>
                ) : (
                  "Deposit"
                )}
              </button>
              <ConnectWallet />
            </div>

            {inputValue && (
              <div className="col-12 mb-3">
                <label className="text-gray mb-2 fw-bold">Deposit Address</label>
                <div className="address-container">
                  <input
                    type="text"
                    className="form-control address-input"
                    value={inputValue}
                    readOnly
                  />
                  <button
                    className="btn btn-darker copy-btn"
                    onClick={() => handleCopy(inputValue)}
                  >
                    <BsCopy />
                  </button>
                </div>
              </div>
            )}

            {depositHistory.length > 0 && (
              <div className="col-12 mt-4">
                <h6 className="mb-3">Recent Deposits</h6>
                <div className="deposit-history">
                  {depositHistory.slice(0, 5).map((deposit, index) => (
                    <div key={index} className="history-item">
                      <div>
                        <p className="mb-1">${deposit.amount}</p>
                        <small className="text-gray">
                          {new Date(deposit.date).toLocaleDateString()}
                        </small>
                      </div>
                      <span
                        className={`badge ${
                          deposit.status === "completed"
                            ? "bg-success"
                            : "bg-warning"
                        }`}
                      >
                        {deposit.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <FooterNav />

      <style jsx>{`
        .registration-container {
          background: linear-gradient(
            135deg,
            rgba(255, 107, 0, 0.1) 0%,
            rgba(255, 107, 0, 0.05) 100%
          );
          border-radius: 20px;
          padding: 2rem;
          margin-bottom: 2rem;
        }

        .register-image-wrapper {
          width: 200px;
          height: 200px;
          margin: 0 auto;
          border-radius: 50%;
          overflow: hidden;
          border: 4px solid #ff6b00;
          box-shadow: 0 10px 30px rgba(255, 107, 0, 0.3);
        }

        .register-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .registration-form {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 15px;
          padding: 1.5rem;
        }

        .referral-input {
          border: 2px solid rgba(255, 107, 0, 0.3);
          background: rgba(0, 0, 0, 0.2);
          color: white;
          padding: 12px;
          font-size: 14px;
        }

        .referral-input:focus {
          border-color: #ff6b00;
          background: rgba(0, 0, 0, 0.3);
          color: white;
          box-shadow: 0 0 15px rgba(255, 107, 0, 0.3);
        }

        .register-btn {
          background: linear-gradient(135deg, #ff6b00 0%, #ff8c00 100%);
          border: none;
          padding: 14px;
          font-weight: 600;
          font-size: 16px;
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        .register-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(255, 107, 0, 0.4);
        }

        .register-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .info-card {
          background: rgba(255, 107, 0, 0.1);
          border: 1px solid rgba(255, 107, 0, 0.3);
          border-radius: 10px;
          padding: 1rem;
        }

        .network-badge {
          background: rgba(255, 107, 0, 0.2) !important;
          border: 1px solid #ff6b00;
          color: white;
          padding: 8px 16px;
          border-radius: 8px;
        }

        .network-icon {
          width: 20px;
          height: 20px;
          border-radius: 50%;
        }

        .amount-input-group {
          border-radius: 10px;
          overflow: hidden;
        }

        .amount-input-group .input-group-text {
          background: #ff6b00;
          border: none;
          color: white;
          font-weight: 600;
        }

        .deposit-btn {
          flex: 1;
          padding: 14px;
          background: linear-gradient(135deg, #ff6b00 0%, #ff8c00 100%);
          border: none;
          border-radius: 12px;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .deposit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(255, 107, 0, 0.4);
        }

        .address-container {
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .address-input {
          background: rgba(0, 0, 0, 0.2);
          border: 2px solid rgba(255, 107, 0, 0.3);
          color: white;
        }

        .copy-btn {
          background: #ff6b00;
          border: none;
          padding: 10px 16px;
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .copy-btn:hover {
          background: #ff8c00;
          transform: scale(1.05);
        }

        .deposit-history {
          display:Deposit history
          flex-direction: column;
          gap: 10px;
        }

        .history-item {
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 107, 0, 0.2);
          border-radius: 10px;
          padding: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      `}</style>
    </div>
  );
}