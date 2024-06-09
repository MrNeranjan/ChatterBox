import { useMemo } from "react";
import { usePathname } from "next/navigation";
import {HiChat} from  'react-icons/hi';
import {HiArrowLeftOnRectangle,HiUsers} from 'react-icons/hi2';

import { signOut } from "next-auth/react";
import UseConversation from "./useConversation";


function UseRoutes(){
    const pathname =usePathname();
    const {conversationId} =UseConversation();

    const routes = useMemo(()=>[
        {
            label:'Chat',
            href:'/conversations',
            icon:HiChat,
            active: pathname ==='/conversation' || !!conversationId
        },

        {
            label:'Users',
            href:'/users',
            icon:HiUsers,
            active:pathname ==='/users'
        },
        {
            label:'Logout',
            href:'#',
            onClick: () => signOut({callbackUrl:'/'}),
            icon:HiArrowLeftOnRectangle
        }
    ],[pathname,conversationId])
    return routes;
}

export default UseRoutes;