
import prisma from "../libs/prismadb";
import getSession from "./getSession";


export default async function getCurrentUser() {

    try {
        const session = await getSession();
        if (!session?.user?.email) {
            return null;
        }

        const user = await prisma.user.findUnique({
            where: {
                email: session.user.email
            }
        });

        if (!user) {
            return null;
        }

        return user;

    } catch (error) {
        return null;
        
    }
   
}