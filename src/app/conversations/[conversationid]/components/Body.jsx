'use client'

import UseConversation from '@/app/hooks/useConversation';
import React,{useState,useRef, useEffect} from 'react'
import MessageBox from './MessageBox';
import axios from 'axios';
import { pusherClient } from '@/app/libs/pusher';
import { find } from 'lodash';


function Body({initialMessages}) {
  const [messages, setMessages] = useState(initialMessages) ;
  const bottomRef = useRef();


  

  const {conversationId}=UseConversation();

  

  useEffect(()=>{
    axios.post(`/api/conversations/${conversationId}/seen`)

  },[conversationId])

  useEffect(()=>{
    pusherClient.subscribe(conversationId)
    bottomRef?.current?.scrollIntoView();

    const messageHandler =(message) =>{
      axios.post(`/api/conversations/${conversationId}/seen`)

      setMessages((current)=>{
        if(find(current,{id:message.id})){
          return current
        }

        return [...current,message]
      });

      bottomRef?.current?.scrollIntoView();
    }

    const updateMessageHandler =(newMessage)=>{
      setMessages((current)=> current.map((currentMessage)=>{
        if(currentMessage.id === newMessage.id){
          return newMessage;
        }
        return currentMessage;
      }))
    }

    pusherClient.bind('messages:new',messageHandler)
    pusherClient.bind('message:update',updateMessageHandler)
    return()=>{
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind('messages:new',messageHandler)
      pusherClient.unbind('message:update',updateMessageHandler)
    }
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
