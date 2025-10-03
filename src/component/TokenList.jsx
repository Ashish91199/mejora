import { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

import { FaHandHoldingDroplet } from "react-icons/fa6";
import { AiOutlineSwap } from "react-icons/ai";
import { SiRocket } from "react-icons/si";
import { MdOutlineToken } from "react-icons/md";
import { Link } from "react-router-dom";
import FooterNav from "./FooterNav";
import { BiError } from "react-icons/bi";

function TokenList() {
  const tokenRef = useRef(null);

  // Initialize AOS on component mount
  useEffect(() => {
    AOS.init({
      duration: 500, // Animation duration in milliseconds
      easing: "ease-in-out", // Easing function
      once: true, // Whether animation should happen only once - while scrolling down
    });
  }, []);

  useEffect(() => {
    const token = tokenRef.current;
    if (token) {
      // Trigger the animation by adding the class
      token.classList.add("moving_token");

      // Optionally, you can remove the class after some time or on specific conditions
      // setTimeout(() => token.classList.remove("moving_token"), 5000);
    }
  }, []);

  return (
    <>
      <div className="page_container">
        <header className="header">
          <div className="d-flex justify-content-center  align-items-center gap-2 text-center text-white mb-0">
            <div></div>
            <div className="fs-5"> My Tokens</div>
          </div>
        </header>

        <div className="rounded-outer-container" data-aos="fade-up">
          <div className="rounded-container p-3">
            <div className="mt-3">
              <div className="accordion" id="tokenAccordion">
                <div className="accordion-item mb-2">
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
                          <img
                            src="/images/eth.png"
                            alt="token img"
                            width={"25px"}
                          />
                        </div>
                        <div>Rally Token</div>
                      </div>
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingOne"
                    data-bs-parent="#tokenAccordion"
                  >
                    <div className="accordion-body">
                      <div className="d-flex justify-content-between mb-2">
                        <div className="text-gray">Name</div>
                        <div>Rally</div>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <div className="text-gray">Supply</div>
                        <div>1000000000000</div>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <div className="text-gray">Type</div>
                        <div>Custom Token</div>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <div className="text-gray">Created at</div>
                        <div>28 Aug 2024</div>
                      </div>
                      <hr />
                      <div className="d-flex justify-content-between mb-2">
                        <div className="text-gray">Symbol</div>
                        <div>Rally</div>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <div className="text-gray">Precision</div>
                        <div>18</div>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <div className="text-gray">Contract</div>
                        <div>0x066.....45fde</div>
                      </div>

                      <div className="text-center mt-3">
                        <Link to="#" className="btn btn-grad">
                          Add to wallet
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="accordion-item mb-2">
                  <h2 className="accordion-header" id="headingTwo">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="true"
                      aria-controls="headingTwo"
                    >
                      <div className="d-flex gap-2 align-items-center">
                        <div>
                          <img
                            src="/images/eth.png"
                            alt="token img"
                            width={"25px"}
                          />
                        </div>
                        <div>Custom Token</div>
                      </div>
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#tokenAccordion"
                  >
                    <div className="accordion-body">
                      <div className="d-flex justify-content-between mb-2">
                        <div className="text-gray">Name</div>
                        <div>Rally</div>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <div className="text-gray">Supply</div>
                        <div>1000000000000</div>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <div className="text-gray">Type</div>
                        <div>Custom Token</div>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <div className="text-gray">Created at</div>
                        <div>28 Aug 2024</div>
                      </div>
                      <hr />
                      <div className="d-flex justify-content-between mb-2">
                        <div className="text-gray">Symbol</div>
                        <div>Rally</div>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <div className="text-gray">Precision</div>
                        <div>18</div>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <div className="text-gray">Contract</div>
                        <div>0x066.....45fde</div>
                      </div>

                      <div className="text-center mt-3">
                        <Link to="#" className="btn btn-grad">
                          Add to wallet
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <FooterNav />
      </div>
    </>
  );
}

export default TokenList;
