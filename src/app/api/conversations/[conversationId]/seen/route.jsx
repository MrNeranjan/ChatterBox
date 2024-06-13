import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server"
import prisma from "@/app/libs/prismadb";
import { pusherServer } from "@/app/libs/pusher";

export async function POST(request,{params}){
    try {

        const currentUser = await getCurrentUser();
        const {conversationId} = params;

       

        if(!currentUser?.id || !currentUser?.email){
            console.log("Unauthorized error in the seen")
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const conversation = await prisma.conversation.findUnique({
            where:{
                id:conversationId
            },
            include:{
                messages:{
                    include:{
                        SeenBy:true
                    }
                },
                users:true
            }
            
        });



        

        if(!conversation){
            return new NextResponse('conversation not found', { status: 400 })
        }

        const lastMessage = conversation.messages[conversation.messages.length - 1];

        if(lastMessage.seenIds.indexOf(currentUser.id) !== -1){
            return NextResponse.json(conversation);
        }


        if (!lastMessage){
            return NextResponse.json(conversation);
        }
        
        const updatedMessage = await prisma.message.update({
            where:{
                id:lastMessage.id
            },
            include:{
                sender:true,
                SeenBy:true
            },
            data:{
                SeenBy:{
                    connect:{
                        id:currentUser.id
                    }
                }
            }
        });

        
        await pusherServer.trigger(currentUser.email,'conversation:update',{
            id:conversationId,
            messages:[updatedMessage]
        })

        await pusherServer.trigger(conversationId,'message:update',updatedMessage)
        
        return NextResponse.json(updatedMessage);
    } catch (error) {
        console.log("error in the seen",error)
        return new NextResponse('error in the seen', { status: 500 })
    }
}