import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import FooterNav from "./component/FooterNav";
import { Link } from "react-router-dom";
import { MdArrowRightAlt, MdInfo, MdKeyboardArrowLeft, MdRampRight } from "react-icons/md";
import { div } from "three/webgpu";
// import Withdraw from "./component/Withdraw";
import { getProfile } from "./helper/apifunction";

function Wallet() {
  const [activeTab, setActiveTab] = useState("tab1");
  const [user, setUser] = useState(null);
  const [user_data, setUserData] = useState(null);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  useEffect(() => {
    if (window.Telegram?.WebApp?.initDataUnsafe?.user) {
      setUser(window.Telegram?.WebApp?.initDataUnsafe?.user)
    }
  }, [window.Telegram?.WebApp?.initDataUnsafe?.user]);

  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  useEffect(() => {
    if (user) {
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

  return (
    <>
      <div className="page_container">
        <div className="inner_page_layout">
          <div className="position-relative mb-5 py-1">
            <div className="backButton">
              <Link className="anchor_pointer text-white" to="/home">
                <MdKeyboardArrowLeft className="fs-1" />
              </Link>
            </div>
            <div className="mb-3 text-center">
              <div>
                <img
                  src="/images/MejoraLogo.png"
                  width={"60px"}
                  alt="img-fluid"
                  data-aos="zoom-in"
                />
              </div>
              <div className="mt-3">
                <div className="text-gray fs-12">Wallet Balance</div>
                <div className="wallet_amt">{user_data?.amount}</div>
              </div>
            </div>

            <div className="add_irx_wrapper mb-3">
              <div className="card-body">
                <Link className="anchor_pointer" to="/deposit">
                  <div className="info_right">
                    <MdArrowRightAlt className="fs-3" />
                  </div>
                  <div className="text-left">

                    <div>Deposit</div>
                  </div>
                </Link>
              </div>
            </div>

            <div className="d-flex gap-2 justify-content-center mb-4">
              <Link to="/deposit" className="btn-gradient-2 ">
                Deposit
              </Link>
              <Link to="/withdraw" className="btn-gradient-3">
                Withdraw
              </Link>
            </div>

            {/* <div className="text-gray mb-2">Transaction History</div> */}

            <div className="tabs-container">
              {/* <div className="tabs-header">
                <div
                  className={`tab ${activeTab === "tab1" ? "active" : ""}`}
                  onClick={() => handleTabClick("tab1")}
                >
                  Deposit
                </div>
                <div
                  className={`tab ${activeTab === "tab2" ? "active" : ""}`}
                  onClick={() => handleTabClick("tab2")}
                >
                  Withdrawal
                </div>
              </div> */}
              <div className="tabs-content">
                {activeTab === "tab1" && (
                  <div className="content">
                    {/* <div>
                      <Link to="#">
                        <div className="card mb-2 card_with_info">
                          <div className="card-body">
                            <div className="d-flex gap-3 align-items-center">
                              <div>
                                <img
                                  src="/images/social-eng.png"
                                  width={"28px"}
                                  alt=""
                                />
                              </div>
                              <div>
                                <div className="text-lgray">Social Earning</div>
                                <div>
                                  <span>+ 6,876</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div> */}

                    {/* <div>
                      <Link to="#">
                        <div className="card mb-2 card_with_info">
                          <div className="card-body">
                            <div className="d-flex gap-3 align-items-center">
                              <div>
                                <img
                                  src="/images/earning-task.png"
                                  width={"28px"}
                                  alt=""
                                />
                              </div>
                              <div>
                                <div className="text-lgray">
                                  Earning from Task
                                </div>
                                <div>
                                  <span> + 6,876,877</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div> */}

                    {/* <div>
                      <Link to="#">
                        <div className="card mb-2 card_with_info">
                          <div className="card-body">
                            <div className="d-flex gap-3 align-items-center">
                              <div>
                                <img
                                  src="/images/ar-earn.png"
                                  width={"28px"}
                                  alt=""
                                />
                              </div>
                              <div>
                                <div className="text-lgray">AR Earning</div>
                                <div>
                                  <span> + 6,876,877</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div> */}

                    <div>
                      <Link to="#">
                        <div className="card mb-2 card_with_info">
                          <div className="card-body">
                            <div className="d-flex gap-3 align-items-center">
                              <div>
                                <img
                                  src="/images/referral-earning.png"
                                  width={"28px"}
                                  alt=""
                                />
                              </div>
                              <div>
                                <div className="text-lgray">
                                  Referral Earning
                                </div>
                                <div>
                                  <span> + 4,976</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>

                    {/* <div>
                      <Link to="#">
                        <div className="card mb-2 card_with_info">
                          <div className="card-body">
                            <div className="d-flex gap-3 align-items-center">
                              <div>
                                <img
                                  src="/images/team-earning.png"
                                  width={"28px"}
                                  alt=""
                                />
                              </div>
                              <div>
                                <div className="text-lgray">Team Earning</div>
                                <div>
                                  <span> + 23,000,567</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div> */}

                    {/* <div>
                      <Link to="#">
                        <div className="card mb-2 card_with_info">
                          <div className="card-body">
                            <div className="d-flex gap-3 align-items-center">
                              <div>
                                <img
                                  src="/images/earning-apr.png"
                                  width={"28px"}
                                  alt=""
                                />
                              </div>
                              <div>
                                <div className="text-lgray">
                                  Earning from APR
                                </div>
                                <div>
                                  <span>+ 6,876,876</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div> */}

                    <div>
                      <Link to="#">
                        <div className="card mb-2 card_with_info">
                          <div className="card-body">
                            <div className="d-flex gap-3 align-items-center">
                              <div>
                                <img
                                  src="/images/earning-apr.png"
                                  width={"28px"}
                                  alt=""
                                />
                              </div>
                              <div>
                                <div className="text-lgray">
                                  Wallet Balance
                                </div>
                                <div>
                                  <span>10,765</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                    <div>
                      <Link to="#">
                        <div className="card mb-2 card_with_info">
                          <div className="card-body">
                            <div className="d-flex gap-3 align-items-center">
                              <div>
                                <img
                                  src="/images/earning-apr.png"
                                  width={"28px"}
                                  alt=""
                                />
                              </div>
                              <div>
                                <div className="text-lgray">
                                  Withdrawal Balance
                                </div>
                                <div>
                                  <span>10,00</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>

                    {/* <div>
                      <Link to="#">
                        <div className="card mb-2 card_with_info">
                          <div className="card-body">
                            <div className="d-flex gap-3 align-items-center">
                              <div>
                                <img
                                  src="/images/earn-matrix.png"
                                  width={"28px"}
                                  alt=""
                                />
                              </div>
                              <div>
                                <div className="text-lgray">
                                  Earning from Matrix
                                </div>
                                <div>
                                  <span>+ 8,765</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div> */}
                  </div>
                )}
                {activeTab === "tab2" && (
                  // <div className="content">
                  //   <Link to="#">
                  //     <div className="card mb-2 card_with_arrow blue_bg">
                  //       <div className="card-body">
                  //         <span className="ps-3"> Connect your TON wallet</span>
                  //       </div>
                  //     </div>
                  //   </Link>

                  //   <Link to="#">
                  //     <div className="card mb-2 card_with_arrow pink_bg">
                  //       <div className="card-body">
                  //         <span className="ps-3"> Swap with USDT </span>
                  //       </div>
                  //     </div>
                  //   </Link>

                  //   <Link to="#">
                  //     <div className="card mb-2 card_with_arrow primary_bg">
                  //       <div className="card-body">
                  //         <span className="ps-3"> Manual Deposit</span>
                  //       </div>
                  //     </div>
                  //   </Link>

                  //   <Link to="#">
                  //     <div className="card mb-2 card_with_arrow info_bg">
                  //       <div className="card-body">
                  //         <span className="ps-3"> Link INRx Tresurry</span>
                  //       </div>
                  //     </div>
                  //   </Link>

                  //   <Link to="#">
                  //     <div className="card mb-2 card_with_arrow orange_bg">
                  //       <div className="card-body">
                  //         <span className="ps-3"> Buy INRx</span>
                  //       </div>
                  //     </div>
                  //   </Link>
                  // </div>
                  <>
                    <Withdraw />

                  </>


                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterNav />
    </>
  );
}

export default Wallet;
