'use client'

import Avatar from '@/app/pages/components/avatar'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React ,{useState ,useCallback} from 'react'

export default function UserBox({user}) {
    const router = useRouter()
    const [isLoading,setIsLoading] = useState(false)

    const handleClick = useCallback(()=>{
        setIsLoading(true)
        
        axios.post('/api/conversations',{
            userId:data.id
        })
        .then((data)=>{
            router.push(`/conversations/${data.data.id}`)
        })
        .finally(()=>{
            setIsLoading(false)
        })
    },[user,router])


  return (
    <div className='UserBox_container'>
      <Avatar src={user} alt={user.name} />
      <div>
        <p>{user.name}</p>
      </div>
    </div>
  )
}
