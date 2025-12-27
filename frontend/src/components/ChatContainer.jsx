import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { useChatStore } from "../store/useChatStore.js";
import ChatHeader from "./ChatHeader.jsx";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder.jsx";
import MessageInput from "./MessageInput.jsx";
import IsMessagesLoadingSkeleton from "./isMessagesLoadingSkeleton.jsx";

function ChatContainer() {
  const {
    selectedUser,
    getMessagesByUserId,
    messages = [],
    isMessagesLoading,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();

  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (!selectedUser?._id) return;

    getMessagesByUserId(selectedUser._id);
    subscribeToMessages();

    return unsubscribeFromMessages;
  }, [selectedUser?._id]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {selectedUser && <ChatHeader />}

      <div className="flex-1 px-6 py-8 overflow-y-auto">
        {isMessagesLoading ? (
          <IsMessagesLoadingSkeleton />
        ) : messages.length ? (
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((msg) => {
              const isOwn = msg.senderId === authUser._id;

              return (
                <div
                  key={msg._id}
                  className={`chat ${isOwn ? "chat-end" : "chat-start"}`}
                >
                  <div
                    className={`chat-bubble ${
                      isOwn
                        ? "bg-cyan-600 text-white"
                        : "bg-slate-800 text-slate-200"
                    }`}
                  >
                    {msg.image && (
                      <img
                        src={msg.image}
                        alt="Shared"
                        className="h-48 rounded-lg object-cover"
                      />
                    )}

                    {msg.text && <p className="mt-2">{msg.text}</p>}

                    <p className="mt-1 text-xs opacity-75">
                      {new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              );
            })}
            <div ref={messageEndRef} />
          </div>
        ) : (
          <NoChatHistoryPlaceholder name={selectedUser.fullName} />
        )}
      </div>

      <MessageInput />
    </>
  );
}

export default ChatContainer;
