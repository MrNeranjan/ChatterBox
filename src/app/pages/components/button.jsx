import clsx from "clsx";
import React from "react";


export default function Button({ name, submit, disabled }) {
  return (
    <div>
      <button
        disabled={disabled}
        type={submit}
        className={clsx(
          "button_container",
           disabled && "button_container_disable"
        )}
      >
        {name}
      </button>
    </div>
  );
}
