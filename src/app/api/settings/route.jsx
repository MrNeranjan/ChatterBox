import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";


export async function POST(request){
    try {
        const currentUser = await getCurrentUser();
        const body = await request.json();
        const {name,image} = body;

        console.log(name,image);

        if (!currentUser?.id){
            return new NextResponse("Unauthorized",{status:401})
        }

        const updateUser = await prisma.user.update({
            where:{
                id:currentUser.id
            },
            data:{
                image:image,
                name:name
            }
        });

        return NextResponse.json(updateUser)
    } catch (error) {
        console.log("error in settings api",error);
        return new NextResponse("Internal error",{status:500})
    }
}