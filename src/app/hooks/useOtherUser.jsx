import { useSession } from "next-auth/react";
import { useMemo } from "react";
import React from 'react';

const useOtherUser = (conversation) => {
    const { data: session } = useSession();
    const otherUser = useMemo(() => {
        const currentUserEmail = session?.user?.email;

        const otherUser = conversation.users.filter((user) => user.email !== currentUserEmail);

        console.log('otheruser[0] :',otherUser[0]);
        
        return otherUser[0];
        
    }, [session?.user?.email, conversation.users]);

    return otherUser;
}

export default useOtherUser;
