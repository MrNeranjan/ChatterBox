import React from 'react'
import { useCallback,useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {Conversation,User,Message} from '@prisma/client';
import { format } from 'date-fns';
import { useSession } from 'next-auth/react';
import clsx from 'clsx';
import useOtherUser from '@/app/hooks/useOtherUser';
import Avatar from '@/app/pages/components/avatar';
import AvatarGroup from '@/app/pages/components/AvatarGroup';

function ConversationBox({data,selected}) {
  const otherUser = useOtherUser(data);
  const router = useRouter();
  const session = useSession();

  const handleClick = useCallback(()=>{
    router.push(`/conversations/${data.id}`);
  },[data.id,router]);


  const lastMessage = useMemo(()=>{

    const messages = data.messages || [];
    return messages[messages.length-1];

  },[data.messages]);


  const userEmail  = useMemo(()=>{
    return session?.data?.user?.email;

  },[session?.data?.user?.email])

  const hasSeen = useMemo(()=>{
    if (!lastMessage) return false;

    const seenArray = lastMessage.seenBy || [];

    if (!userEmail) return false;

    return seenArray
    .filter((user)=>user.email === userEmail).length ==! 0;

  },[userEmail,lastMessage]);


  const lastMessageText = useMemo(()=>{
    if (lastMessage?.image) {
      return 'Sent an image'; 
    }

    if (lastMessage?.body) {
      return lastMessage.body;
    }

    return 'Started a conversation';
  },[lastMessage]);

  return (
    <div 
      onClick={handleClick}
      className={clsx('ConversationBox_container', selected && 'ConversationBox_container_selected')}
    >
        {otherUser ? (
          <div className='ConversationBox_container_box'>
            {data.isGroup ? (<AvatarGroup src={data.users} />):<Avatar src={otherUser} />}
            <div className='ConversationBox_container_box_data'>
              <div className='ConversationBox_container_box_data_top'>
                  <p className='ConversationBox_container_box_data_top_name'>{data.name || otherUser.name}</p>
                  {lastMessage?.createdAt && (<p className='ConversationBox_container_box_data_top_time'>
                    {format(new Date(lastMessage.createdAt),'p')}
                  </p>)}
              </div>
              <div>
                <p className={clsx(
                  'ConversationBox_container_box_data_top_name_bottom',
                   hasSeen && 'ConversationBox_container_box_data_top_name_bottom_seen')}>
                  
                  {lastMessageText}
                  
                  </p>
              </div>
            </div>
          </div>
        ) : null}
    </div>
  )
}

export default ConversationBox;
