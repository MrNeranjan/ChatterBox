

// import { signOut } from 'next-auth/react'
import React from 'react'
import EmptyEstate from '../pages/components/EmptyEstate'
import './styleUser.css'

export default function Users() {
  return (
    <div className='Users_container'>
      <div className='Users_container_emptySate'>
         <EmptyEstate />
      </div>
     <div className='Users_container_leftside'>

     </div>
    </div>
  )
}
