

// import { signOut } from 'next-auth/react'
import React from 'react'
import EmptyEstate from '../pages/components/EmptyEstate'
import './styleUser.css'

export default function Users() {
  return (
    <div className='Users_container'>
      <div className='Users_container_emptySate'>
         <EmptyEstate text="Select a chat or start a new conversation" />
      </div>
    </div>
  )
}
