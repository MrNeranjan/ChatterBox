import React from "react";
import clsx from "clsx";

function SocialActionButton({ icon: Icon, onclick, disabled }) {
  return (
    <div className="SocialActionButton_container">
      <button
        type="button"
        onClick={onclick}
        className={clsx(
          "SocialActionButton_container_button",
          disabled && "SocialActionButton_container_disabled"
        )}
        disabled={disabled}
      >
        <Icon className="SocialActionButton_container_icon" />
      </button>
    </div>
  );
}

export default SocialActionButton;
