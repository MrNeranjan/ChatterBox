import getConversations from "../actions/getConversations";
import SideBar from "../pages/components/SideBar";
import ConversationList from "./components/ConversationList";

export default async function ConversationLayout({ children }) {

  const conversations = await getConversations();
  
  console.log("conversations : ", conversations);

  return (
    <div >
      <SideBar>
        <ConversationList initialItems={conversations} />
        <div>{children}</div>
    </SideBar>
    </div>
  );
}
