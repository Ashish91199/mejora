import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

import { Link } from "react-router-dom";
import FooterNav from "./component/FooterNav";
import { IoIosCloseCircle } from "react-icons/io";
import { MdKeyboardArrowLeft } from "react-icons/md";

function Profile() {
  // Initialize AOS on component mount
  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  // Function to open modal and set selected day
  const handleCardClick = (day) => {
    setSelectedDay(day);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="page_container">
        <div className="inner_page_layout">
          <div>
            <div className="position-relative mb-3 pb-1">
              <div className="backButton">
                <Link className="anchor_pointer text-white" to="/home">
                  <MdKeyboardArrowLeft className="fs-1" />
                </Link>
              </div>
              <div className="text-center">
                <h4 className="">Profile</h4>
              </div>
            </div>
            <div className="cards mb-2">
              <div className="card-body">
                <div className="d-flex gap-3 align-items-center">
                  <div className="profile-photo">
                    <img src="/images/user.png" width={"36px"} alt="" />
                  </div>
                  <div>
                    <div className="fs-16">David Will</div>
                  </div>
                </div>
              </div>
            </div>
            <hr />

            <div className="card my-3">
              <div className="card-body">
                <div className="d-flex justify-content-between mb-4">
                  <div>Achievements</div>
                  <div>
                    <Link className="btn btn-primary btn-sm">See All</Link>
                  </div>
                </div>
                <div className="profile_badge_wrapper">
                  {Array.from({ length: 30 }, (_, index) => (
                    <div key={index} className="square_bg_2">
                      <div className="day_txt">
                        <img src="/images/diamond.png" width={"32px"} alt="" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterNav />
    </>
  );
}

export default Profile;
