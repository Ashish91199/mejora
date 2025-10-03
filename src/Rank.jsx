import { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

import { FaHandHoldingDroplet } from "react-icons/fa6";
import { AiOutlineSwap } from "react-icons/ai";
import { SiRocket } from "react-icons/si";
import { MdOutlineToken } from "react-icons/md";
import { Link } from "react-router-dom";
import FooterNav from "./component/FooterNav";
import { getRank } from "./helper/apifunction";
import { formatNumber } from "./helper/Math";

function Rank() {
  const [user, setUser] = useState(null);
  const [data, setUserData] = useState(null);
  const [rank_history, setRankHistory] = useState(null);

  // Initialize AOS on component mount
  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  useEffect(() => {
    if (window.Telegram?.WebApp?.initDataUnsafe?.user) {
      setUser(window.Telegram?.WebApp?.initDataUnsafe?.user)
    }
  }, [window.Telegram?.WebApp?.initDataUnsafe?.user]);
  useEffect(() => {
    if (user) {
      const Rank = async () => {
        try {
          const res = await getRank(user?.id);
          setUserData(res?.data);
          setRankHistory(res?.result)
        } catch (error) {
          console.error("Error during signup:", error);
        }
      };

      Rank();
    }

  }, [user?.id])

  return (
    <>
      <div className="page_container">
        <div className="inner_page_layout">
          {/* align */}
          <div>
            <div className="mb-3 text-center">
              <h4 className="mb-1">Deposit History</h4>
            </div>
            <div className="card mb-2">
              <div className="card-body">
                <div className="d-flex gap-2 justify-content-between align-items-center">
                  <div className="d-flex gap-3 align-items-center">
                    <div className="circle_bg">{data?.first_name?.slice(0, 2).toUpperCase()}</div>
                    <div className="">
                      <p className="mb-0">{data?.username ? data?.username : data?.first_name + " " + data?.last_name}</p>
                      <div className="text-gray">{data?.amount} NULL</div>
                    </div>
                  </div>
                  <div>#{data?.rank}</div>
                </div>
              </div>
            </div>

            <div className="holder-container">
              <div className="pt-3 pb-4">{formatNumber(data?.holder)} holders</div>

              {rank_history && rank_history.map((item) => {
                const firstNameAbbr = item?.first_name?.slice(0, 2).toUpperCase(); // Get the first two characters in uppercase

                return (
                  <div className="d-flex gap-2 justify-content-between align-items-center mb-3" key={item?.username || item?.first_name}>
                    <div className="d-flex gap-3 align-items-center">
                      <div className="circle_bg">{firstNameAbbr}</div> {/* Display the two-letter abbreviation */}
                      <div>
                        <p className="mb-0">
                          {item?.username ? item?.username : item?.first_name + " " + item?.last_name}
                        </p>
                        <div className="text-gray">
                          {item?.amount} INRx
                        </div>
                      </div>
                    </div>

                    {item?.rank === 1 ? (
                      <div><img src="/images/gold.png" width={"17px"} alt="Gold" /></div>
                    ) : item?.rank === 2 ? (
                      <div><img src="/images/silver.png" width={"17px"} alt="Silver" /></div>
                    ) : item?.rank === 3 ? (
                      <div><img src="/images/bronze.png" width={"17px"} alt="Bronze" /></div>
                    ) : <div>#{item?.rank}</div>}
                  </div>
                );
              })}

            </div>
          </div>
        </div>
      </div>
      <FooterNav />
    </>
  );
}

export default Rank;
