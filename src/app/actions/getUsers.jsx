import prisma from "../libs/prismadb";
import getSession from "./getSession";


export default async function getUsers() {
  const session = await getSession();

  if (!session?.user?.email) {
    return [];
  }

  try {
    const users =await prisma.User.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    })
    where:{
        NOT:{
            email: session.user.email
        }
    }
    return users;
  } catch (error) {
    return [];
  }
}
