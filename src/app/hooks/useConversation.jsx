import { useParams } from "next/navigation";
import { useMemo } from "react";

function UseConversation () {
    const params = useParams();

    const conversationId = useMemo(()=> {
        if(!params?.conversationId){
            return ''
        }

        return params.conversationId
    }, [params?.conversationId]);

    const isOpen = useMemo(()=> !!conversationId,[conversationId])

    return useMemo(()=>({
        conversationId,
        isOpen
    }), [conversationId, isOpen])
   
}

export default UseConversation;