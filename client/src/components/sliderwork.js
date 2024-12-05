import React, { useState } from "react";
import Sidebar from "../components/slider.js";

function Sliderwork() {
  const [activePage, setActivePage] = useState("home");

  return (
    <div>
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <div>
        {/* Render content for the active page */}
        {activePage === "home" && <h1>Home Page</h1>}
        {activePage === "about" && <h1>About Page</h1>}
        {activePage === "contact" && <h1>Contact Page</h1>}
      </div>
    </div>
  );
}

export default Sliderwork;