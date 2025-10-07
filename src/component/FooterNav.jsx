import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";


export default function FooterNav() {
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    switch (location.pathname) {
      case "/home":
        setActiveIndex(0);
        break;
      case "/level":
        setActiveIndex(1);
        break;
      case "/Triangle":
        setActiveIndex(2);
        break;
      case "/rank":
        setActiveIndex(3);
        break;
      case "/invitefriends":
        setActiveIndex(4);
        break;
      default:
        setActiveIndex(null);
    }
  }, [location.pathname]);

  return (
    <div>
      {/* Mobile Navigation */}
      <nav className="nav">
        <Link
          to="/home"
          className={`nav-item ${activeIndex === 0 ? "is-active" : ""}`}
          onClick={() => setActiveIndex(0)}
        >
          <div className="navIconBg">
            {activeIndex === 0 ? (
              <img
                src="/images/MejoraLogo.png"
                className="navIcon"
                alt="logo"
              />
            ) : (
              <img
                src="/images/MejoraLogo.png"
                className="navIcon"
                alt="logo"
              />
            )}
          </div>
          <span>Home</span>
        </Link>

        <Link
          to="/wallet"
          className={`nav-item ${activeIndex === 1 ? "is-active" : ""}`}
          onClick={() => setActiveIndex(1)}
        >
          <div className="navIconBg">
            {activeIndex === 1 ? (
              <img
                src="/images/adjust-active.png"
                className="navIcon"
                alt="logo"
              />
            ) : (
              <img src="/images/adjust.png" className="navIcon" alt="logo" />
            )}
          </div>
          <span>Deposit</span>
        </Link>

        <Link
          to="/rank"
          className={`nav-item ${activeIndex === 2 ? "is-active" : ""}`}
          onClick={() => setActiveIndex(2)}
        >
          <div className="navIconBg">
            {activeIndex === 2 ? (
              <img
                src="/images/triangle-active.png"
                className="navIcon"
                alt="logo"
              />
            ) : (
              <img src="/images/rank-green.png" className="navIcon" alt="logo" />
            )}
          </div>
          <span>Rank</span>
        </Link>
        <Link
          to="/Deposithistory"
          className={`nav-item ${activeIndex === 3 ? "is-active" : ""}`}
          onClick={() => setActiveIndex(3)}
        >
          <div className="navIconBg">
            {activeIndex === 3 ? (
              <img
                src="/images/triangle.png"
                className="navIcon"
                alt="logo"
              />
            ) : (
              <img src="/images/rank.png" className="navIcon" alt="logo" />
            )}
          </div>
          <span>History</span>
        </Link>

        <Link
          to="/invitefriends"
          className={`nav-item ${activeIndex === 4 ? "is-active" : ""}`}
          onClick={() => setActiveIndex(4)}
        >
          <div className="navIconBg">
            {activeIndex === 4 ? (
              <img
                src="/images/friends-green.png"
                className="navIcon"
                alt="logo"
              />
            ) : (
              <img src="/images/friends.png" className="navIcon" alt="logo" />
            )}
          </div>
          <span>Refer</span>
        </Link>
      </nav>
    </div>
  );
}
