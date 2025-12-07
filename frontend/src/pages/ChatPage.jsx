import ActiveTabSwitch from '../components/ActiveTabSwitch';
import BorderAnimatedContainer from '../components/BorderAnimatedContainer';
import ChatContainer from '../components/ChatContainer';
import ContactList from '../components/ContactList';
import ProfileHeader from '../components/ProfileHeader';
import ChatsList from '../components/ChatsList';
import NoConversationPlaceholder from "../components/NoConversationPlaceholder.jsx";
import { useChatStore } from "../store/useChatStore.js";


function ChatPage() {

  const { activeTab } = useChatStore();   // ✅ FIXED TYPO
  const { selectedUser } = useChatStore();

  return (
    <div className='relative w-full max-w-6x1 h-[800px]'>
      <BorderAnimatedContainer>
        
        {/* LEFT SIDE */}
        <div className='w-80 bg-slate-800/50 backdrop-blur-sm flex flex-col'>
          <ProfileHeader />
          <ActiveTabSwitch />

          <div className='flex-1 overflow-y-auto p-4 space-y-2'>
            {/* ✅ FIXED — RENDER ChatsList, NOT ChatPage */}
            {activeTab === "chats" ? <ChatsList /> : <ContactList />}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className='flex-1 flex flex-col bg-slate-900/50 backdrop-blur-sm'>
          {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
        </div>

      </BorderAnimatedContainer>
    </div>
  );
}

export default ChatPage;
