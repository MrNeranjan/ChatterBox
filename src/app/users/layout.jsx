import React from "react";
import SideBar from "../pages/components/SideBar";

export default async function UserLayout({ children }) {
  return (
    <SideBar>
      <div>{children}</div>
    </SideBar>
  );
}
