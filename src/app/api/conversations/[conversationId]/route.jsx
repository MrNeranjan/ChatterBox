import { NextResponse } from "next/server"

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";


export async function DELETE(request,{params}){

    try {
        const {conversationId} = params;
        const currentUser = await getCurrentUser();
        if (!currentUser?.id){
            return new NextResponse('Unauthorized',{status:401})
        }

        const existingConversation = await prisma.conversation.findUnique({
            where:{
                id:conversationId
            },
            include:{
                users:true
            
            }
        });

        if (!existingConversation){
            return new NextResponse('Not Found conversation',{status:404})
        }

        const deleteConversation = await prisma.conversation.deleteMany({
            where:{
                id:conversationId,
                userIds:{
                    hasSome:[currentUser.id]
                }
            }
        })

        return NextResponse.json(deleteConversation);
        
    } catch (error) {
        console.log(" error in delete conversation route",error)
        return new NextResponse ('Internal Server Error',{status:500})
    }
}