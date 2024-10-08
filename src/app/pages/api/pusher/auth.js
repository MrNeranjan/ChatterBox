import {NextApiRequest,NextApiResponse} from 'next';
import { getServerSession } from 'next-auth';

import { pusherServer } from '@/app/libs/pusher';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';


export default async function handler (
    request,
    response
){
    const session = await getServerSession(request,response,authOptions)

    if(!session?.user?.email){
        return response.status(401);
    }

    const socketId = request.body.socket_Id;
    const channel = request.body.channel_name;

    const data = {
        user_id : session.user.email
    };

    console.log("socketId",socketId)
    console.log("channel",channel)
    console.log("data",data)


    const authResponse = pusherServer.authorizeChannel(socketId,channel,data);

    return response.send(authResponse);
}