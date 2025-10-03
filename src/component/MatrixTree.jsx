import React, { useState } from "react";
import "./tree.css";

const MatrixTree  = ({ dataarr }) => {
  // Ensure dataarr is an array
  const safeDataArr = Array.isArray(dataarr) ? dataarr : [];

  return (
    <div>
      <section className="main-dash-container">
        <div className="container">
          <div id="ContentPlaceHolder1_UpdatePanel1">
            <div className="row d-flex">
              {safeDataArr &&
                safeDataArr.map((data, i) => (
                  <div key={i} id="ContentPlaceHolder1_DAI11Tree">
                    <div className="mytreebox">
                      <div className="mytreebox-body">
                        <div className="mytree">
                          <div className="mytree-l1">
                            <div
                              id="ContentPlaceHolder1_da102"
                              className="mytree-item"
                            >
                              <div className="mytree-icon">{data.name}</div>
                            </div>
                          </div>

                          <div className="mytree-l2">
                            {data?.children?.length ? data?.children?.length > 0 && (
                              <div
                                id="ContentPlaceHolder1_l110"
                                className="mytree-item"
                              >
                                <div className="mytree-icon">
                                  {data.children[0].name}
                                </div>
                              </div>
                            ):
                            <div
                                id="ContentPlaceHolder1_l110"
                                className="mytree-item"
                              >
                                <div className="mytree-icon">
                                  &nbsp;
                                </div>
                              </div>}

                            {data?.children?.length ? data?.children?.length > 1 && (
                              <div
                                id="ContentPlaceHolder1_l111"
                                className="mytree-item"
                              >
                                <div className="mytree-icon">
                                  {data.children[1].name}
                                </div>
                              </div>
                            ):<div
                            id="ContentPlaceHolder1_l111"
                            className="mytree-item"
                          >
                            <div className="mytree-icon">
                              &nbsp;
                            </div>
                          </div>}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MatrixTree;
