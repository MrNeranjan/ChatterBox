"use client";

import useOtherUser from "@/app/hooks/useOtherUser";
import Avatar from "@/app/pages/components/avatar";
import Link from "next/link";
import "./Header.css";

import React, { useMemo } from "react";
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2";

function Header({ conversation }) {
  const otherUser = useOtherUser(conversation);

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }

    return "Active";
  }, [conversation]);

  return (
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
          onClick={() => {}}
        />
      </div>
    </div>
  );
}

export default Header;
