import React, { useEffect, useState } from "react"; // Correct
import AOS from "aos";

import "aos/dist/aos.css";
import { MdKeyboardArrowRight, MdOutlineToken } from "react-icons/md";
import FooterNav from "./FooterNav";
import { Link } from "react-router-dom";
import { getProfile } from "../helper/apifunction";
import { formatNumber } from "../helper/Math";
import Wheelspinner from "../component/wheelspinner";
import { useAccount } from "wagmi";

function Home() {
  const { address } = useAccount()
  const [user, setUser] = useState(null);
  const [username, setUserName] = useState(null);
  console.log("username", username)
  const [user_data, setUserData] = useState(null);
  // Initialize AOS on component mount

  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  useEffect(() => {
    if (window.Telegram?.WebApp?.initDataUnsafe?.user) {
      setUser(window.Telegram?.WebApp?.initDataUnsafe?.user)
    }
  }, [window.Telegram?.WebApp?.initDataUnsafe?.user]);
  useEffect(() => {
    if (user || address) {
      const name =
        user?.username ||
        [user?.first_name, user?.last_name].filter(Boolean).join(" ") ||
        "Mejora";

      setUserName(name);


      console.log({ address })
      const getUser = async () => {
        try {
          const res = await getProfile(user?.id || address);

          setUserData(res?.data);
        } catch (error) {
          console.error("Error during signup:", error);
        }
      };

      getUser();
    }

  }, [user])

  return (
    <>
      <div className="page_container">
        <div className="top-header">
          <div className="col-4">
            <Link className="anchor_pointer text-white" to="#">
              <div className="d-flex gap-2 align-items-center">
                <img src="/images/Mejoratext.png" width={"137px"} alt="" />
                <div>{user?.username
                  ? user.username
                  : [user?.first_name, user?.last_name].filter(Boolean).join(" ") || ""}

                </div>
              </div>
            </Link>
          </div>
          <div className="col-8">
            <div className="d-flex justify-content-end gap-1">
              <div data-aos="zoom-in">

                <div className="wallet_btn">
                  <div className="d-flex gap-2 align-items-center">
                    {/* <div>+{formatNumber(user_data?.deposit_balance)}</div>{" "} */}
                    <div>+<span>{user_data?.earning_balance ? user_data.earning_balance : "0.00"}</span></div>

                    <div>
                      <Link to="/wallet">
                        <span className="badge bg-lightwallet rounded-pill">
                          <img src="/images/wallet.png" width={"15px"} alt="" />
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
        <div
          className="header d-flex justify-content-between align-items-center p-3 rounded-4"
          style={{
            backdropFilter: "blur(16px)",
            background: "rgba(255, 255, 255, 0.08)",
          }}
        >
          {/* LEFT SIDE */}
          <div className="col-5">
            <div
              className="fs-12 mb-2 d-flex align-items-center"
              style={{ color: "#ffffff" }}
            >
              <span>Available Spin</span>
              <MdKeyboardArrowRight className="fs-16 mx-1 text-light" />
              <strong style={{ color: "#ffffff" }}>
                {user_data?.avaibleSpin ?? 0}
              </strong>
            </div>

            {/* Dynamic Progress based on completeSpin */}
            <div
              className="progress"
              style={{
                height: "6px",
                borderRadius: "10px",
                background: "rgba(255, 255, 255, 0.1)",
                overflow: "hidden",
                width: "120px"
              }}
            >
              <div
                className="progress-bar"
                role="progressbar"
                style={{
                  width: `${Math.min(
                    ((user_data?.completeSpin || 0) /
                      (user_data?.avaibleSpin + user_data?.completeSpin || 1)) * 100,
                    100
                  )
                    }%`,
                  background: "linear-gradient(90deg, #a855f7, #ec4899)",
                  borderRadius: "10px",
                  transition: "width 0.6s ease-in-out",
                }}
              ></div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="col-5 text-end">
            <div
              className="d-inline-flex align-items-center justify-content-end gap-2 px-3 py-1"
              style={{
                backdropFilter: "blur(8px)",
                background: "rgba(255,255,255,0.05)",
                borderRadius: "30px",
                color: "#ffffff",
              }}
            >
              <span
                style={{
                  fontWeight: 600,
                  color: "#ffffff",
                }}
              >
                {user_data?.user_id}
              </span>
            </div>
          </div>
        </div>

        {/* Centered Logo */}
        <div className="rounded-outer-container" data-aos="fade-up">
          <div className="rounded-container">
            <div className="pt-2 page_layout">
              <div className="d-flex align-items-center gap-2 justify-content-center">
                {/* <img src="/images/inrx-black-logo.png" width={"35px"} alt="" /> */}
                <div className="fs-4">{user_data?.amount}</div>
              </div>
              <Wheelspinner />

            </div>
          </div>
        </div>

        <FooterNav />
      </div>
    </>
  );
}

export default Home;
