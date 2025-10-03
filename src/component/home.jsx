import React, { useEffect, useState } from "react"; // Correct
import AOS from "aos";

import "aos/dist/aos.css";
import { MdKeyboardArrowRight, MdOutlineToken } from "react-icons/md";
import FooterNav from "./FooterNav";
import { Link } from "react-router-dom";
import { getProfile } from "../helper/apifunction";
import { formatNumber } from "../helper/Math";
import Wheelspinner from "../component/wheelspinner";

function Home() {
  const [user, setUser] = useState(null);
  const [username, setUserName] = useState(null);
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
    if (user) {
      setUserName(user?.username ? user?.username : user?.first_name + " " + user?.last_name)
      const getUser = async () => {
        try {
          const res = await getProfile(user?.id);
          setUserData(res?.user);
        } catch (error) {
          console.error("Error during signup:", error);
        }
      };

      getUser();
    }

  }, [user?.id])

  const [value, setValue] = useState(30); // Initial slider value

  // Handler for slider value change
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="page_container">
        <div className="top-header">
          <div className="col-4">
            <Link className="anchor_pointer text-white" to="/profile">
              <div className="d-flex gap-2 align-items-center">
                <img src="/images/inrx-logo.png" width={"28px"} alt="" />
                <div>{username}Ashish (CEO)
                </div>
              </div>
            </Link>
          </div>
          <div className="col-8">
            <div className="d-flex justify-content-end gap-1">
              <div data-aos="zoom-in">

                <div className="wallet_btn">
                  <div className="d-flex gap-2 align-items-center">
                    <div>+{formatNumber(user_data?.amount)}</div>{" "}
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
        <div className="header">
          <div className="col-5">
            <div className="fs-12 mb-1">
              Profit per Day
              <MdKeyboardArrowRight className="fs-16 mx-1" />
              +126.4k
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
          {/* <div className="col-7">
            <div className="d-flex justify-content-end gap-1">
              <div data-aos="zoom-in">

                <div className="wallet_btn">
                  <div className="d-flex gap-2 align-items-center">
                    <div>+{formatNumber(user_data?.amount)}</div>{" "}
                    <div>
                      <Link to="/wallet">
                        <span className="badge bg-light rounded-pill">
                          <img src="/images/wallet.png" width={"15px"} alt="" />
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div> */}
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
