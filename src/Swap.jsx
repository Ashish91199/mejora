import { useState } from "react";
import "./App.css";
import { CgArrowsExchangeV } from "react-icons/cg";
import { IoReloadSharp, IoSettingsOutline } from "react-icons/io5";
import FooterNav from "./component/FooterNav";
import { MdKeyboardArrowRight, MdRoute } from "react-icons/md";
import { BiError } from "react-icons/bi";
import { Link } from "react-router-dom";
function Swap() {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const [slippageValue, setSlippageValue] = useState("5");

  const handleButtonClick = (value) => {
    setSlippageValue(value);
  };

  return (
    <>
      <div className="inner_page_container">
        <div className="page_justify_content">
          <div>
            <div className="row inner_top_bar g-1 mb-3">
              <div className="col-4">
              <h4 className="fs-16">
              <img src="/images/right-tail.png" alt="" width={"30px"} className="me-1" />Tonton</h4>
              </div>
              <div className="col-8">
                <div className="d-flex justify-content-end gap-1">
                  <div className="border-button">
                    <div className="border-button-inner">
                      <span> 200 Points</span>
                    </div>
                  </div>
                  <a href="#" className="btn btn-sm btn-primary rounded-pill">
                    UXzc...f9fh
                  </a>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2 mb-3">
              <div>
                <IoReloadSharp className="fs-5 text-gray" />
              </div>
              <div
                className="cursor_pointer"
                data-bs-target="#settings"
                data-bs-toggle="offcanvas"
              >
                <IoSettingsOutline className="fs-5 text-gray" />
              </div>
            </div>
            <div className="card radius_lg">
              <div className="card-body">
                <div className="text-gray mb-2">You send</div>
                <div className="align-items-center d-flex justify-content-between mb-2">
                  <div className="">
                    <input
                      type="number"
                      className="form_input"
                      id=""
                      placeholder="0"
                      autocomplete="off"
                      onChange={handleInputChange}
                      value={inputValue}
                    />
                  </div>
                  <div
                    className="cursor_pointer"
                    data-bs-target="#token_list"
                    data-bs-toggle="offcanvas"
                  >
                    <div className="d-flex gap-1 align-items-center">
                      <div>
                        <img src="/images/bnb.png" alt="" width={"18px"} />
                      </div>
                      <div className="">
                        <h5 className="mb-0 h6 pt-1">BNB</h5>
                      </div>
                      <div>
                        <MdKeyboardArrowRight className="fs-5" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <div className="text-gray">Balance: 0 Max</div>

                  <div className="text-gray">$ 0</div>
                </div>
              </div>
            </div>
            <div className="position-relative my-1">
              <div className="switch_btn">
                <div className="icon_wrapper">
                  <CgArrowsExchangeV className="text-warning fs-3" />
                </div>
              </div>
            </div>
            <div className="card radius_lg">
              <div className="card-body">
                <div className="text-gray mb-2">You receive</div>
                <div className="align-items-center d-flex justify-content-between mb-2">
                  <div className="">
                    <input
                      type="number"
                      className="form_input"
                      id=""
                      placeholder="0"
                      autocomplete="off"
                    />
                  </div>
                  <div
                    className="cursor_pointer"
                    data-bs-target="#token_list"
                    data-bs-toggle="offcanvas"
                  >
                    <div className="d-flex gap-1 align-items-center">
                      <div>
                        <img
                          src="/images/usdt-logo.png"
                          alt=""
                          width={"18px"}
                          height={"18px"}
                        />
                      </div>
                      <div className="">
                        <h5 className="mb-0 h6 pt-1">USDT</h5>
                      </div>
                      <div>
                        <MdKeyboardArrowRight className="fs-5" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <div className="text-gray">Balance: 0 Max</div>

                  <div className="text-gray">$ 0</div>
                </div>
              </div>
            </div>
            {inputValue && (
              <p className="fs-12 text-gray text-end my-2">
                {" "}
                1 BNB = 564.70 USDT
              </p>
            )}
          </div>

          <div data-aos="zoom-in">
            <div className="d-grid mt-2">
              <button
                data-bs-target="#confirm_modal"
                data-bs-toggle="offcanvas"
                className="btn custom_btn"
              >
                {inputValue ? "Swap" : "Enter Amount"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="offcanvas offcanvas-bottom"
        tabindex="-1"
        id="confirm_modal"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">
            Confirm the swap
          </h5>
          <button
            type="button"
            className="btn-close btn-close-white text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body ">
          <div className="d-flex flex-column justify-content-between h-100 ">
            <div>
              <div className="card">
                <div className="card-body">
                  <div className="mb-4">
                    <MdRoute className="fs-5"/> Route Info
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <div>You send</div>
                    <div>
                      1 BNB
                      <img src="/images/bnb.png" alt="bnb" width={"25px"} />
                    </div>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <div>You receive</div>
                    <div>
                      565.58 USDT
                      <img
                        src="/images/usdt-logo.png"
                        alt="bnb"
                        width={"25px"}
                      />
                    </div>
                  </div>
                  <div className="d-flex justify-content-between mb-3 text-gray">
                    <div>Rate</div>
                    <div>1 BNB = 565.58 USDT</div>
                  </div>

                  <div className="d-flex justify-content-between mb-3 text-gray">
                    <div>Fee</div>
                    <div>0%</div>
                  </div>

                  <div className="d-flex justify-content-between mb-3 text-gray">
                    <div>Max Slippage</div>
                    <div>5%</div>
                  </div>

                  <div className="d-flex justify-content-between mb-3 text-gray">
                    <div>Receive at least</div>
                    <div>62.369898 BNB</div>
                  </div>

                  <div className="d-flex justify-content-between mb-3 text-gray">
                    <div>Swap Route</div>
                    <div></div>
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <div className="accordion" id="accordionExample">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        <div className="d-flex gap-2 align-items-center">
                          <div>
                            <BiError className="fs-4" />
                          </div>
                          <div>Disclaimer</div>
                        </div>
                      </button>
                    </h2>
                    <div
                      id="collapseOne"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Earum iure libero, ea itaque consequuntur amet inventore
                        molestiae id asperiores dolor ratione facilis repellat
                        architecto aut sed voluptates atque ducimus magni?
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="d-grid my-2">
                <button className="btn custom_btn">Confirm</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="offcanvas offcanvas-bottom"
        tabindex="-1"
        id="token_list"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">
            Select the token
          </h5>
          <button
            type="button"
            className="btn-close btn-close-white text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body px-3 pb-4">
          <div className="">
            <input
              type="text"
              className="form-control rounded-lg"
              id=""
              placeholder="Search by name or Enter your token address."
            />
          </div>

          <h6 className="text-gray mt-3"> Popular tokens</h6>
          <div className="popular_wrapper mb-3">
            <div className="btn btn-darker fs-12 d-flex gap-1">
              {" "}
              <img src="/images/bnb.png" width={"18px"} alt="" /> <div>BNB</div>
            </div>
            <div className="btn btn-darker fs-12 d-flex gap-1">
              {" "}
              <img src="/images/usdt-logo.png" width={"18px"} alt="" />{" "}
              <div>USDT</div>
            </div>
            <div className="btn btn-darker fs-12 d-flex gap-1">
              {" "}
              <img src="/images/eth.png" width={"18px"} alt="" /> <div>ETH</div>
            </div>
            {/* <div className="btn btn-darker fs-12 d-flex gap-1">
              {" "}
              <img src="/images/bnb.png" width={"18px"} alt="" /> <div>BNB</div>
            </div> */}
            <div className="btn btn-darker fs-12 d-flex gap-1">
              {" "}
              <img src="/images/acala-coin.png" width={"18px"} alt="" />{" "}
              <div>AKALA</div>
            </div>
          </div>

          <div className="d-flex px-2 justify-content-between text-gray mb-3">
            <div>Token</div>
            <div>Balance</div>
          </div>
          <div
            className="scrollbar"
            style={{ height: "308px", overflow: "auto " }}
          >
            <Link to="#" className="token-list">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex gap-2 align-items-center">
                  <div>
                    <img src="/images/bnb.png" alt="bnb" width={"25px"} />
                  </div>

                  <div>
                    BNB
                    <div className="text-gray fs-12">Binance</div>
                  </div>
                </div>
                <div>65.32</div>
              </div>
            </Link>
            <Link to="#" className="token-list">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex gap-2 align-items-center">
                  <div>
                    <img src="/images/usdt-logo.png" alt="bnb" width={"25px"} />
                  </div>

                  <div>
                    USDT
                    <div className="text-gray fs-12">USDT</div>
                  </div>
                </div>
                <div>105.25</div>
              </div>
            </Link>
            <Link to="#" className="token-list">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex gap-2 align-items-center">
                  <div>
                    <img src="/images/eth.png" alt="bnb" width={"25px"} />
                  </div>

                  <div>
                    ETH
                    <div className="text-gray fs-12">Ethereum</div>
                  </div>
                </div>
                <div>85.38</div>
              </div>
            </Link>
            <Link to="#" className="token-list">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex gap-2 align-items-center">
                  <div>
                    <img src="/images/usdt-logo.png" alt="bnb" width={"25px"} />
                  </div>

                  <div>
                    USDT
                    <div className="text-gray fs-12">USDT</div>
                  </div>
                </div>
                <div>105.25</div>
              </div>
            </Link>
            <Link to="#" className="token-list">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex gap-2 align-items-center">
                  <div>
                    <img src="/images/eth.png" alt="bnb" width={"25px"} />
                  </div>

                  <div>
                    ETH
                    <div className="text-gray fs-12">Ethereum</div>
                  </div>
                </div>
                <div>85.38</div>
              </div>
            </Link>
            <Link to="#" className="token-list">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex gap-2 align-items-center">
                  <div>
                    <img src="/images/usdt-logo.png" alt="bnb" width={"25px"} />
                  </div>

                  <div>
                    USDT
                    <div className="text-gray fs-12">USDT</div>
                  </div>
                </div>
                <div>105.25</div>
              </div>
            </Link>
            <Link to="#" className="token-list">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex gap-2 align-items-center">
                  <div>
                    <img src="/images/eth.png" alt="bnb" width={"25px"} />
                  </div>

                  <div>
                    ETH
                    <div className="text-gray fs-12">Ethereum</div>
                  </div>
                </div>
                <div>85.38</div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div
        className="offcanvas offcanvas-bottom"
        tabindex="-1"
        id="settings"
        aria-labelledby="offcanvassettings"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvassettings">
            Settings
          </h5>
          <button
            type="button"
            className="btn-close btn-close-white text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body px-3 pb-4">
          <h6>Slippage Tolerance</h6>
          <p className="text-gray fs-12">
            Your transaction will revert if the basic price changes unfavorably
            by more than this percentage
          </p>
          <div className="input-group">
            <input
              type="text"
              className="form-control py-3"
              id=""
              placeholder="5"
              value={slippageValue}
              onChange={(e) => setSlippageValue(e.target.value)}
            />
            <span className="input-group-text">%</span>
          </div>

          <div className="d-flex justify-content-start gap-2 my-3">
            <div
              className="btn-gradient-2"
              onClick={() => handleButtonClick("1")}
            >
              <span>1%</span>
            </div>
            <div
              className="btn-gradient-2"
              onClick={() => handleButtonClick("5")}
            >
              <span>5%</span>
            </div>

            <div
              className="btn-gradient-2"
              onClick={() => handleButtonClick("10")}
            >
              <span>10%</span>
            </div>
          </div>
        </div>
      </div>
      <FooterNav />
    </>
  );
}

export default Swap;
