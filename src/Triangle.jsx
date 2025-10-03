import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import FooterNav from "./component/FooterNav";
import { IoIosCloseCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import ShapeSelector from "./component/ShapeSelector";
import LevelSelector from "./component/LevelSelector";
import { MdKeyboardArrowLeft } from "react-icons/md";

function Triangle() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCardClick = (category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedCategory("");
  };

  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <>
      <div className="page_container">
        <div className="inner_page_layout">

          <div className="position-relative pb-1">
            <div className="backButton">
              <Link className="anchor_pointer text-white" to="/home">
                <MdKeyboardArrowLeft className="fs-1" />
              </Link>
            </div>
            <div className="text-center">
              <div>
                <img
                  src="/images/MejoraLogo.png"
                  width={"60px"}
                  alt="img-fluid"
                  data-aos="zoom-in"
                />
              </div>
            </div>
          </div>
          <div className="mb-3 text-center">
            <div className="text-gray">Triangle</div>
            <ShapeSelector />
          </div>
        </div>
      </div>
      <FooterNav />


    </>
  );
}

export default Triangle;
