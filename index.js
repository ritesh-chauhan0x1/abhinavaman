import React from "react";
import { createRoot } from "react-dom/client";
import FuzzyText from "./FuzzyText";

const App = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
      }}
    >
      <FuzzyText
        baseIntensity={0.2}
        hoverIntensity={0.6}
        enableHover={true}
        fontSize="clamp(3rem, 12vw, 10rem)"
        fontWeight={900}
        color="#fff"
      >
        404 Not Found
      </FuzzyText>
    </div>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);
