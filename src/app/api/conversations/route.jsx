import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";


export async function POST(request){

    
    try {
        const currentUser = await getCurrentUser();
        const body = await request.json();
        console.log("post request for group creation",body)

        const {userId,isGroup,members,Name} = body;
        
       
        if (!currentUser?.id || !currentUser?.email){
            return new NextResponse('Unauthorized',{status:401})
        }

        if (isGroup && (!members || members.length < 2 || !Name)){
            console.log("post request for group creation !members || members.length < 2 || !name")
            return new NextResponse('Invalid data',{status:400})
        }

        if (isGroup){
            const newConversation = await prisma.conversation.create({
                data:{
                    name:Name,
                    isGroup,
                    users: {
                        connect: [
                            ...members.map((member)=>({id:member.value})),
                            {id:currentUser.id}
                        ]
                    }
                }
            });
            return NextResponse.json(newConversation);
        }

        const existingConversation = await prisma.conversation.findMany({
            where: {
                OR:[
                    {
                        userIds: {
                            equals: [currentUser.id,userId]
                        }
                    },
                    {
                        userIds: {
                            equals: [userId,currentUser.id]
                        }
                    }

                ]
            }
        })

        const singleConversation = existingConversation[0];

        if (singleConversation){
            return NextResponse.json(singleConversation);
        }

        const newConversation = await prisma.conversation.create({
            data:{
                users:{
                    connect:[
                        {id:currentUser.id},
                        {id:userId}
                    ]
                }
            },
            include:{
                users:true
            }
        });
        
        return NextResponse.json(newConversation);

    } catch (error) {
        return new NextResponse('Internal Error',{status:500})
    }
}