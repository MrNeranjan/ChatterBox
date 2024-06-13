'use client'

import React, { useEffect, useMemo, useState } from 'react'
import clsx from 'clsx';
import './conversationList.css'
import { useRouter } from 'next/navigation';
import UseConversation from '@/app/hooks/useConversation';
import { MdOutlineGroupAdd } from 'react-icons/md';
import ConversationBox from './ConversationBox';
import GroupChatModal from './GroupChatModal'
import { pusherClient } from '@/app/libs/pusher';
import { find } from 'lodash';
import { useSession } from 'next-auth/react';

export default function ConversationList({initialItems,users}) {
  const [items,setItems] = useState(initialItems);
  const [isModalOpen,setIsModalOpen]= useState(false);
  const router = useRouter();
  const {conversationId,isOpen} = UseConversation();
  const session = useSession();

  const pusherKey  = useMemo(()=>{
    return session.data?.user?.email;
  },[session.data?.user?.email])


  useEffect(()=>{
    if(!pusherKey){
      return;
    }

    pusherClient.subscribe(pusherKey);

    const newHandler = (conversation) => {
      setItems((current)=>{
        if(find(current,{id:conversation.id})){
          return current;
        }

        return[conversation,...current]
      })
    }

    const updateHandler = (conversation)=>{
      setItems((current)=>current.map((currentConversation)=>{
        if(currentConversation.id === conversation.id){
          return {
            ...currentConversation,
            messages:conversation.messages
          }
        }
        return currentConversation
      }))
    }


    pusherClient.bind('conversation:new',newHandler);
    pusherClient.bind('conversation:update',updateHandler)

    return ()=>{
      pusherClient.unsubscribe(pusherKey);
      pusherClient.unbind('conversation:new',newHandler)
      pusherClient.unbind('conversation:update',updateHandler)
    }
  },[pusherKey]);

  
  return (
    <>
    <GroupChatModal
        isOpen={isModalOpen}
        onClose ={()=>setIsModalOpen(false)}
        users ={users}
    />
    <div className={clsx(
      'ConversationList_container'
      )} >
      <div className='ConversationList_container_heading'>
          <h2>
            Messages
          </h2>
          <MdOutlineGroupAdd size={23} className='ConversationList_container_heading_icon' onClick={()=>setIsModalOpen(true)}/>
      </div>
      <div className='ConversationList_container__users'>
        {items.map((item) =>(
            <ConversationBox
                key={item.id}
                data={item}
                selected={conversationId === item.id}
            />
        ))}
      </div>
    </div>
    </>
  )
}
