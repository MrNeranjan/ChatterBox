'use client'

import React from 'react'
import clsx from 'clsx'
import Link from 'next/link'

function DesktopItem({label,icon:Icon,href,active,onClick}) {
    

    const handleClick=()=>{
        if(onClick){
           return onClick();
        }
    }

  return (
    <ul onClick={onClick}>
        <Link href={href}>
            <Icon className ={clsx(
                'DesktopItem_icon',
                active && 'DesktopItem_icon_active'
            
            )}/>
            <span style={{display:"none"}}>{label}</span>
        </Link>
    </ul>
  )
}

export default DesktopItem
