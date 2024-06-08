import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import prisma from '../../libs/prismadb';


export async function POST(request) {

    try {
        const body = await request.json();
        const { name,email, password } = body;
        
        if (!name || !email || !password) {
            return new NextResponse("Missing information", { status: 400 });
        }
    
        const hashedPassword = await bcrypt.hash(password, 12);
    
        const user = await prisma.user.create({
            data: {
                name,
                email,
                hashedPassword
            }
        });
    
        return NextResponse.json(user);
    } catch (error) {
        console.log(error,'REGISTRATION_ERROR');
        return new NextResponse("An error occurred", { status: 500 });
    }

}