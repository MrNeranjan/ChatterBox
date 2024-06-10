import React from "react";
import SideBar from "../pages/components/SideBar";
import getUsers from "../actions/getUsers";
import UserList from "./components/UserList";

export default async function UserLayout({ children }) {
  const users = await getUsers();
  return (
    <SideBar>
      <UserList users={users} />
      <div>{children}</div>
    </SideBar>
  );
}
