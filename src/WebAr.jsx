import React, { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import FooterNav from "./component/FooterNav";

function WebAr() {
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
                  <Link to="/WebAr" className="cursor_pointer">
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
              Tax Collector
              <MdKeyboardArrowRight className="fs-16 mx-1" />
              0.05M
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
                        <span className="badge bg-light rounded-pill">
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

        <div className="rounded-outer-container" data-aos="fade-up">
          <div className="rounded-container">
            <div className="pt-2 page_layout">

            </div>
          </div>
        </div>

        <FooterNav />
      </div>
    </>
  );
}

export default WebAr;
