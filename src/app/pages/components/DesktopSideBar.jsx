'use client'

import UseRoutes from '../../hooks/useRoutes';
import React, { useState } from 'react'
import DesktopItem from './DesktopItem';

function DesktopSideBar() {
    const routes = UseRoutes();
    const [isOpen,setIsOpen] = useState(false);

  return (
    <div className='DesktopSideBar_container'>
      <nav className='DesktopSideBar_nav'>
        <dev className='DesktopSideBar_nav_mapping'>
          {routes.map((item)=>(
            <DesktopItem
              key ={item.label}
              href ={item.href}
              label={item.label}
              icon = {item.icon}
              active = {item.active}
              onClick = {item.onClick}
            />
          ))}
        </dev>
      </nav>
    </div>
  )
}

export default DesktopSideBar
