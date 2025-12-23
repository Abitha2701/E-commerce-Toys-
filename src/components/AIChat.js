import { useState } from "react";

const AIChat = () => {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:3000/api/ai/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    setReply(data.reply);
    setLoading(false);
  };

  return (
    <div className="ai-box">
      <h3>🤖 AI Assistant</h3>

      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask about toys..."
      />

      <button onClick={sendMessage}>
        {loading ? "Thinking..." : "Ask AI"}
      </button>

      {reply && <p><strong>AI:</strong> {reply}</p>}
    </div>
  );
};

export default AIChat;
