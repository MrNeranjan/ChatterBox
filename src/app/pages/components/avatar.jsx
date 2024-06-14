"use client";

import useActiveList from "@/app/hooks/useActiveList";
import Image from "next/image";
import React from "react";

function Avatar({ user }) {
  const {members} =useActiveList();
  const isActive = members.indexOf(user?.email) !== -1


  // isActive is use for active status

  
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
