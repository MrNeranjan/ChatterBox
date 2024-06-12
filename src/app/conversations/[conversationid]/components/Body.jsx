'use client'

import UseConversation from '@/app/hooks/useConversation';
import React,{useState,useRef, useEffect} from 'react'
import MessageBox from './MessageBox';
import axios from 'axios';


function Body({initialMessages}) {
  const [messages, setMessages] = useState(initialMessages) ;
  const bottomRef = useRef();


  

  const {conversationId}=UseConversation();

  

  useEffect(()=>{
    axios.post(`/api/conversations/${conversationId}/seen`)

  },[conversationId])



  return (
    <div className='Body_container'>
      {messages.map((message,index)=>(
        <MessageBox
          isLast = {index === messages.length - 1}
          key={message.id}
          data = {message}
        />
      ))}
      <div ref={bottomRef}/>
     
    </div>
  )
}

export default Body
