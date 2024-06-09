import React from 'react'
import DesktopSideBar from './DesktopSideBar'
import getCurrentUser from '@/app/actions/getCurrentUser';

export default async function SideBar({children}) {
  const CurrentUser = await getCurrentUser();
  return (
    <div>
      <DesktopSideBar currentUser={CurrentUser}/>
      {children}
    </div>
  )
}


