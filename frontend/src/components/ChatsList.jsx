import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import { useAuthStore } from "../store/useAuthStore";

function ChatsList() {
  const { getMyChatPartners, chats, isUsersLoading, selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers = [] } = useAuthStore();

  useEffect(() => {
    getMyChatPartners();
  }, [getMyChatPartners]);

  if (isUsersLoading) return <UsersLoadingSkeleton />;

  const aiBotUser = {
    _id: "ai-bot",
    fullName: "Chatzy AI Bot",
    profilePic: "https://fonts.gstatic.com/s/i/short-term/release/googlesymbols/robot/default/24px.svg",
  };

  const finalChatsArray = [aiBotUser, ...chats];

  return (
    <>
      {finalChatsArray.map((chat) => {
        const isSelected = selectedUser?._id === chat._id;
        const isBot = chat._id === "ai-bot";
        const isOnline = isBot || onlineUsers?.includes(chat._id);

        return (
          <div
            key={chat._id}
            className={`p-4 rounded-lg cursor-pointer transition-colors ${isSelected
                ? "bg-cyan-500/30 border border-cyan-500/40"
                : "bg-cyan-500/10 hover:bg-cyan-500/20"
              }`}
            onClick={() => setSelectedUser(chat)}
          >
            <div className="flex items-center gap-3">
              {/* Status Indicator (Bot is always marked online) */}
              <div className={`avatar ${isOnline ? "online" : "offline"}`}>
                <div className="size-12 rounded-full bg-slate-700 flex items-center justify-center p-1 overflow-hidden">
                  <img
                    src={chat.profilePic || "/avatar.png"}
                    alt={chat.fullName}
                    className={isBot ? "invert" : ""} // subtle invert for default dark theme style if needed
                  />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="text-slate-200 font-medium truncate">{chat.fullName}</h4>
                {isBot && <p className="text-xs text-cyan-400 font-light">AI Companion</p>}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default ChatsList;