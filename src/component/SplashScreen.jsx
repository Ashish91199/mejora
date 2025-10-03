import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import { useNavigate, Link } from "react-router-dom";

import { BsTwitterX } from "react-icons/bs";
import { FaYoutube } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";
import { signup_user } from "../helper/apifunction";

function SplashScreen() {
  const [user, setUser] = useState(null);
  const [ref, setRef] = useState(null);
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  const refParam = params.get('ref'); const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (window.Telegram?.WebApp?.initDataUnsafe?.user) {
      setUser(window.Telegram?.WebApp?.initDataUnsafe?.user)
    }
  }, [window.Telegram?.WebApp?.initDataUnsafe?.user]);
  useEffect(() => {
    // Initialize AOS on component mount
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
    });

    // Progress bar increment and navigation logic
    let start = null;
    const duration = 4000;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progressTime = timestamp - start;
      const progressValue = Math.min((progressTime / duration) * 100, 100);
      setProgress(progressValue);

      if (progressValue < 100) {
        requestAnimationFrame(step);
      }
    };

    // Start the animation
    const animationFrame = requestAnimationFrame(step);

    // Cleanup: Cancel the animation frame if the component unmounts
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  useEffect(() => {
    // Convert to a number if refParam exists, otherwise keep ref as null
    setRef(refParam ? Number(refParam) : null);
  }, [refParam]);

  useEffect(() => {
    if (user && progress === 100) {
      const signup = async () => {
        try {
          const res = await signup_user(ref, user);
          console.log("Response:", res);

          if (res.status === 200) {
            navigate("/home");
          }
        } catch (error) {
          console.error("Error during signup:", error);
        }
      };

      signup();
    }
  }, [ref, user, progress, navigate]);

  return (
    <>
      <div className="page_container">
        {/* Progress Bar */}
        <div className="progress_bar">
          <div
            className="progress_fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="splash_layout">
          <div className="text-center">
            <img
              src="/images/logo.png"
              alt="logo"
              className="img-fluid splash-logo mb-5"
            />
            <div className="app_name">Mejora Mini Apps</div>
            <div className="lighter_text">will be launched</div>
            <div className="bold_text">on Mejora</div>
            <div className="lighter_text mb-1">Stay tuned</div>
            <div className="fs-14">More info in official channels</div>
          </div>

          <div className="d-flex gap-2 justify-content-center mt-5">
            <div className="social_icon_bg">
              <FaTelegramPlane />
            </div>
            <div className="social_icon_bg">
              <FaYoutube />
            </div>
            <div className="social_icon_bg">
              <BsTwitterX />
            </div>
          </div>
          <div className="d-flex justify-content-center mt-4">
            <div className="col-12 col-md-6"> {/* Optional: col-md-6 for smaller width on large screens */}
              <Link to="/home">
                <button className="btn btn-darker coloryellow w-100">
                  Go to Home
                </button>
              </Link>
            </div>
          </div>

        </div>

      </div>
    </>
  );
}

export default SplashScreen;
