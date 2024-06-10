'use client'

import React from 'react'
import './UserListStyle.css'
import UserBox from './UserBox'

export default function UserList({users}) {
  return (
    <div className='UserList_container'>
      <div className='UserList_container_heading'>
        <h2>
            People
        </h2>
      </div>
      <div className='UserList_container__users'>
        {users.map((item) =>(
            <UserBox
                key={item.id}
                user={item}
            />
        ))}
      </div>
    </div>
  )
}
