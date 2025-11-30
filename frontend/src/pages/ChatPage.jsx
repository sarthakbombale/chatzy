import ActiveTabSwitch from '../components/ActiveTabSwitch';
import BorderAnimatedContainer from '../components/BorderAnimatedContainer';
import ChatContainer from '../components/ChatContainer';
import ContactList from '../components/ContactList';
import ProfileHeader from '../components/ProfileHeader';
import { useChatStore } from '../store/usechatStore';
import ChatsList from '../components/ChatsList';
import NoConversationPlaceholder from '../components/NoConversationPlaceholder.JSX';



function ChatPage() {

  const { actvieTab } = useChatStore();
  const { selectedUser } = useChatStore();


  return (
    <div className='relative w-full max-w-6x1 h-[800px]'>
      <BorderAnimatedContainer>
        {/* left side */}
        <div className='w-80 bg-slate-800/50 backdrop-blur-sm flex flex-col'>
          <ProfileHeader />
          <ActiveTabSwitch />

          <div className='flex-1 overflow-y-auto p-4 space-y-2'>
            {actvieTab === "chats" ? <ChatPage /> : <ContactList />}
          </div>
        </div>

        {/* right side */}
        <div className='flex-1 flex flex-col bg-slate-900/50 backdrop-blur-sm'>
          {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}

        </div>
      </BorderAnimatedContainer>
    </div>
  );
}

export default ChatPage