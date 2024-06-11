import prisma from "../libs/prismadb";
import getCurrentUser from "./getCurrentUser";

const getConversationById = async (conversationId) => {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser?.email){
            return null;
        }

        const conversation = await prisma.conversation.findUnique({
            where: {
                id: conversationId,
            },
            include: {
               include:{
                     user: true,
               }
            },
        });

        return conversation;
    } catch (error) {
        return null
    }
};

export default getConversationById;