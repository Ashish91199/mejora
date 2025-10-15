import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { FiDollarSign } from "react-icons/fi";
import { Link } from "react-router-dom";
import FooterNav from "./component/FooterNav";
import { getRank } from "./helper/apifunction";

function Rank() {
  const [user, setUser] = useState(null);
  const [data, setUserData] = useState(null);
  const [rankHistory, setRankHistory] = useState([]);

  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  useEffect(() => {
    const tgUser = window.Telegram?.WebApp?.initDataUnsafe?.user;
    if (tgUser) setUser(tgUser);
  }, []);

  useEffect(() => {
    if (user?.id) {
      const fetchRankData = async () => {
        try {
          const res = await getRank(user.id);
          setUserData(res?.data || null);
          setRankHistory(res?.result || []);
        } catch (error) {
          console.error("Error loading rank:", error);
        }
      };
      fetchRankData();
    }
  }, [user?.id]);

  return (
    <>
      <div className="dep-hist-holder-container">
        <div className="dep-hist-title pt-3 pb-4">Rank History</div>

        {rankHistory.length > 0 ? (
          rankHistory.map((item, index) => (
            <div
              className="dep-hist-card mb-4"
              key={index}
              data-aos="fade-up"
            >
              <div className="dep-hist-serial-badge">{index + 1}</div>
              <div className="dep-hist-card-body">
                <div className="dep-hist-card-content">

                  <div className="dep-hist-card-item">
                    <div className="dep-hist-icon">
                      <div className="circle_bg">
                        {item?.first_name?.slice(0, 2)?.toUpperCase() || "--"}
                      </div>
                    </div>
                    <div>
                      <span className="dep-hist-label">Username</span>
                      <br />
                      <span className="dep-hist-value">{item?.username || "N/A"}</span>
                    </div>
                  </div>

                  <div className="dep-hist-card-item">
                    <div className="dep-hist-icon"><FiDollarSign /></div>
                    <div>
                      <span className="dep-hist-label">Rank Income</span>
                      <br />
                      <span className="dep-hist-value">{item?.amount} Mejora</span>
                    </div>
                  </div>

                  <div className="dep-hist-card-item">
                    <div className="dep-hist-icon">
                      <img
                        src={`/images/${item?.rank === 1 ? "gold" : item?.rank === 2 ? "silver" : "bronze"
                          }.png`}
                        width="20"
                        alt="Rank Icon"
                      />
                    </div>
                  </div>

                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="dep-hist-card">
            <div className="dep-hist-card-body dep-hist-empty-state">
              <p className="dep-hist-text-gray mb-0">No rank history available</p>
            </div>
          </div>
        )}
      </div>

      <FooterNav />
    </>
  );
}

export default Rank;
