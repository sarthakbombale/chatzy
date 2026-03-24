import { XIcon, ArrowLeft } from "lucide-react"; // Added ArrowLeft
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { useChatStore } from "../store/useChatStore.js";

function ChatHeader() {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers = [] } = useAuthStore();

  if (!selectedUser) return null;

  const isOnline = onlineUsers?.includes(selectedUser._id);

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") setSelectedUser(null);
    };
    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [setSelectedUser]);

  return (
    <div className="flex justify-between items-center bg-slate-800/50 border-b border-slate-700/50 min-h-[70px] md:max-h-[84px] px-4 md:px-6">
      <div className="flex items-center space-x-3">
        {/* MOBILE BACK BUTTON */}
        <button onClick={() => setSelectedUser(null)} className="md:hidden">
          <ArrowLeft className="w-6 h-6 text-slate-400" />
        </button>

        <div className={`avatar ${isOnline ? "online" : "offline"}`}>
          <div className="w-10 md:w-12 rounded-full">
            <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} />
          </div>
        </div>

        <div>
          <h3 className="text-slate-200 font-medium text-sm md:text-base">{selectedUser.fullName}</h3>
          <p className="text-slate-400 text-xs">{isOnline ? "Online" : "Offline"}</p>
        </div>
      </div>

      <button onClick={() => setSelectedUser(null)} className="hidden md:block">
        <XIcon className="w-5 h-5 text-slate-400 hover:text-slate-200" />
      </button>
    </div>
  );
}

export default ChatHeader;