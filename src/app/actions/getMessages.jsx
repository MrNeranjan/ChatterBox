import prisma from "../libs/prismadb";

const getMessages = async (conversationId) => {
    try {
        const messages = await prisma.message.findMany({
            where: {
                ConversationId: conversationId,
            },
            include: {
                sender: true,
                SeenBy: true,
            },
            orderBy: {
                createdAt: 'asc',
            },
        });
        return messages;
    } catch (error) {
        console.error("error in getMessages", error);
        return [];
    } 
}

export default getMessages;