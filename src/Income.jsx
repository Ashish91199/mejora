import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import FooterNav from "./component/FooterNav";
import { Link } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { getlevelincome, getProfile, getRankIncome, getSpinner } from "./helper/apifunction";
import { FiUser, FiDollarSign, FiHash, FiCalendar } from "react-icons/fi";
import { FaDollarSign, FaRegCalendarCheck, FaUser } from "react-icons/fa6";
import { PercentIcon } from "lucide-react";

function Wallet() {
  const [activeTab, setActiveTab] = useState("tab1");
  const [user, setUser] = useState(null);
  const [user_data, setUserData] = useState(null);
  const [spinnData, setSpinnData] = useState(null);
  const [rankData, setRankData] = useState(null);

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
    const fetchRankIncome = async () => {
      try {
        const res = await getRankIncome(user?.id);
        console.log(res, "res1111");
        if (res?.success)
          setRankData(res?.data); // res.data should be an array of income objects
      } catch (error) {
        console.error("Error fetching level income:", error);
      }
    };

    if (user?.id)
      fetchRankIncome();
  }, [user?.id, activeTab === "tab1"]);

  useEffect(() => {
    const fetchLevelIncome = async () => {
      try {
        const res = await getlevelincome(user?.id);
        console.log(res, "res1111");
        if (res?.success)
          setUserData(res?.data); // res.data should be an array of income objects
      } catch (error) {
        console.error("Error fetching level income:", error);
      }
    };

    if (user?.id)
      fetchLevelIncome();
  }, [user?.id, activeTab === "tab2"]);

  useEffect(() => {
    const fetchSpinnerData = async () => {
      try {
        const res = await getSpinner(user?.id);
        console.log(res, "res1111");
        if (res?.success)
          setSpinnData(res?.data); // res.data should be an array of income objects
      } catch (error) {
        console.error("Error fetching level income:", error);
      }
    };
    if (user?.id)
      fetchSpinnerData();
  }, [activeTab === "tab3", user?.id]);
  console.log({ user })
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
                <div className="overflow-x-auto fancy-table-wrapper">
                  <table className="fancy-table w-full border-collapse text-white rounded-xl shadow-lg backdrop-blur-md bg-white/20 border border-white/30">
                    <thead>
                      <tr className="bg-white/10">
                        <th className="p-2 text-left">#</th>
                        <th className="p-2 text-left">Date</th>
                        <th className="p-2 text-left">Rank</th>
                        <th className="p-2 text-left">Rank Income</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rankData?.length > 0 ? (
                        rankData.map((item, index) => (
                          <tr key={item._id} className="border-b border-white/30">
                            <td className="p-2">{index + 1}</td>
                            <td className="p-2">
                              <FiCalendar className="f-icon pink inline mr-1" />
                              {new Date(item.createdAt).toLocaleString()}
                            </td>
                            <td className="p-2">
                              <FaRegCalendarCheck className="f-icon yellow inline mr-1" />
                              {item.rank}
                            </td>
                            <td className="p-2">
                              <FaDollarSign className="f-icon blue inline mr-1" />
                              {Number(item.receivedAmount || 0).toFixed(2)}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="text-center p-4">No data available</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Tab 2 - Referral/Level Income */}
              {activeTab === "tab2" && (
                <div className="overflow-x-auto fancy-table-wrapper">
                  <table className="fancy-table w-full border-collapse text-white rounded-xl shadow-lg backdrop-blur-md bg-white/20 border border-white/30">
                    <thead>
                      <tr className="bg-white/10">
                        <th className="p-2 text-left">#</th>
                        <th className="p-2 text-left">Date</th>
                        <th className="p-2 text-left">From User</th>
                        <th className="p-2 text-left">Level</th>
                        <th className="p-2 text-left">%</th>
                        <th className="p-2 text-left">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {user_data?.length > 0 ? (
                        user_data.map((item, index) => (
                          <tr key={item._id} className="border-b border-white/30">
                            <td className="p-2">{index + 1}</td>
                            <td className="p-2">
                              <FiCalendar className="f-icon pink inline mr-1" />
                              {new Date(item.createdAt).toLocaleString()}
                            </td>
                            <td className="p-2">
                              <FiDollarSign className="f-icon yellow inline mr-1" />
                              {item.from_user}
                            </td>
                            <td className="p-2">
                              <FiHash className="f-icon blue inline mr-1" />
                              {item.level}
                            </td>
                            <td className="p-2">{item.percentage}%</td>
                            <td className="p-2">
                              <FiHash className="f-icon green inline mr-1" />
                              {item.amount}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="text-center p-4">No data available</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Tab 3 - Spin Income */}
              {activeTab === "tab3" && (
                <div className="overflow-x-auto fancy-table-wrapper">
                  <table className="fancy-table w-full border-collapse text-white rounded-xl shadow-lg backdrop-blur-md bg-white/20 border border-white/30">
                    <thead>
                      <tr className="bg-white/10">
                        <th className="p-2 text-left">#</th>
                        <th className="p-2 text-left">Date</th>
                        <th className="p-2 text-left">User ID</th>
                        <th className="p-2 text-left">Prize</th>
                      </tr>
                    </thead>
                    <tbody>
                      {spinnData?.length > 0 ? (
                        spinnData.map((item, index) => (
                          <tr key={item._id} className="border-b border-white/30">
                            <td className="p-2">{index + 1}</td>
                            <td className="p-2">
                              <FiCalendar className="f-icon pink inline mr-1" />
                              {new Date(item.createdAt).toLocaleString()}
                            </td>
                            <td className="p-2">
                              <FaUser className="f-icon yellow inline mr-1" />
                              {item.tuserId}
                            </td>
                            <td className="p-2">
                              <FiDollarSign className="f-icon blue inline mr-1" />
                              {item.prize}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="text-center p-4">No data available</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Tab 4 - Spin List (Optional) */}
              {activeTab === "tab4" && (
                <div className="content card p-3 text-center">
                  <h6 className="text-gray-300 mb-2">Spin List</h6>
                  {user_data?.spinList?.length > 0 ? (
                    <ul className="list-disc list-inside">
                      {user_data.spinList.map((spin, index) => (
                        <li key={index} className="p-1">
                          Spin #{index + 1}: {spin.amount}$
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No spins yet.</p>
                  )}
                </div>
              )}

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
