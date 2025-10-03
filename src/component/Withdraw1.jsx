import React, { useEffect, useState } from "react";
import { BsCheck2 } from "react-icons/bs";
import { getWithdraw } from "../helper/apifunction";

export default function Withdraw() {
  const [user, setUser] = useState(null);
  const [selectedChain, setSelectedChain] = useState(null);
  const [selectedAmount, setSelectedAmount] = useState("");
  const [qrScanned, setQrScanned] = useState(false);
  const [inputValue, setInputValue] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
  const [isLoading, setIsLoading] = useState(false); // New state variable for loading

  useEffect(() => {
    if (window.Telegram?.WebApp?.initDataUnsafe?.user) {
      setUser(window.Telegram?.WebApp?.initDataUnsafe?.user)
    }
  }, [window.Telegram?.WebApp?.initDataUnsafe?.user]);

  useEffect(() => {
    if (timeLeft <= 0) return; // Stop the timer when it reaches 0

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1); // Decrease time by 1 second
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  // Helper function to format time as MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleChainSelect = (chain) => {
    setSelectedChain(chain);
  };

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
  };

  const withdraw = async () => {
    if (user) {
      if (selectedAmount > 0 && selectedChain) {
        setIsLoading(true); // Set loading state to true
        const network = selectedChain === "BEP 20" ? "binance" : "polygon";
        let amount = selectedAmount;
        const res = await getWithdraw(user?.id, network, amount, inputValue);
        setIsLoading(false); // Set loading state to false after response
        if (res.status === 200) {
          console.log("res", res);
        }
      }
    }
  };

  return (
    <div>
      <div className="col-12 mb-3 mb-2">
        <label className="text-gray mb-2">Select Chain</label>
        <div className="d-flex gap-2">
          <span
            className={`btn btn-sm btn-darker d-flex align-items-center ${selectedChain === "BEP 20" ? "orange_bg" : ""
              }`}
            onClick={() => handleChainSelect("BEP 20")}
          >
            BEP 20
            {selectedChain === "BEP 20" && <BsCheck2 className="ms-1" />}
          </span>
          <span
            className={`btn btn-sm btn-darker d-flex align-items-center ${selectedChain === "Polygon" ? "purple_bg" : ""
              }`}
            onClick={() => handleChainSelect("Polygon")}
          >
            Polygon
            {selectedChain === "Polygon" && <BsCheck2 className="ms-1" />}
          </span>
        </div>
      </div>

      <div className="col-12 mb-3 mb-2">
        <label className="text-gray mb-2">Select Amount</label>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            value={selectedAmount}
            readOnly
          />
          <span className="input-group-text">
            <span className="text-gray fs-12">MAX</span>
          </span>
        </div>
      </div>

      <div className="amount_wrapper">
        {[1000, 5000, 10000, 25000, 50000].map((amount, index) => (
          <div
            key={`${amount}-${index}`}
            className="btn-grad"
            onClick={() => handleAmountSelect(amount)}
          >
            <span>{amount}</span>
          </div>
        ))}
      </div>

      {/* Show QR code if the chain and amount are selected */}
      {selectedAmount && (
        <div className="my-3">
          <label className="text-gray mb-2">Wallet Address</label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Wallet Address"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
            />
          </div>

          <div className="d-grid my-3">
            {/* Conditionally render the button or loader */}
            {isLoading ? (
              <div className="loader"></div> // Replace with your loader component or style
            ) : (
              <div className="custom_btn btn py-2" onClick={withdraw}>
                Withdraw
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
