import { useEffect, useState } from "react";
import "./App.css";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

import FooterNav from "./component/FooterNav";
import { IoReloadSharp, IoSettingsOutline } from "react-icons/io5";
import { LuLayoutList } from "react-icons/lu";
import { Link } from "react-router-dom";

function CreateToken() {
  // Initialize AOS on component mount
  useEffect(() => {
    AOS.init({
      duration: 400,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const [selectedTokenType, setSelectedTokenType] = useState("standard");

  const handleTokenTypeChange = (e) => {
    setSelectedTokenType(e.target.value);
  };

  const [isMaxTransactionChecked, setIsMaxTransactionChecked] = useState(false);

  const handleCheckboxChange = (e) => {
    setIsMaxTransactionChecked(e.target.checked);
  };

  const isCommonFieldsVisible =
    selectedTokenType === "standard" ||
    selectedTokenType === "safemoon" ||
    selectedTokenType === "liquiditygenerator" ||
    selectedTokenType === "marketingtax" ||
    selectedTokenType === "smarttax" ||
    selectedTokenType === "rewardtoken";

  const isRouterFieldVisible =
    selectedTokenType === "rewardtoken" ||
    selectedTokenType === "smarttax" ||
    selectedTokenType === "marketingtax" ||
    selectedTokenType === "safemoon" ||
    selectedTokenType === "liquiditygenerator";

  const isMarketingUserVisible =
    selectedTokenType === "smarttax" ||
    selectedTokenType === "rewardtoken" ||
    selectedTokenType === "liquiditygenerator" ||
    selectedTokenType === "marketingtax";

  const isMaxTxnCheckboxVisible =
    selectedTokenType === "safemoon" ||
    selectedTokenType === "smarttax" ||
    selectedTokenType === "liquiditygenerator";

  const isTokenButtonVisible =
    selectedTokenType === "safemoon" ||
    selectedTokenType === "smarttax" ||
    selectedTokenType === "standard" ||
    selectedTokenType === "marketingtax" ||
    selectedTokenType === "rewardtoken" ||
    selectedTokenType === "liquiditygenerator";

  const isMintBurnCheckboxVisible = selectedTokenType === "standard";

  return (
    <>
      <div className="inner_page_container">
        <div>
          <div>
            <div className="row inner_top_bar g-1 mb-3">
              <div className="col-4">
                <h4 className="fs-16">
                  <img
                    src="/images/right-tail.png"
                    alt=""
                    width={"30px"}
                    className="me-1"
                  />
                  Tonton
                </h4>
              </div>
              <div className="col-8 ">
                <div className="d-flex justify-content-end gap-1">
                  <div className="border-button" data-aos="zoom-in">
                    <div className="border-button-inner">
                      <span>200 Points</span>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="btn btn-sm btn-primary rounded-pill"
                    data-aos="zoom-in"
                  >
                    UXzc...f9fh
                  </a>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-between mb-3">
              <div className="mb-2">
                <h4 className=""> Create Your Token</h4>
              </div>
              <div className="d-flex gap-3">
                <div>
                  <IoReloadSharp className="fs-5 text-gray" />
                </div>
                <div>
                  <Link to="/tokenlist">
                    <LuLayoutList className="fs-5 text-gray" />
                  </Link>
                </div>
              </div>
            </div>
            <div>
              <div className="col-12 mb-3 mb-2">
                <select
                  className="form-select"
                  aria-label="Select"
                  onChange={handleTokenTypeChange}
                  value={selectedTokenType}
                >
                  <option value="standard">Standard</option>
                  <option value="safemoon">Safemoon (Deflationary)</option>
                  <option value="liquiditygenerator">
                    Liquidity Generator
                  </option>
                  <option value="marketingtax">Marketing Tax</option>
                  <option value="smarttax">Smart Tax</option>
                  <option value="rewardtoken">Reward Token</option>
                  <option value="customizedToken">Customized Token</option>
                </select>
              </div>

              {/* Render common fields only if selectedTokenType matches specified values */}
              {isCommonFieldsVisible && (
                <>
                  <div className="row">
                    <div className="col-6 mb-3 mb-3">
                      <label className="form-label">
                        Token name
                        <span className="text-danger tokenname"></span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Token Name"
                        name="tokenname"
                        title="Enter token name"
                        autoComplete="off"
                        minLength="1"
                        maxLength="18"
                      />
                    </div>
                    <div className="col-6 mb-3 mb-3">
                      <label className="form-label">
                        Token symbol
                        <span className="text-danger tokensymbol"></span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Token Symbol"
                        name="tokensymbol"
                        title="Enter token symbol"
                        autoComplete="off"
                        minLength="3"
                        maxLength="5"
                      />
                    </div>
                    <div className="col-6 mb-3 mb-3">
                      <label className="form-label">
                        Total supply{" "}
                        <span className="text-danger tokensupply"></span>
                      </label>
                      <input
                        className="form-control"
                        type="number"
                        placeholder="1000000000000"
                        name="tokensupply"
                        min="0"
                        pattern="^[1-9]\\d*$"
                      />
                    </div>
                    <div className="col-6 mb-3 mb-3">
                      <label className="form-label">
                        Decimals <span className="text-danger decimal"></span>
                      </label>
                      <input
                        className="form-control"
                        type="number"
                        placeholder="18"
                        name="decimal"
                        min="1"
                        max="255"
                      />
                    </div>
                  </div>
                </>
              )}

              {isMintBurnCheckboxVisible && (
                <div className="row">
                  <div className="col-6">
                    <div className="d-flex gap-2 align-items-center mb-2">
                      <input
                        type="checkbox"
                        className="input-checkbox"
                        id="canMints"
                        name="canmints"
                      />
                      <label className="form-label mb-0" for="canMints">
                        Mintable
                      </label>
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="d-flex gap-2 align-items-center mb-2">
                      <input
                        type="checkbox"
                        className="input-checkbox"
                        id="canBurns"
                        name="canburns"
                      />
                      <label className="form-label mb-0" for="canBurns">
                        Burnable
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Conditionally rendered marketing User  */}
              {isMarketingUserVisible && (
                <div className="col-12 mb-3">
                  <label className="form-label">Marketing User</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Marketing Wallet Address"
                    name="marketingfeeperc"
                  />
                </div>
              )}
              {selectedTokenType === "liquiditygenerator" && (
                <>
                  <div className="row mb-3">
                    <div className="col-sm-12">
                      <label className="form-label">Marketing Tax %</label>
                      <input
                        className="form-control"
                        type="number"
                        placeholder="10"
                        name="marketingtaxperc"
                        min="0"
                        max="25"
                      />
                    </div>
                  </div>

                  {/* <div className="col-12 mb-3">
                    <div>
                      <label className="form-label">Max Transaction Amount dfdfgfdg  </label>
                    </div>
                    <div>
                      <input
                        className="form-control"
                        type="number"
                        placeholder="1000000000000000"
                        name="maxtransactionamounts"
                        min="1"
                        integer="true"
                      />
                    </div>
                  </div> */}

                  <h6 className="FormHeading">Taxes</h6>
                  <div className="col-12 mb-3">
                    <label className="form-label">
                      <span>Liquidity Fees %</span>{" "}
                      <span className="text-danger liquidityfeesperc"></span>
                    </label>
                    <input
                      className="form-control"
                      type="number"
                      placeholder="2"
                      name="liquidityfeesperc"
                    />
                  </div>
                </>
              )}

              {/* if selectedTokenType == marketingtax */}

              {selectedTokenType === "marketingtax" && (
                <>
                  <div className="row mb-3">
                    <div className="col-6">
                      <label className="form-label">Buy Tax %</label>
                      <input
                        className="form-control"
                        type="number"
                        min="0.01"
                        placeholder="10"
                        name="buytaxperc"
                        max="25"
                      />
                    </div>
                    <div className="col-6">
                      <label className="form-label">Sell Tax %</label>
                      <input
                        className="form-control"
                        type="number"
                        min="0.01"
                        placeholder="10"
                        name="selltaxperc"
                        max="25"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-6 mb-3">
                      <label className="form-label">
                        <span>Max Transaction %</span>{" "}
                      </label>
                      <input
                        className="form-control"
                        type="number"
                        min="0.01"
                        placeholder="1"
                        name="maxtransactionperc"
                        max="100"
                      />
                    </div>
                    <div className="col-6">
                      <label className="form-label">
                        <span>Max user %</span>{" "}
                      </label>
                      <input
                        className="form-control"
                        type="number"
                        min="0.01"
                        placeholder="2"
                        name="maxuserperc"
                        max="25"
                      />
                    </div>
                  </div>
                </>
              )}

              {isMaxTxnCheckboxVisible && (
                <>
                  <div className="d-flex gap-2 align-items-center mb-3">
                    <input
                      type="checkbox"
                      className="input-checkbox"
                      id="maxTransaction"
                      name="maxtransaction"
                      onChange={handleCheckboxChange}
                    />
                    <label className="form-label mb-0" for="maxtransaction">
                      Max Transaction
                    </label>
                  </div>
                  {isMaxTransactionChecked && (
                    <div className="col-12 mb-3">
                      <div>
                        <label className="form-label">
                          Max Transaction Amount{" "}
                        </label>
                      </div>
                      <div>
                        <input
                          className="form-control"
                          type="number"
                          placeholder="1000000000000000"
                          name="maxtransactionamounts"
                          min="1"
                          integer="true"
                        />
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* if selectedTokenType == smarttax  */}
              {selectedTokenType === "smarttax" && (
                <>
                  <div className="row mb-3">
                    <div className="col-6">
                      <div className="d-flex gap-2 align-items-center mb-3">
                        <input
                          type="checkbox"
                          className="input-checkbox"
                          id="maxuser"
                          name="maxuser"
                          value="maxuser"
                        />
                        <label className="form-label mb-0" for="maxuser">
                          Max user
                        </label>
                      </div>
                    </div>
                  </div>

                  <h6 className="FormHeading">Tax</h6>
                  <div className="col-6 mb-3">
                    <label className="form-label">Marketing Fees % </label>
                    <input
                      className="form-control"
                      type="number"
                      placeholder="3"
                      name="marketingfeeperc"
                    />
                  </div>

                  <h6 className="FormHeading">Extra Sell Tax</h6>
                  <div className="col-12 mb-3">
                    <label className="form-label">
                      <span>Tax Fees %</span>{" "}
                    </label>
                    <input
                      className="form-control"
                      type="number"
                      placeholder="2"
                      name="extrasellfeesperc"
                    />
                  </div>
                </>
              )}

              {/*if selectedTokenType == rewardstoken */}
              {selectedTokenType === "rewardtoken" && (
                <>
                  <h6 className="FormHeading">Rewards to Holders</h6>

                  <div className="col-12 mb-3">
                    <select
                      className="form-select token_type mb-2"
                      aria-label="Select token type"
                      name="rewardtoholder"
                    >
                      <option value="0x55dcEbc1021197F55fF560Dc3657D27120cA7415">
                        CAKE
                      </option>
                      <option value="0x2170ed0880ac9a755fd29b2688956bd959f933f8">
                        ETH
                      </option>
                      <option value="0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c">
                        BTC
                      </option>
                      <option value="0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c">
                        BNB
                      </option>
                      <option value="0xe9e7cea3dedca5984780bafc599bd69add087d56">
                        BUSD
                      </option>
                      <option value="0xba2ae424d960c26247dd6c32edc70b295c744c43">
                        DOGE
                      </option>
                      <option value="0x3ee2200efb3400fabb9aacf31297cbdd1d435d47">
                        AVA
                      </option>
                    </select>
                  </div>

                  <div className="row mb-3">
                    <div className="col-6">
                      <label className="form-label">
                        Reward Fees %{" "}
                        <span className="text-danger rewardfeeperc1"></span>
                      </label>
                      <input
                        className="form-control"
                        type="number"
                        placeholder="7"
                        name="rewardfeeperc1"
                        min="0"
                      />
                    </div>
                    <div className="col-6">
                      <label className="form-label">
                        Minimum Hold
                        <span className="text-danger minimumholds"></span>
                      </label>
                      <input
                        className="form-control"
                        type="number"
                        placeholder="1000"
                        name="minimumholds"
                        min="0"
                      />
                    </div>
                  </div>

                  <div className="col-12 mb-3">
                    <label className="form-label">Marketing Fees % </label>
                    <input
                      className="form-control"
                      type="number"
                      placeholder="3"
                      name="marketingfeeperc"
                    />
                  </div>

                  <div className="row mb-3">
                    <div className="col-6">
                      <label className="form-label">
                        <span>Extra Sell Fees %</span>{" "}
                      </label>
                      <input
                        className="form-control"
                        type="number"
                        placeholder="1"
                        name="extrasellfeesperc"
                      />
                    </div>

                    <div className="col-6">
                      <label className="form-label">
                        <span>Liquidity Fees %</span>
                      </label>
                      <input
                        className="form-control"
                        type="number"
                        placeholder="2"
                        name="liquidity"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* if selectedTokenType == customizedToken */}
              {selectedTokenType === "customizedToken" && (
                <div className="col-12 mb-3 mb-3">
                  <ul className="py-3 m-0 text-gray">
                    <li className="py-1">Add more features </li>
                    <li className="py-1">Tailored for your project </li>
                    <li className="py-1">
                      Great expertise in crypto/blockchain tech
                    </li>
                    <li className="py-1">Quick development time </li>
                    <li className="py-1">Affordable </li>
                    <li className="py-1">Pay in crypto/paypal </li>
                  </ul>
                  <div className="d-grid py-3">
                    <a
                      type="button"
                      href="https://forms.gle/5NFHyPB4ei7mutbc6"
                      target="_blank"
                      className="btn btn-gradient-border py-2 rounded-pill text-decoration-none"
                    >
                      Contact Us
                    </a>
                  </div>
                </div>
              )}

              {selectedTokenType === "safemoon" && (
                <>
                  <div className="row mb-3">
                    <div className="col-12 mb-3">
                      <div>
                        <label className="form-label">
                          Number of tokens sell to add liquidity
                        </label>
                      </div>
                      <div>
                        <input
                          className="form-control"
                          type="number"
                          placeholder="100000000"
                          min="0"
                          name="numTokensSellToAddToLiquidity"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-6">
                      <label className="form-label">
                        <span>Tax Fees %</span>{" "}
                      </label>
                      <input
                        className="form-control"
                        type="number"
                        placeholder="2"
                        name="extrasellfeesperc"
                      />
                    </div>
                    <div className="col-6 ">
                      <label for="liquidityfee" className="form-label">
                        <span>Liquidity Fees %</span>{" "}
                      </label>
                      <input
                        className="form-control"
                        type="number"
                        placeholder="2"
                        name="liquidityfee"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Conditionally rendered Router field  */}
              {isRouterFieldVisible && (
                <div className="form-group row divBackdrop">
                  <div className="col-12 mb-3">
                    <label className="form-label">Router </label>
                    <select
                      className="form-select router"
                      aria-label="Select router"
                      name="router"
                    >
                      <option value="0xD99D1c33F9fC3444f8101754aBC46c52416550D1">
                        PancakeSwap
                      </option>
                      <option value="0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D">
                        Uniswap
                      </option>
                      <option value="0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F">
                        SushiSwap
                      </option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {isTokenButtonVisible && (
              <div className="d-grid py-3" data-aos="fade-up">
                <button type="button" className="btn custom_btn">
                  Create Token
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <FooterNav />
    </>
  );
}

export default CreateToken;
