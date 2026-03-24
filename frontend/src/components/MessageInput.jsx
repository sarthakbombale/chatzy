import { useState, useRef } from "react";
import useKeyboardSound from "../hooks/useKeyboardSound.js";
import { useChatStore } from "../store/useChatStore.js";
import { ImagesIcon, SendIcon, XIcon } from "lucide-react";


function MessageInput() {
  const { playRandomKeyStrokeSound } = useKeyboardSound();
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage, isSoundEnabled } = useChatStore();

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    if (isSoundEnabled) playRandomKeyStrokeSound();
    sendMessage({ text: text.trim(), image: imagePreview });
    setText("");
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="p-2 md:p-4 border-t border-slate-700/50">
      {imagePreview && (
        <div className="mb-3 flex items-center px-2">
          <div className="relative">
            <img src={imagePreview} alt="Preview" className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg" />
            <button onClick={() => setImagePreview(null)} className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-white">
              <XIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center space-x-2 md:space-x-4">
        <input
          type="text"
          value={text}
          onChange={(e) => { setText(e.target.value); isSoundEnabled && playRandomKeyStrokeSound(); }}
          className="flex-1 bg-slate-800/50 text-white placeholder-slate-400 border border-slate-700/50 rounded-lg py-2 px-3 md:px-4 text-sm md:text-base focus:outline-none"
          placeholder="Type..."
        />
        <input type="file" accept="image/*" ref={fileInputRef} onChange={(e) => {
           const file = e.target.files[0];
           const reader = new FileReader();
           reader.onloadend = () => setImagePreview(reader.result);
           reader.readAsDataURL(file);
        }} className="hidden" />
        
        <button type="button" onClick={() => fileInputRef.current?.click()} className="text-slate-400 hover:text-cyan-500">
          <ImagesIcon className="w-5 h-5" />
        </button>

        <button type="submit" disabled={!text.trim() && !imagePreview} className="bg-cyan-500 text-white p-2 md:px-4 md:py-2 rounded-lg disabled:opacity-50">
          <SendIcon className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}

export default MessageInput;