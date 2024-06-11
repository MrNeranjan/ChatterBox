'use client'

import React, { useState } from 'react'
import './conversationList.css'
import { useRouter } from 'next/navigation';
import UseConversation from '@/app/hooks/useConversation';
import { MdOutlineGroupAdd } from 'react-icons/md';
import ConversationBox from './ConversationBox';

export default function ConversationList({initialItems}) {
  const [items,setItems] = useState(initialItems);
  const router = useRouter();
  const {conversationId,isOpen} = UseConversation();
  
  return (
    <div className='ConversationList_container'>
      <div className='ConversationList_container_heading'>
          <h2>
            Messages
          </h2>
          <MdOutlineGroupAdd size={23} className='ConversationList_container_heading_icon'/>
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
  )
}
