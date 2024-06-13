import getConversations from "../actions/getConversations";
import SideBar from "../pages/components/SideBar";
import ConversationList from "./components/ConversationList";
import UseConversation from "../hooks/useConversation";
import getUsers from "../actions/getUsers";

export default async function ConversationLayout({ children }) {

  const conversations = await getConversations();
  const users =await getUsers();
  
 

  return (
    <div >
      <SideBar>
        <ConversationList initialItems={conversations} users={users}/>
        <div>{children}</div>
    </SideBar>
    </div>
  );
}
