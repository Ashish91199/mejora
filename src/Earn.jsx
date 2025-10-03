import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import FooterNav from "./component/FooterNav";
import { IoIosCloseCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import ShapeSelector from "./component/ShapeSelector";
import LevelSelector from "./component/LevelSelector";

function Earn() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCardClick = (category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedCategory("");
  };

  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <>
      <div className="page_container">
        <div className="inner_page_layout">
          <div className="mb-5">
            <div className="mb-3 text-center" >
              <div>
                <img
                  src="/images/inrx-white.png"
                  width={"100px"}
                  alt="img-fluid"
                  className="mb-2"
                  data-aos="zoom-in"
                />
              </div>
              <h4 className="mb-1">Earn More INRx</h4>
            </div>

            <div>
              <div className="h6 py-3">Radar Youtube</div>
              <div
                className="card mb-2 card_with_arrow"
                onClick={() => handleCardClick("Radar YouTube")}
              >
                <div className="card-body">
                  <div className="d-flex gap-3 align-items-center">
                    <div>
                      <img src="/images/youtube.png" width={"32px"} alt="" />
                    </div>
                    <div>
                      <div className="fs-12">Learn to earn</div>

                      <div>
                        <img
                          src="/images/inrx-logo.png"
                          alt=""
                          width={"20px"}
                        />
                        <span className="ms-2">+5,000</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="h6 py-3">Invest & Earn</div>
              <Link
                to="/triangle"
                className="card mb-2 card_with_arrow"

              // onClick={() => handleCardClick("Matrix")}
              >
                <div className="card-body">
                  <div className="d-flex gap-3 align-items-center">
                    <div>
                      <img src="/images/matrix.png" width={"32px"} alt="" />
                    </div>
                    <div>
                      <div className="fs-12">Matrix</div>
                      <div>
                        <img
                          src="/images/inrx-logo.png"
                          alt=""
                          width={"20px"}
                        />
                        <span className="ms-2 text-green">+6X</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>

              <div
                className="card mb-2 card_with_arrow"
                onClick={() => handleCardClick("APR")}
              >
                <div className="card-body">
                  <div className="d-flex gap-3 align-items-center">
                    <div>
                      <img src="/images/apr.png" width={"30px"} alt="" />
                    </div>
                    <div>
                      <div className="fs-12">APR</div>
                      <div>
                        <img
                          src="/images/inrx-logo.png"
                          alt=""
                          width={"20px"}
                        />
                        <span className="ms-2">+60%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="card mb-2 card_with_arrow"
                onClick={() => handleCardClick("Give & Take")}
              >
                <div className="card-body">
                  <div className="d-flex gap-3 align-items-center">
                    <div>
                      <img src="/images/give-take.png" width={"30px"} alt="" />
                    </div>
                    <div>
                      <div className="fs-12">Give & Take</div>
                      <div>
                        <img
                          src="/images/inrx-logo.png"
                          alt=""
                          width={"20px"}
                        />
                        <span className="ms-2">+60%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="h6 py-3">Daily Tasks</div>
              <Link to="/ScratchBonus">
                <div className="card mb-2 card_with_arrow">
                  <div className="card-body">
                    <div className="d-flex gap-3 align-items-center">
                      <div>
                        <img src="/images/calender.png" width={"32px"} alt="" />
                      </div>
                      <div>
                        <div className="fs-12">Daily Task</div>
                        <div>
                          <img
                            src="/images/inrx-logo.png"
                            alt=""
                            width={"20px"}
                          />
                          <span className="ms-2">+5,000</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            <div>
              <div className="h6 py-3">Tasks Lists</div>

              <div
                className="card mb-2 card_with_arrow"
                onClick={() => handleCardClick("Instagram")}
              >
                <div className="card-body">
                  <div className="d-flex gap-3 align-items-center">
                    <div>
                      <img src="/images/insta.png" width={"32px"} alt="" />
                    </div>
                    <div>
                      <div className="fs-12">Follow us on Instagram</div>
                      <div>
                        <img
                          src="/images/inrx-logo.png"
                          alt=""
                          width={"20px"}
                        />
                        <span className="ms-2">+5,000</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="card mb-2 card_with_arrow"
                onClick={() => handleCardClick("Telegram")}
              >
                <div className="card-body">
                  <div className="d-flex gap-3 align-items-center">
                    <div>
                      <img src="/images/telegram.png" width={"32px"} alt="" />
                    </div>
                    <div>
                      <div className="fs-12">Join our telegram channel</div>
                      <div>
                        <img
                          src="/images/inrx-logo.png"
                          alt=""
                          width={"20px"}
                        />
                        <span className="ms-2">+5,000</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="card mb-2 card_with_arrow"
                onClick={() => handleCardClick("Twitter")}
              >
                <div className="card-body">
                  <div className="d-flex gap-3 align-items-center">
                    <div>
                      <img src="/images/twitter.png" width={"32px"} alt="" />
                    </div>
                    <div>
                      <div className="fs-12">Follow our X Account</div>
                      <div>
                        <img
                          src="/images/inrx-logo.png"
                          alt=""
                          width={"20px"}
                        />
                        <span className="ms-2">+5,000</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Link
                to="/invitefriends"
                className="card mb-2 card_with_arrow text-decoration-none"
              >
                <div className="card-body">
                  <div className="d-flex gap-3 align-items-center">
                    <div>
                      <img
                        src="/images/invite-friend.png"
                        width={"32px"}
                        alt=""
                      />
                    </div>
                    <div>
                      <div className="fs-12">Invite friends</div>
                      <div>
                        <img
                          src="/images/inrx-logo.png"
                          alt=""
                          width={"20px"}
                        />
                        <span className="ms-2">+5</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <FooterNav />

      {/* Custom Slide-Up Modal */}
      <div className={`slide-up-container ${isModalOpen ? "active" : ""}`}>
        <div className="slide-up-inner-container">
          <div className="slide-up-header">
            <h5> </h5>
            <button className="btn-close-custom" onClick={handleClose}>
              <img src="/images/close-icon.png" width={"25px"} alt="close" />
            </button>
          </div>
          <div className="slide-up-body">
            {selectedCategory === "Radar YouTube" && (
              <>
                <img
                  src="/images/youtube.png"
                  alt="Radar YouTube"
                  width={"100px"}
                  className="img-fluid"
                />
                <h5 className="my-2 h4">Learn How to Earn </h5>
                <p className="fs-12 text-lgray">
                  Welcome to a unique earning opportunity where you canmultiply
                  your investment by up to 10 times through our structured and
                  rewarding ecosystem.{" "}
                </p>
                <div className="mb-3">
                  <Link className="btn-gradient-2">Watch Video</Link>
                </div>
                <p className="h5 mb-3">+50,000</p>
                <div className="d-grid mt-2">
                  <Link className="btn btn-primary py-2 ">Check</Link>
                </div>
              </>
            )}

            {selectedCategory === "Matrix" && (

              <>
                <ShapeSelector />
              </>
            )}

            {selectedCategory === "APR" && (
              <>
                <div className="circular_percent_box">
                  <div className="circular_percent_box_inner">60%</div>
                </div>
                <p className="h4 mb-3">+1,00000 %</p>
                <div className="mb-3">
                  <Link className="btn btn-grad2">Claim</Link>
                </div>

                <div className="card mb-2">
                  <div className="card-body">
                    <div
                      iv
                      className="d-flex justify-content-between align-items-center"
                    >
                      <div className="d-flex gap-3 align-items-center">
                        <div className="square_bg">
                          <img src="/images/emoji.png" alt="" />
                        </div>
                        <div>
                          <div className="text-start">Total Invested</div>
                        </div>
                      </div>
                      <div className="d-flex gap-2">
                        <img
                          src="/images/inrx-logo.png"
                          width={"25px"}
                          alt=""
                        />
                        <div>+25K</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card mb-2">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex gap-3">
                        <div className="square_bg">
                          <img src="/images/emoji.png" alt="" />
                        </div>
                        <div>
                          <div className="text-start">Claimed</div>
                          <div className="d-flex gap-2 align-items-center">
                            <div className="text-gray">Remaining </div>

                            <div>
                              <span className="text-gray">(6.04K)</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="d-flex gap-2">
                        <img
                          src="/images/inrx-logo.png"
                          width={"25px"}
                          alt=""
                        />{" "}
                        <div>+25K</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="my-4">
                  <toolcool-range-slider
                    // disabled="true"
                    //  step="10"
                    slider-width="100%"
                    min="10"
                    max="50"
                    step="1"
                    value="30"
                    generate-labels="true"
                    round="0"
                    pointers-min-distance="10"
                    range-dragging="true"
                    animate-onclick="1s"
                    slider-bg="#9E9DA0"
                    slider-bg-hover="silver"
                    slider-bg-fill="linear-gradient(102.77deg, #1B1198 -24.42%, #B41D47 124.74%)"
                    slider-height="16px"
                    pointer-width="30px"
                    pointer-height="30px"
                    pointer-border="2px solid #fff"
                    pointer-border-focus="2px solid #fff"
                    pointer-radius="50px"
                    pointer-bg="linear-gradient(102.77deg, #1B1198 -24.42%, #B41D47 124.74%)"
                    pointer-bg-focus="linear-gradient(102.77deg, #1B1198 -24.42%, #B41D47 124.74%)"
                  ></toolcool-range-slider>
                </div>

                <div className="d-grid mt-2">
                  <Link className="btn btn-primary py-2">Invest</Link>
                </div>
              </>
            )}

            {selectedCategory === "Give & Take" && <><LevelSelector />  </>}

            {selectedCategory === "Daily Tasks" && (
              <>
                <img
                  src="/images/calender.png"
                  alt="Daily Tasks"
                  width={"100px"}
                  className="img-fluid"
                />
                <h5 className="my-3 h4">Daily Tasks</h5>
                <div className="mb-3">
                  <Link className="btn-gradient-2">Join</Link>
                </div>
                <p className="h5 mb-3">+5,000</p>
                <div className="d-grid mt-2">
                  <Link className="btn btn-primary py-2 ">Check</Link>
                </div>
              </>
            )}

            {selectedCategory === "Instagram" && (
              <>
                <img
                  src="/images/insta.png"
                  alt="Tasks Lists"
                  width={"100px"}
                  className="img-fluid"
                />
                <h5 className="my-3 h4">Follow us on Instagram</h5>
                <div className="mb-3">
                  <Link className="btn-gradient-2">Join</Link>
                </div>
                <p className="h5 mb-3">+3,000</p>
                <div className="d-grid mt-2">
                  <Link className="btn btn-primary py-2 ">Check</Link>
                </div>
              </>
            )}

            {selectedCategory === "Telegram" && (
              <>
                <img
                  src="/images/telegram.png"
                  alt="Tasks Lists"
                  width={"100px"}
                  className="img-fluid"
                />
                <h5 className="my-3 h4">Follow us on Telegram</h5>
                <div className="mb-3">
                  <Link className="btn-gradient-2">Join</Link>
                </div>
                <p className="h5 mb-3">+2,000</p>
                <div className="d-grid mt-2">
                  <Link className="btn btn-primary py-2 ">Check</Link>
                </div>
              </>
            )}

            {selectedCategory === "Twitter" && (
              <>
                <img
                  src="/images/twitter.png"
                  alt="Tasks Lists"
                  width={"100px"}
                  className="img-fluid"
                />
                <h5 className="my-3 h4">Follow us on Twitter</h5>
                <div className="mb-3">
                  <Link className="btn-gradient-2">Join</Link>
                </div>
                <p className="h5 mb-3">+5,000</p>
                <div className="d-grid mt-2">
                  <Link className="btn btn-primary py-2 ">Check</Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Earn;
