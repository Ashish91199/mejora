import { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import { FiUserPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import FooterNav from "./component/FooterNav";
import { RWebShare } from "react-web-share";
import { getUserLevel } from "./helper/apifunction";
import ReferralList from "./ReferralList";

// Import toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function InviteFriends() {
  const [user, setUser] = useState(null);
  const tokenRef = useRef(null);
  const [value, setValue] = useState(null);
  const [level, setLevel] = useState(1);
  const [level_data, setLevelData] = useState(null);

  useEffect(() => {
    if (window.Telegram?.WebApp?.initDataUnsafe?.user) {
      setUser(window.Telegram?.WebApp?.initDataUnsafe?.user);
    }
  }, [window.Telegram?.WebApp?.initDataUnsafe?.user]);

  // Initialize AOS on component mount
  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  useEffect(() => {
    if (user?.id) {
      setValue(`https://t.me/@MejoraBot_bot?start=${user?.id}`);
    }
    console.log(user, "user");
  }, [user]);

  useEffect(() => {
    if (user) {
      const getLevel = async () => {
        try {
          const res = await getUserLevel(user?.id, level);
          setLevelData(res?.user);
        } catch (error) {
          console.error("Error during getLevel:", error);
        }
      };
      getLevel();
    }
  }, [user]);

  // Function to copy text to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast.success("Link copied to clipboard!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
        });
      })
      .catch(err => {
        toast.error("Failed to copy!", {
          position: "top-center",
          autoClose: 2000,
        });
        console.error("Failed to copy: ", err);
      });
  };

  const shareToTelegram = () => {
    const message = "Check out this useful Mejora Mini App for managing your transactions!";
    const url = encodeURIComponent(value); // Assuming `value` is your app URL
    const telegramUrl = `https://t.me/share/url?url=${url}&text=${encodeURIComponent(message)}`;

    window.open(telegramUrl, '_blank'); // Open in a new tab
  };

  return (
    <>
      <div className="page_container">
        <div className="inner_page_layout">
          <div className="mb-5">
            <div className="mb-3 text-center">
              <h4 className="mb-1">Invite friends!</h4>
              <p className="text-lgray fs-12 mb-0">
                Refer & Earn
              </p>
            </div>
            <div className="card mb-2">
              <div className="card-body">
                <div className="d-flex gap-2">
                  <div>
                    <img src="/images/invite.png" alt="" />
                  </div>
                  <div>
                    <div className="mb-1" value={value}>Refer & Earn</div>
                    <div>
                      <img
                        src="/images/MejoraLogo.png"
                        alt=""
                        width={"25px"}
                      />
                      <span className="text-green ms-1">$5 Bonus Each 🎁</span>when you invite a friend
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <ReferralList userId={"MEJ3875905"} />
          </div>
          <div className="invite_fixed_wrapper">
            <div className="d-flex gap-2">
              <div className="flex-grow-1 content_area text-center fs-16" style={{ cursor: 'pointer' }} onClick={shareToTelegram}>
                <span>
                  🎁 Invite & Get $5
                  <FiUserPlus className="ms-2" />
                </span>
              </div>

              <div className="action_wrapper">
                <img
                  src="/images/copy.png"
                  width={"20px"}
                  alt=""
                  onClick={() => copyToClipboard(value)}
                  style={{ cursor: 'pointer' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterNav />
      <ToastContainer /> {/* Add toast container */}
    </>
  );
}

export default InviteFriends;
