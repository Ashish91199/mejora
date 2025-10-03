import React, { useState, useEffect } from "react";
import { getProfile, activateLevelAPI, getLevel } from "../helper/apifunction";
import TreeStructure from "./WorkingTree";

const LevelSelector = () => {
  const [user, setUser] = useState(null);
  const [user_data, setUserData] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [update, setUpdate] = useState(false); // State to trigger re-fetch

  // Data for levels
  const levels = [
    { level: 1, name: "L1", users: ["/images/user1.png"] },
    { level: 2, name: "L2", users: ["/images/user3.png", "/images/user2.png"] },
    { level: 3, name: "L3", users: ["/images/user3.png", "/images/user1.png", "/images/user2.png"] },
    { level: 4, name: "L4", users: ["/images/user1.png", "/images/user2.png", "/images/user3.png", "/images/user1.png"] },
    { level: 5, name: "L5", users: ["/images/user1.png", "/images/user2.png", "/images/user3.png", "/images/user2.png", "/images/user1.png"] },
    { level: 6, name: "L6", users: ["/images/user1.png", "/images/user2.png", "/images/user3.png", "/images/user1.png", "/images/user2.png", "/images/user3.png"] },
    { level: 7, name: "L7", users: ["/images/user1.png", "/images/user2.png", "/images/user3.png", "/images/user1.png", "/images/user2.png", "/images/user3.png", "/images/user1.png"] },
    { level: 8, name: "L8", users: ["/images/user1.png", "/images/user2.png", "/images/user3.png", "/images/user1.png", "/images/user2.png", "/images/user3.png", "/images/user1.png", "/images/user2.png"] },
  ];

  const currentLevel = levels.find((level) => level?.level === selectedLevel);

  // Fetch user data and set the user when the component mounts
  useEffect(() => {
    if (window.Telegram?.WebApp?.initDataUnsafe?.user) {
      setUser(window.Telegram?.WebApp?.initDataUnsafe?.user);
    }
  }, []);
    // Fetch the user profile
    const fetchUserProfile = async () => {
      if (user) {
        try {
          const res = await getProfile(user?.id);
          setUserData(res?.user);
        } catch (error) {
          console.error("Error during getUser:", error);
        }
      }
    };

  
    // Call fetchUserProfile when the user is available or update state changes
    useEffect(() => {
      fetchUserProfile();
    }, [user, update]);

  // Handler to select a level with validation
  const handleLevelClick = (level) => {
    const allowedLevels = user_data?.level + 1 || 1;
    if (level?.level <= allowedLevels) {
      setSelectedLevel(level?.level);
    }
  };

  const getLevelStatus = (level) => {
    const levelNumber = level?.level;
    if (user_data?.level >= levelNumber) {
      return "Filled";
    } else if (user_data?.level + 1 === levelNumber) {
      return "Open";
    } else {
      return "Filled";
    }
  };

  // Handler to activate the selected level
  const activateLevelHandler = async () => {

    // Activate only if the level is "Open"
    if (user_data?.level + 1 === selectedLevel) {
      try {
        const result = await activateLevelAPI(user?.id, selectedLevel);

        if (result.status==200) {
          setUpdate(!update); // Trigger re-fetch of user data
          console.log(result.message); // Log success
        } else {
          console.error(result.message); // Log failure
        }
      } catch (error) {
        console.error("Error during level activation:", error);
      }
    }
  };

  return (
    <>
      <div className="">
        <TreeStructure user_id={user?.id} update={update} /> 
      </div>

      {/* <div className="card mb-3">
        <div className="card-body p-2">
          <h6 className="text-start">Locked</h6>
          <div className="locked_value_wrapper">
            {levels.map((level, index) => (
              <div key={index}>
                <div className="level-users">
                  {level.users.slice(0, 2).map((user, idx) => (
                    <img
                      key={idx}
                      src={user}
                      width={"50px"}
                      alt="user"
                      className="img-fluid"
                    />
                  ))}
                </div>
                <span className="fs-10 text-lgray">{level.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div> */}

      <div className="">
        <div className="">
          <div className="">
            <div>
              <div className="level-image-wrapper">
                {currentLevel?.users.map((user, idx) => (
                  <img
                    key={idx}
                    src={user}
                    alt=""
                    className="img-fluid level_img"
                  />
                ))}
              </div>

              <div className="my-3 text-center">
                <div className="text-center">{currentLevel.name}</div>
                {/* <div className="fs-12 text-gray">Make 2X with triangle positions</div> */}
                <div className={`text-lgreen text-center ${getLevelStatus(currentLevel)}`}>
                  {getLevelStatus(currentLevel)}
                </div>
                {getLevelStatus(currentLevel) === "Open" && (
                  <div className="btn btn-grad fs-14 my-3" onClick={activateLevelHandler}>
                    Activate Position
                  </div>
                )}
              </div>
            </div>

            <div className="shape_type_wrapper">
              {levels.map((level) => (
                <div
                  key={level?.level}
                  className={`shape_type_col ${level?.level === selectedLevel ? "active" : ""}`}
                  onClick={() => handleLevelClick(level)}
                  style={{
                    cursor:
                    level?.level <= (user_data?.level + 1 || 1)
                        ? "pointer"
                        : "not-allowed",
                    opacity:
                      level?.level <= (user_data?.level + 1 || 1)
                        ? 1
                        : 0.5,
                  }}
                >
                  <span className="text-gradient fs-3 fw-bold">{level.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LevelSelector;
