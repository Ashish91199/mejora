import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

import { Link } from "react-router-dom";
import FooterNav from "./component/FooterNav";
import { IoIosCloseCircle } from "react-icons/io";

function ScratchBonus() {
  const [value, setValue] = useState(22749890);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);

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
            <div className="mb-3 text-center">
              <h4 className="mb-1">More Bonuses!</h4>
            </div>
            <div className="card mb-2">
              <div className="card-body">
                <div className="d-flex gap-2">
                  <div>
                    <img src="/images/invite.png" alt="" />
                  </div>
                  <div>
                    <div className="mb-1">Total Collection</div>
                    <div>
                      <img
                        src="/images/MejoraLogo.png"
                        alt=""
                        width={"25px"}
                      />
                      <span className="text-green">+5,000</span> worth pricen
                      for you
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="scratchcard_wrapper my-3">
              {Array.from({ length: 20 }, (_, index) => (
                <div
                  key={index}
                  className="scratchcard"
                  onClick={() => handleCardClick(index + 1)}
                >
                  <div className="day_txt"> Day {index + 1}</div>
                  <div>Scratch</div>
                </div>
              ))}
            </div>

            <div className="py-3">Active Mode</div>
            <div className="scratchcard_wrapper non-active-cards">
              {Array.from({ length: 20 }, (_, index) => (
                <div key={index} className="scratchcard">
                  <div className="day_txt"> Day {index + 1}</div>
                  <div>Scratch</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <FooterNav />

      {/* Custom Slide-Up Modal */}
      <div className={`slide-up-container ${isModalOpen ? 'active' : ''}`}>
        <div className="slide-up-inner-container">
          <div className="slide-up-header">
            <h5>

            </h5>
            <button className="btn-close-custom" onClick={handleClose}><IoIosCloseCircle className="fs-3" /></button>
          </div>
          <div className="slide-up-body">
            <img
              src="/images/pink_card.png"
              alt="cards to scratch"
              width={"200px"}
              className="img-fluid"
            />
            <h5 className="my-3">Day {selectedDay}</h5>
            <div className="my-2">
              <Link className="btn btn-primary">Claim</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ScratchBonus;
