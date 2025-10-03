import React, { useState, useEffect } from "react";
import "./tree.css";
import { getLevel } from "../helper/apifunction";

const WorkingTree = ({ user_id, update }) => {

  const [safeDataArr, setsafeDataArr] = useState(null);

  const fetchUserMatrix = async (idd = null) => {
    if (user_id) {
      try {
        const res = await getLevel(user_id, idd);
        setsafeDataArr(res?.result);
      } catch (error) {
        console.error("Error during fetchUserMatrix:", error);
      }
    }
  };

  // Call fetchUserProfile when the user is available or update state changes
  useEffect(() => {
    fetchUserMatrix();
  }, [user_id, update]);
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
                              <div className="mytree-icon" onClick={() => {
                                fetchUserMatrix(data.name)
                              }}>{data.name}</div>
                            </div>
                          </div>

                          <div className="mytree-l2">
                            <div
                              id="ContentPlaceHolder1_l110"
                              className="mytree-item"
                            >
                              <div className="mytree-icon"
                                onClick={() => {
                                  if (data?.children[0]?.name)
                                    fetchUserMatrix(data?.children[0]?.name)
                                }}>
                                {data?.children[0]?.name ? data?.children[0]?.name : ""}
                              </div>
                              <div className="mytree-l3">
                                {data?.children[0]?.children?.length > 0 ? data?.children[0]?.children?.map((child, index) => (
                                  <div key={index} className="mytree-item">
                                    <div className="mytree-icon" onClick={() => {
                                      fetchUserMatrix(child.name)
                                    }}>
                                      {child.name}
                                    </div>
                                  </div>
                                )) :
                                  <>
                                    <div className="mytree-item">
                                      <div className="mytree-icon">
                                        &nbsp;
                                      </div>
                                    </div>
                                    <div className="mytree-item">
                                      <div className="mytree-icon">
                                        &nbsp;
                                      </div>
                                    </div>
                                  </>
                                }
                              </div>
                            </div>


                            <div
                              id="ContentPlaceHolder1_l111"
                              className="mytree-item"
                            >
                              <div className="mytree-icon" onClick={() => {
                                if (data?.children[1]?.name)
                                  fetchUserMatrix(data?.children[1]?.name)
                              }}>
                                {data?.children[1]?.name ? data?.children[1]?.name : ""}
                              </div>
                              <div className="mytree-l3">
                                {data?.children[1]?.children?.length > 0 ? data?.children[1]?.children?.map((child, index) => (
                                  <div key={index} className="mytree-item">
                                    <div className="mytree-icon" onClick={() => {
                                      fetchUserMatrix(child.name)
                                    }}>
                                      {child.name}
                                    </div>
                                  </div>
                                )) :
                                  <>
                                    <div className="mytree-item">
                                      <div className="mytree-icon">
                                        &nbsp;
                                      </div>
                                    </div>
                                    <div className="mytree-item">
                                      <div className="mytree-icon">
                                        &nbsp;
                                      </div>
                                    </div>
                                  </>
                                }
                              </div>
                            </div>

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

export default WorkingTree;
