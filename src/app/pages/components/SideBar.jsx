import React from 'react'
import DesktopSideBar from './DesktopSideBar'

export default async function SideBar({children}) {
  return (
    <div>
      <DesktopSideBar/>
      {children}
    </div>
  )
}


