import EmptyEstate from "@/app/pages/components/EmptyEstate";
import getConversationById from "../../actions/getConversationById";
import getMessages from "@/app/actions/getMessages";
import Header from "./components/Header";

const conversationId  = async ({params}) => {
    const conversation = await getConversationById(params.conversationId);
    const messages = await getMessages(params.conversationId);


    return(
        <div>
            <Header conversation={conversation}/>
        </div>
    )
}

export default conversationId;