import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import FooterNav from "./component/FooterNav";
import { Link } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { getProfile } from "./helper/apifunction";
import { FiUser, FiDollarSign, FiHash, FiCalendar } from "react-icons/fi";

function Wallet() {
  const [activeTab, setActiveTab] = useState("tab1");
  const [user, setUser] = useState(null);
  const [user_data, setUserData] = useState(null);

  const handleTabClick = (tab) => setActiveTab(tab);

  // Telegram WebApp user init
  useEffect(() => {
    if (window.Telegram?.WebApp?.initDataUnsafe?.user) {
      setUser(window.Telegram?.WebApp?.initDataUnsafe?.user);
    }
  }, [window.Telegram?.WebApp?.initDataUnsafe?.user]);

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 600, easing: "ease-in-out", once: true });
  }, []);

  // Fetch user profile

  useEffect(() => {
    const fetchLevelIncome = async () => {
      try {
        const res = await getlevelincome(user?.id);
        console.log(res, "res1111");
        setUserData(res?.data); // res.data should be an array of income objects
      } catch (error) {
        console.error("Error fetching level income:", error);
      }
    };

    if (user) fetchLevelIncome();
  }, [user]);


  return (
    <>
      <div className="page_container">
        <div className="inner_page_layout">
          {/* Back Button & Logo */}
          <div className="position-relative mb-5 py-1">
            <div className="backButton">
              <Link className="anchor_pointer text-white" to="/home">
                <MdKeyboardArrowLeft className="fs-1" />
              </Link>
            </div>
            <div className="mb-3 text-center">
              <img
                src="/images/MejoraLogo.png"
                width="60px"
                alt="logo"
                data-aos="zoom-in"
              />
            </div>

            {/* Top Row Tabs */}
            <div className="tabs-header d-flex justify-content-between mb-3">
              <div
                className={`tab ${activeTab === "tab1" ? "active" : ""}`}
                onClick={() => handleTabClick("tab1")}
              >
                Rank Income
              </div>
              <div
                className={`tab ${activeTab === "tab2" ? "active" : ""}`}
                onClick={() => handleTabClick("tab2")}
              >
                Level Income
              </div>
              <div
                className={`tab ${activeTab === "tab3" ? "active" : ""}`}
                onClick={() => handleTabClick("tab3")}
              >
                Spin List
              </div>
            </div>

            {/* Second Row Tab */}
            {/* <div className="tabs-header d-flex justify-content-center mb-3">
              <div
                className={`tab ${activeTab === "tab4" ? "active" : ""}`}
                onClick={() => handleTabClick("tab4")}
              >
                Spin List
              </div>
            </div> */}

            {/* Tabs Content */}
            <div className="tabs-content">
              {/* Tab 1 - Rank Income */}



              {activeTab === "tab1" && (
                <div className="fancy-table-wrapper">
                  <table className="fancy-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>From User</th>
                        <th>Rank</th>
                        <th>Amount</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {user_data?.length > 0 ? (
                        user_data.map((item, index) => (
                          <tr key={item._id}>
                            <td>{index + 1}</td>
                            <td>
                              <FiDollarSign className="f-icon yellow" /> {item.from_user}
                            </td>
                            <td>
                              <FiHash className="f-icon blue" /> {item.level}
                            </td>
                            <td>
                              <FiHash className="f-icon green" /> {item.amount}
                            </td>
                            <td>
                              <FiCalendar className="f-icon pink" />{" "}
                              {new Date(item.createdAt).toLocaleString()}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5}>No data available</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}





              {/* Tab 2 - Referral/Level Income */}
              {activeTab === "tab2" && (
                <div className="fancy-table-wrapper">
                  <table className="fancy-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>From User</th>
                        <th>Level</th>
                        <th>Amount</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {user_data?.length > 0 ? (
                        user_data.map((item, index) => (
                          <tr key={item._id}>
                            <td>{index + 1}</td>
                            <td>
                              <FiDollarSign className="f-icon yellow" /> {item.from_user}
                            </td>
                            <td>
                              <FiHash className="f-icon blue" /> {item.level}
                            </td>
                            <td>
                              <FiHash className="f-icon green" /> {item.amount}
                            </td>
                            <td>
                              <FiCalendar className="f-icon pink" />{" "}
                              {new Date(item.createdAt).toLocaleString()}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5}>No data available</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Tab 3 - Spin Income */}
              {activeTab === "tab3" && (
                <div className="fancy-table-wrapper">
                  <table className="fancy-table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>User ID</th>
                        <th>prize</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {user_data?.length > 0 ? (
                        user_data.map((item, index) => (
                          <tr key={item._id}>
                            <td>{index + 1}</td>
                            <td>
                              <FiDollarSign className="f-icon yellow" /> {item.from_user}
                            </td>

                            <td>
                              <FiHash className="f-icon green" /> {item.amount}
                            </td>
                            <td>
                              <FiCalendar className="f-icon pink" />{" "}
                              {new Date(item.createdAt).toLocaleString()}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5}>No data available</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Tab 4 - Spin List */}
              {/* {activeTab === "tab4" && (
                <div className="content card p-3 text-center">
                  <h6 className="text-gray">Spin List</h6>
                  {user_data?.spinList?.length > 0 ? (
                    <ul className="list-group mt-2">
                      {user_data.spinList.map((spin, index) => (
                        <li key={index} className="list-group-item">
                          Spin #{index + 1}: {spin.amount}$
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No spins yet.</p>
                  )}
                </div>
              )} */}
            </div>


          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <FooterNav />
    </>
  );
}

export default Wallet;
