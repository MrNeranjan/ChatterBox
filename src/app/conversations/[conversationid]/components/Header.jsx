"use client";

import useOtherUser from "@/app/hooks/useOtherUser";
import Avatar from "@/app/pages/components/avatar";
import Link from "next/link";
import "./Header.css";
import ProfileDrawer from "./ProfileDrawer";

import React, { useMemo,useState } from "react";
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2";
import useActiveList from "@/app/hooks/useActiveList";

function Header({ conversation }) {
  const otherUser = useOtherUser(conversation);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const {members} = useActiveList();

  console.log("active status members in the header",members)

  const isActive = members.indexOf(otherUser?.email) !== -1
  console.log("active status in the header",isActive)

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }

    return isActive ?"Active":'Offline';
  }, [conversation,isActive]);

  

  return (
    <>
    <ProfileDrawer
      data ={conversation}
      isOpen ={drawerOpen}
      onClose ={() => setDrawerOpen(false)}
    
    />
      <div className="Header_container">

        <Link href="/conversation" className="HiChevronLeft">
          <HiChevronLeft size={32} />
        </Link>
        <div className="Header_container_info_with_img">
          <Avatar user={otherUser} />
          <div className="Header_container_info_with_img_text">
            <h4>{conversation.name || otherUser?.name}</h4>
            <p>{statusText}</p>
          </div>
        </div>
        <div>
          <HiEllipsisHorizontal
            className="HiEllipsisHorizontal"
            size={32}
            onClick={() => setDrawerOpen(true)}
          />
        </div>
      </div>
    </>
  );
}

export default Header;
