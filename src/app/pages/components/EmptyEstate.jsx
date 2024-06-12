import React from "react";
import "./style.css";

function EmptyEstate({text}) {
  return (
    <div className="EmptyEstate_container">
      <div className="EmptyEstate_container_text">
        <h3>{text}</h3>
      </div>
    </div>
    
  );
}

export default EmptyEstate;
