'use client'

import React, { useState } from 'react'
import './ConversationList.css'
import { useRouter } from 'next/navigation';
import UseConversation from '@/app/hooks/useConversation';

export default function ConversationList({initialItems}) {
  const [items,setItems] = useState(initialItems);
  const router = useRouter();
  const {conversationId,isOpen} = UseConversation();
  
  return (
    <div className='ConversationList_container'>
      Conversation
    </div>
  )
}
