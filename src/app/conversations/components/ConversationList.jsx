'use client'

import React, { useState } from 'react'
import clsx from 'clsx';
import './conversationList.css'
import { useRouter } from 'next/navigation';
import UseConversation from '@/app/hooks/useConversation';
import { MdOutlineGroupAdd } from 'react-icons/md';
import ConversationBox from './ConversationBox';
import GroupChatModal from './GroupChatModal'

export default function ConversationList({initialItems,users}) {
  const [items,setItems] = useState(initialItems);
  const [isModalOpen,setIsModalOpen]= useState(false);
  const router = useRouter();
  const {conversationId,isOpen} = UseConversation();


  
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
