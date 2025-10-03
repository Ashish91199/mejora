import React, { useEffect, useRef, useState } from "react"; // Correct
import AOS from "aos";
import { Html5QrcodeScanner } from "html5-qrcode";

import "aos/dist/aos.css";
import { MdKeyboardArrowRight, MdOutlineToken } from "react-icons/md";

import { Link } from "react-router-dom";
import FooterNav from "./component/FooterNav";

function QrScanner() {
  // Initialize AOS on component mount
  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const [qrCode, setQRCode] = useState(null);
  const scannerRef = useRef(null);

  useEffect(() => {
    const html5QrcodeScanner = new Html5QrcodeScanner(
      "qr-reader",
      { fps: 10, qrbox: 250 },
      false
    );

    html5QrcodeScanner.render(onScanSuccess, onScanError);

    return () => {
      html5QrcodeScanner.clear().catch((error) => {
        console.error("Failed to clear the scanner: ", error);
      });
    };
  }, []);

  const onScanSuccess = (decodedText, decodedResult) => {
    setQRCode(decodedText);
  };

  const onScanError = (error) => {
    console.error("QR Code scan error: ", error);
  };

  return (
    <>
      <div className="page_container">
        <div className="top-header">
          <div className="col-4">
            <div className="d-flex gap-2 align-items-center">
              <img src="/images/MejoraLogo.png" width={"28px"} alt="" />
              <div>VS(CEO)</div>
            </div>
          </div>
          <div className="col-8">
            <div className="d-flex justify-content-end gap-1">
              <div data-aos="zoom-in">
                <div className="custom_btn">
                  <Link to="/qrscanner" className="cursor_pointer">
                    <div className="d-flex gap-2 align-items-center">
                      <div>
                        <img
                          src="/images/scanner-icon.png"
                          width={"15px"}
                          alt=""
                        />
                      </div>
                      <div className="text-white">AR</div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="header">
          <div className="col-5">
            <div className="fs-12 mb-1">
              Total spin used
              <MdKeyboardArrowRight className="fs-16 mx-1" />
              00
            </div>
            <div className="fs-12">
              <div className="progress">
                <div
                  className="progress-bar progress-purple"
                  role="progressbar"
                  aria-valuenow="0"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{ width: "80px" }}
                ></div>
              </div>
            </div>
          </div>
          <div className="col-7">
            <div className="d-flex justify-content-end gap-1">
              <div data-aos="zoom-in">
                <Link to="/wallet">
                  <div className="wallet_btn">
                    <div className="d-flex gap-2 align-items-center">
                      <div>+870.85k</div>{" "}
                      <div>
                        <span className="badge bg-lightwallet rounded-pill">
                          <img src="/images/wallet.png" width={"15px"} alt="" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* Centered Logo */}
        <div className="rounded-outer-container" data-aos="fade-up">
          <div className="rounded-container">
            <div className="pt-2 page_layout">

              <div id="qr-reader" style={{ width: "100%", height: "100%" }}></div>
              {qrCode && (
                <div>
                  <h3 className="fs-12 text-gray">QR Code Content:</h3>
                  <p>{qrCode}</p>
                </div>
              )}

            </div>
          </div>
        </div>

        <FooterNav />
      </div>
    </>
  );
}

export default QrScanner;
