"use client";

import Image from "next/image";
import React from "react";

function Avatar({ user }) {
  
  return (
    <div className="Avatar_container">
      <Image
        alt="avatar"
        src={user?.image || "/images/placeholder.png"}
        width={45}
        height={45}
        style={{ borderRadius: '50%' , objectFit: 'cover'}}
      />
    </div>
  );
}

export default Avatar;