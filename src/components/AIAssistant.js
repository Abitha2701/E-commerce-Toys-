import React, { useState } from "react";
import "./AIAssistant.css";

const AIAssistant = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    setLoading(true);
    setReply("");

    try {
      const res = await fetch("http://localhost:6005/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      setReply(data.reply);
    } catch (err) {
      setReply("Sorry, something went wrong.");
    }

    setLoading(false);
    setMessage("");
  };

  return (
    <>
      {/* Floating Button */}
      <div className="ai-fab" onClick={() => setOpen(!open)}>
        🤖
      </div>

      {/* Chat Box */}
      {open && (
        <div className="ai-chatbox">
          <div className="ai-header">
            <span>Toycra AI Assistant</span>
            <button onClick={() => setOpen(false)}>✖</button>
          </div>

          <div className="ai-body">
            <p className="ai-msg">
              Hi! 👋 Ask me about toys, gifts, or recommendations.
            </p>

            {reply && <p className="ai-reply">{reply}</p>}
          </div>

          <div className="ai-input">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask something..."
            />
            <button onClick={sendMessage}>
              {loading ? "..." : "Send"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;
