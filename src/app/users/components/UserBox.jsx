'use client'

import axios from 'axios'
import Avatar from '@/app/pages/components/avatar'
import { useRouter } from 'next/navigation'
import React ,{useState ,useCallback} from 'react'
import LoadingModal from '@/app/pages/components/LoadingModal'

export default function UserBox({user}) {
    
    const router = useRouter()
    const [isLoading,setIsLoading] = useState(false)

    const handleClick = useCallback(()=>{
        setIsLoading(true)
        
        axios.post('/api/conversations',{
            userId:user.id,
            name:user.name
            
        })
        .then((user)=>{
            router.push(`/conversations/${user.data.id}`)
        })
        .finally(()=>{
            setIsLoading(false)
        })
    },[user,router])


  return (
    <>
    {isLoading && <LoadingModal/>}
    <div className='UserBox_container' onClick={handleClick}>   
      <Avatar user={user} alt={user.name} />
      <div>
        <p>{user.name}</p>
      </div>
    </div>
    </>
  )
}
