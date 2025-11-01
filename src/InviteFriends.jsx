import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FiUserPlus, FiShare2, FiCopy } from "react-icons/fi";
import { Link } from "react-router-dom";
import FooterNav from "./component/FooterNav";
import { getUserLevel } from "./helper/apifunction";
import ReferralList from "./ReferralList";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAccount } from "wagmi";

/* --------------------------------------------------------------
   Share Box with Copy Button Component
   -------------------------------------------------------------- */
const ShareBox = ({ title, link, platform, icon, onCopy, bgColor }) => {
  return (
    <div 
      className="rounded-4 p-3 mb-3 share-box-hover"
      style={{
        background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
        border: "1px solid rgba(243, 186, 47, 0.3)",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        transition: "all 0.3s ease",
        cursor: "pointer",
      }}
      data-aos="fade-up"
      onClick={() => onCopy(link, platform)}
    >
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <div
            className="rounded-circle d-flex align-items-center justify-content-center me-3"
            style={{
              width: "48px",
              height: "48px",
              background: bgColor,
              color: "#000",
              fontWeight: "bold",
              fontSize: "1.2rem",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            {icon}
          </div>
          <div>
            <div className="fw-bold fs-14" style={{ color: "#f3ba2f" }}>{title}</div>
            <div className="fs-12 text-white-50">Tap to copy link</div>
          </div>
        </div>
        
        <div className="d-flex align-items-center">
          <div
            className="rounded-3 d-flex align-items-center justify-content-center px-3 py-2"
            style={{
              backgroundColor: "rgba(243, 186, 47, 0.1)",
              border: "1px solid rgba(243, 186, 47, 0.3)",
            }}
          >
            <FiCopy className="me-2" style={{ color: "#f3ba2f" }} />
            <span className="fs-12 fw-semibold" style={{ color: "#f3ba2f" }}>Copy</span>
          </div>
        </div>
      </div>
      
      <div 
        className="rounded-3 p-2 mt-2"
        style={{
          background: "rgba(0, 0, 0, 0.3)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          overflow: "hidden",
        }}
      >
        <div className="fs-12 text-white-50 text-truncate">
          {link || "Loading..."}
        </div>
      </div>
    </div>
  );
};

/* --------------------------------------------------------------
   Enhanced Main InviteFriends Component
   -------------------------------------------------------------- */
function InviteFriends() {
  const { address } = useAccount();
  const [user, setUser] = useState(null);
  const [tgLink, setTgLink] = useState("");
  const [dappLink, setDappLink] = useState("");
  const [levelData, setLevelData] = useState(null);
  const level = 1;

  /* ---- Telegram Mini-App user detection ---- */
  useEffect(() => {
    if (window.Telegram?.WebApp?.initDataUnsafe?.user) {
      setUser(window.Telegram.WebApp.initDataUnsafe.user);
    }
  }, []);

  /* ---- AOS init ---- */
  useEffect(() => {
    AOS.init({ duration: 600, easing: "ease-in-out", once: true });
  }, []);

  /* ---- Build referral links (wallet address) ---- */
  useEffect(() => {
    if (!address) return;

    const TG_BOT_USERNAME = "MejoraBot_bot";
    const telegramDeepLink = `https://t.me/${TG_BOT_USERNAME}?start=${user?.id || ""}`;
    const webDappLink = `https://mejora.cloud/register?user=${address}`;

    setTgLink(telegramDeepLink);
    setDappLink(webDappLink);
  }, [address, user]);

  /* ---- Optional: fetch user level ---- */
  useEffect(() => {
    if (user?.id && address) {
      const fetchLevel = async () => {
        try {
          const res = await getUserLevel(user.id, level);
          setLevelData(res?.user);
        } catch (err) {
          console.error("Error fetching level:", err);
        }
      };
      fetchLevel();
    }
  }, [user, address, level]);

  /* ---- Enhanced Copy to clipboard ---- */
  const copyToClipboard = (text, platform) => {
    if (!text) {
      toast.error("Link not ready yet!", { 
        position: "top-center", 
        autoClose: 2000,
        closeButton: true,
      });
      return;
    }

    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success(`${platform} link copied!`, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeButton: true,
        });
      })
      .catch(() => {
        toast.error("Failed to copy!", { 
          position: "top-center", 
          autoClose: 2000,
          closeButton: true,
        });
      });
  };

  /* ---- Open Telegram bot with referral ---- */
  const shareViaTelegram = () => {
    if (tgLink && window.Telegram?.WebApp?.openLink) {
      window.Telegram.WebApp.openLink(tgLink);
    } else {
      window.open(tgLink, "_blank");
    }
  };

  return (
    <>
      <div className="page_container">
        <div className="inner_page_layout">
          <div className="position-relative mb-5 py-1">
            <div className="backButton mb-3">
              <Link 
                className="anchor_pointer text-white d-flex align-items-center" 
                to="/home"
                style={{ textDecoration: 'none' }}
              >
                <MdKeyboardArrowLeft className="fs-2" />
                <span className="ms-1 fs-14">Back</span>
              </Link>
            </div>

            <div className="mb-5">
              <div className="mb-4 text-center" data-aos="fade-down">
                <h4 className="mb-2 fw-bold" style={{ color: "#f3ba2f" }}>Invite Friends & Earn</h4>
                <p className="text-lgray fs-14 mb-0">Share your referral link and get 5% bonus from each friend</p>
              </div>

              <div 
                className="card mb-4 border-0" 
                style={{
                  background: "linear-gradient(135deg, rgba(243, 186, 47, 0.1) 0%, rgba(243, 186, 47, 0.05) 100%)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(243, 186, 47, 0.2)"
                }}
                data-aos="fade-up"
              >
                <div className="card-body py-3">
                  <div className="d-flex gap-3 align-items-center">
                    <div 
                      className="rounded-3 d-flex align-items-center justify-content-center"
                      style={{
                        width: "60px",
                        height: "60px",
                        background: "linear-gradient(135deg, #f3ba2f 0%, #ffd700 100%)",
                      }}
                    >
                      <FiUserPlus className="fs-4 text-dark" />
                    </div>
                    <div className="flex-grow-1">
                      <div className="mb-2 fw-bold fs-16" style={{ color: "#f3ba2f" }}>Referral Program</div>
                      <div className="d-flex align-items-center">
                        <img src="/images/MejoraLogo.png" alt="Mejora" width="28" />
                        <span className="text-success ms-2 fw-semibold">Earn 5% Bonus</span>
                        <span className="text-white-50 ms-2 fs-13">for each successful referral</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-4" data-aos="fade-up" data-aos-delay="100">
                <div className="text-center mb-3">
                  <h6 className="fw-bold" style={{ color: "#f3ba2f" }}>Share Your Referral Links</h6>
                  <p className="text-white-50 fs-12 mb-0">Tap on any box to copy the link</p>
                </div>
                
                <div className="px-2">
                  {/* Conditionally render Telegram ShareBox only if user exists (Telegram Mini-App) */}
                  {user && (
                    <ShareBox
                      title="Telegram Referral"
                      link={tgLink}
                      platform="Telegram"
                      icon="T"
                      onCopy={copyToClipboard}
                      bgColor="linear-gradient(135deg, #229ED9 0%, #1e88c7 100%)"
                    />
                  )}
                  
                  <ShareBox
                    title="Web App Referral"
                    link={dappLink}
                    platform="DApp"
                    icon="W"
                    onCopy={copyToClipboard}
                    bgColor="linear-gradient(135deg, #f3ba2f 0%, #ffd700 100%)"
                  />
                </div>
              </div>

              {levelData && (
                <div 
                  className="row text-center mb-4" 
                  data-aos="fade-up" 
                  data-aos-delay="200"
                >
                  <div className="col-4">
                    <div className="fw-bold fs-18" style={{ color: "#f3ba2f" }}>{levelData.referrals || 0}</div>
                    <div className="fs-12 text-white-50">Referrals</div>
                  </div>
                  <div className="col-4">
                    <div className="fw-bold fs-18" style={{ color: "#f3ba2f" }}>{levelData.level || 1}</div>
                    <div className="fs-12 text-white-50">Level</div>
                  </div>
                  <div className="col-4">
                    <div className="fw-bold fs-18" style={{ color: "#f3ba2f" }}>5%</div>
                    <div className="fs-12 text-white-50">Bonus Rate</div>
                  </div>
                </div>
              )}

              <ReferralList />

              <div 
                className="invite_fixed_wrapper rounded-4 p-3"
                style={{
                  background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
                  border: "1px solid rgba(243, 186, 47, 0.3)",
                  boxShadow: "0 -4px 20px rgba(0, 0, 0, 0.3)"
                }}
              >
                <div className="d-flex gap-3 align-items-center">
                  <div
                    className="flex-grow-1 content_area text-center py-2 rounded-3"
                    style={{ 
                      cursor: "pointer",
                      background: "linear-gradient(135deg, #f3ba2f 0%, #ffd700 100%)",
                      color: "#000",
                      fontWeight: "600",
                      transition: "all 0.3s ease"
                    }}
                    // onClick={shareViaTelegram}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.boxShadow = "0 4px 12px rgba(243, 186, 47, 0.4)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow = "none";
                    }}
                  >
                    <span className="d-flex align-items-center justify-content-center">
                      Share & Earn 5% Bonus
                      <FiShare2 className="ms-2 fs-5" />
                    </span>
                  </div>

                  <div className="action_wrapper d-flex gap-2">
                    {/* Conditionally render Telegram copy button */}
                    {user && (
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center"
                        style={{
                          width: "40px",
                          height: "40px",
                          backgroundColor: "rgba(34, 158, 217, 0.1)",
                          border: "1px solid rgba(34, 158, 217, 0.3)",
                          cursor: "pointer",
                          transition: "all 0.3s ease"
                        }}
                        onClick={() => copyToClipboard(tgLink, "Telegram")}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = "rgba(34, 158, 217, 0.2)";
                          e.target.style.transform = "scale(1.1)";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = "rgba(34, 158, 217, 0.1)";
                          e.target.style.transform = "scale(1)";
                        }}
                      >
                        <FiCopy style={{ color: "#229ED9" }} />
                      </div>
                    )}
                    
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        width: "40px",
                        height: "40px",
                        border: "1px solid rgba(34, 158, 217, 0.3)",
                        cursor: "pointer",
                        transition: "all 0.3s ease"
                      }}
                      onClick={() => copyToClipboard(dappLink, "DApp")}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "rgba(243, 186, 47, 0.2)";
                        e.target.style.transform = "scale(1.1)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "rgba(243, 186, 47, 0.1)";
                        e.target.style.transform = "scale(1)";
                      }}
                    >
                      <FiShare2 style={{ color: "#f3ba2f" }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterNav />
      <ToastContainer 
        toastStyle={{
          background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
          color: "#fff",
          border: "1px solid rgba(243, 186, 47, 0.3)"
        }}
      />
      
      <style jsx>{`
        .share-box-hover:hover {
          transform: translateY(-2px);
          border-color: rgba(243, 186, 47, 0.6) !important;
          box-shadow: 0 6px 16px rgba(243, 186, 47, 0.2) !important;
        }
      `}</style>
    </>
  );
}

export default InviteFriends;