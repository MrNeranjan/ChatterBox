import getConversations from "../actions/getConversations";
import SideBar from "../pages/components/SideBar";
import ConversationList from "./components/ConversationList";
import UseConversation from "../hooks/useConversation";

export default async function ConversationLayout({ children }) {

  const conversations = await getConversations();
  
 

  return (
    <div >
      <SideBar>
        <ConversationList initialItems={conversations} />
        <div>{children}</div>
    </SideBar>
    </div>
  );
}
