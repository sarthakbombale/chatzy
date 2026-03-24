import ActiveTabSwitch from '../components/ActiveTabSwitch';
import BorderAnimatedContainer from '../components/BorderAnimatedContainer';
import ChatContainer from '../components/ChatContainer';
import ContactList from '../components/ContactList';
import ProfileHeader from '../components/ProfileHeader';
import ChatsList from '../components/ChatsList';
import NoConversationPlaceholder from "../components/NoConversationPlaceholder.jsx";
import { useChatStore } from '../store/useChatStore.js';

function ChatPage() {
  const { activeTab, selectedUser } = useChatStore();

  return (
    // FIXED: h-screen on mobile, fixed height on desktop
    <div className='relative w-full max-w-6xl h-screen md:h-[800px]'>
      <BorderAnimatedContainer>
        
        {/* LEFT SIDE - Sidebar */}
        {/* FIXED: Hidden on mobile if a user is selected */}
        <div className={`w-full md:w-80 bg-slate-800/50 backdrop-blur-sm flex flex-col ${selectedUser ? "hidden md:flex" : "flex"}`}>
          <ProfileHeader />
          <ActiveTabSwitch />

          <div className='flex-1 overflow-y-auto p-4 space-y-2'>
            {activeTab === "chats" ? <ChatsList /> : <ContactList />}
          </div>
        </div>

        {/* RIGHT SIDE - Chat Area */}
        {/* FIXED: Hidden on mobile if NO user is selected */}
        <div className={`flex-1 flex flex-col bg-slate-900/50 backdrop-blur-sm ${!selectedUser ? "hidden md:flex" : "flex"}`}>
          {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
        </div>

      </BorderAnimatedContainer>
    </div>
  );
}

export default ChatPage;