
import EmptyEstate from "@/app/pages/components/EmptyEstate";
import getConversationById from "../../actions/getConversationById";
import getMessages from "@/app/actions/getMessages";
import Header from "./components/Header";
import Body from "./components/Body";
import Form from "./components/Form";
import styles from "./styling.css";


const ConversationId  = async ({params}) => {

    

    const conversation = await getConversationById(params.conversationid);
    

    const messages = await getMessages(params.conversationid);
    

    if (!conversation){
        return (
            <div className="emptystate">
                <EmptyEstate text="Conversation not found"/>
            </div>
        )
    }
    
    return(
        <div className="conversationBox_container">
            <Header conversation={conversation}/>
            <Body initialMessages={messages}/>
            <div className="conversationBox_container_form">
                <Form />
            </div>
            
        </div>
    )
}

export default ConversationId;