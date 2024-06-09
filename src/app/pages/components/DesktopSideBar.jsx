"use client";

import UseRoutes from "../../hooks/useRoutes";
import React, { useState } from "react";
import DesktopItem from "./DesktopItem";
import Avatar from "./avatar";

function DesktopSideBar({ currentUser }) {
  const routes = UseRoutes();
  const [isOpen, setIsOpen] = useState(false);
  console.log(currentUser);
  return (
    <div className="DesktopSideBar_container">
      <nav className="DesktopSideBar_nav">
        <dev className="DesktopSideBar_nav_mapping">
          {routes.map((item) => (
            <DesktopItem
              key={item.label}
              href={item.href}
              label={item.label}
              icon={item.icon}
              active={item.active}
              onClick={item.onClick}
            />
          ))}
          <div
            className="DesktopSideBar_nav_avatar"
            onClick={() => setIsOpen(true)}
          >
            <Avatar />
          </div>
        </dev>
      </nav>
      <nav></nav>
    </div>
  );
}

export default DesktopSideBar;
