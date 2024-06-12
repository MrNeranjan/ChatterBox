import Avatar from '@/app/pages/components/avatar';
import clsx from 'clsx';
import { format } from 'date-fns';
import { useSession } from 'next-auth/react'
import React from 'react'
import Image from 'next/image';

function MessageBox({data,isLast}) {

    const session = useSession();
    

    const isOwn  = session?.data?.user?.email === data?.sender?.email;

    const seenList = (data?.seenBy || [])
    .filter((user)=>user.email !== data.sender.email)
    .map((user)=>user.name)
    .join(', ');




  return (
        <div className={clsx(
            'MessageBox_container',
            isOwn && 'MessageBox_container_own'
        )}>
            <div className={clsx(
                'MessageBox_container_avatar',
                isOwn && 'MessageBox_container_avatar_own'
            )}>
                <Avatar user={data.sender} />
            </div>
            <div className={clsx(
                'MessageBox_container_body',
                isOwn && 'MessageBox_container_body_own'
            )}>
                <div style={{ display: 'flex', justifyContent: isOwn ? 'flex-end' : 'flex-start', gap: '1rem' }}>
                    <div style={{ fontSize: '0.6rem', color: 'var(--color-gray)', fontWeight: '500' }}>
                        {data.sender.name}
                    </div>
                    <div style={{ fontSize: '0.4rem', color: 'var(--color-lightgray)', fontWeight: '400' }}>
                        {format(new Date(data.createdAt), 'p')}
                    </div>
                </div>
                <div>
                    {
                        data.image ?(
                            <Image src={data.image} alt="message image" width={200} height={200} />
                        ):(
                            <div>{data.body}</div>
                        )
                    }
                </div>
            </div>
        </div>
  )
}

export default MessageBox
