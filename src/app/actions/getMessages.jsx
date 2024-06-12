import prisma from "../libs/prismadb";

const getMessages = async (conversationId) => {
    try {
        const messages = await prisma.message.findMany({
            where: {
                conversationId: conversationId,
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
        
        return [];
    } 
}

export default getMessages;