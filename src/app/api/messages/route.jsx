import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";



export async function POST(request) {
    try {
        const currentUser =await getCurrentUser();

        const body = await request.json();



        const {message,image,conversationId} = body;



        if(!currentUser?.id || !currentUser?.email){
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const newMessage = await prisma.message.create({
            data:{
                body:message,
                image:image,
                conversation:{
                    connect:{
                        id:conversationId
                    }
                },
                sender:{
                    connect:{
                        id:currentUser.id
                    }
                
                },
                SeenBy:{
                    connect:{
                        id:currentUser.id
                    }
                
                }
            },
            include:{
                sender:true,
                SeenBy:true
            }
    
        });

        const updatedConversation = await prisma.conversation.update({
            where:{
                id:conversationId
            },
            data:{
                lastMessageAt:new Date(),
                messages:{
                    connect:{
                        id:newMessage.id
                    }
                }
            
            },
            include:{
                users:true,
                messages:{
                    include:{ 
                        SeenBy:true
                    }
                }
            }
        });

        return NextResponse.json(newMessage);

    } catch (error) {
        console.log(error,"error in POST messages route");
        return new NextResponse('InternalError', { status: 500 });
    }
}