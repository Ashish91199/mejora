import React, { useEffect, useState } from "react";
import { activateMatrix, getMatrix, getProfile } from "../helper/apifunction";
import MatrixTree from "./MatrixTree";
const ShapeSelector = () => {
  const [user, setUser] = useState(null);
  const [user_data, setUserData] = useState(null);
  const [matrixData, setMatrixData] = useState(null);
  const [type, setType] = useState(null);
  const [update, setUpdate] = useState(false);
  const [selectedShape, setSelectedShape] = useState(null);

  const shapes = [
    { level: 1, amount:2500, image: "/images/triangle.png" },
    { level: 2, amount:5000, image: "/images/square.png" },
    { level: 3, amount:10000, image: "/images/pentagon.png" },
    { level: 4, amount:15000, image: "/images/hexagon.png" },
    { level: 5, amount:20000, image: "/images/heptagon.png" },
    { level: 6, amount:25000, image: "/images/octagon.png" },
    { level: 7, amount:50000, image: "/images/nonagon.png" },
    { level: 8, amount:100000, image: "/images/decagon.png" },
  ];

  // Set user data based on Telegram WebApp
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
        // Set the current shape based on user's matrix level
        if (res?.user?.matrix > 0) {
          const shape = shapes.find((item) => item?.level === res?.user.matrix);
          setSelectedShape({
            ...shape,
            status: "Filled",
          });
        } else {
          // Default to the first shape (Triangle) if no matrix level is filled
          setSelectedShape({
            level: 1,
            name: "Triangle",
            image: "/images/triangle.png",
            description: "Make 2X with triangle position",
            status: "Open",
          });
        }
      } catch (error) {
        console.error("Error during getUser:", error);
      }
    }
  };

  // Fetch the user profile
  const fetchUserMatrix = async () => {
    if (user) {
      try {
        const res = await getMatrix(user?.id);
        setMatrixData(res?.result);
      } catch (error) {
        console.error("Error during getUser:", error);
      }
    }
  };

  // Call fetchUserProfile when the user is available or update state changes
  useEffect(() => {
    fetchUserProfile();
    fetchUserMatrix()
  }, [user, update]);

  // Handle shape click and set status
  const handleShapeClick = (shape) => {
    const status =
      user_data?.matrix === shape.level
        ? "Filled"
        : user_data?.matrix + 1 === shape.level
        ? "Open"
        : "Filled"; // No status shown if neither filled nor open

    setSelectedShape({
      ...shape,
      description: `Make ${shape?.amount === 2500 ? "2X" : shape?.amount} with ${shape?.amount} position`,
      status,
    });
  };

  // Activate matrix only if the next level (selectedShape.level) matches user_data.matrix + 1
  const activateMatrixHandler = async () => {
    if (selectedShape?.level === user_data?.matrix + 1) {
      if (user && type) {
        try {
          const res = await activateMatrix(user?.id, type);
          if (res.status === 200) {
            setUpdate(!update); // Trigger update to reload user data after activation
          }
        } catch (error) {
          console.error("Error during activateMatrix:", error);
        }
      }
    }
  };

  return (
    <>
        <div className="">
        <MatrixTree dataarr={matrixData} /> 
      </div>

      {/* <div className="card mb-3">
        <div className="card-body p-2">
          <h6 className="text-start">Locked</h6>
          <div className="locked_value_wrapper">
            {shapes.map((shape, index) => (
              <div key={index}>
                <div className="locked_col">
                  <span className="text-green"> {index + 2}X</span>
                </div>
                <span className="fs-10 text-lgray">{shape.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div> */}

      <div className="mt-4">
        <div className="">
          <div className="">
            <div>
              <div className="vector-image">
                <img
                  width={"150px"}
                  height={"120px"}
                  src="/images/Vector.png"
                  alt={selectedShape?.amount}
                />
              </div>

              <div className="text-center my-3">
                <div className="text-center">{selectedShape?.amount}</div>
                <div className="fs-12 text-gray">{selectedShape?.description}</div>
                  <div className={`text-lgreen ${selectedShape?.status === "Filled" ? "text-danger" : ""}`}>
                    {selectedShape?.status}
                  </div>
                {selectedShape?.status === "Open" && (
                  <div className="btn btn-grad fs-14 my-2" onClick={activateMatrixHandler}>
                    Activate Position
                  </div>
                )}
              </div>
            </div>

            <div className="shape_type_wrapper">
              {shapes.map((shape, index) => (
                <div
                  key={index}
                  className={`shape_type_col ${
                    shape?.level <= user_data?.matrix + 1 ? "active" : ""
                  }`}
                  onClick={() => {
                    // Shape is clickable if it's either filled or the next one to be filled
                    if (shape?.level <= user_data?.matrix + 1) {
                      setType(shape?.amount);
                      handleShapeClick(shape);
                    }
                  }}
                  style={{
                    cursor: shape?.level <= user_data?.matrix + 1 ? "pointer" : "not-allowed",
                    opacity: shape?.level <= user_data?.matrix + 1 ? 1 : 0.5,
                  }}
                >
                  <img src="/images/Vector.png" width={"40px"} alt={shape?.amount} />
                  <span className="fs-10 text-gray">{shape?.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShapeSelector;
