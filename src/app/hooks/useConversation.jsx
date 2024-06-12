'use client'

import { useParams } from "next/navigation";
import { useMemo } from "react";

function UseConversation () {
    const params = useParams();

    const conversationId = useMemo(()=> {
        if(!params?.conversationid){
            return ''
        }

        return params.conversationid
        
    }, [params?.conversationid]);

    const isOpen = useMemo(()=> !!conversationId,[conversationId])



    return useMemo(()=>({
        conversationId,
        isOpen
    }), [conversationId, isOpen])
   
}

export default UseConversation;