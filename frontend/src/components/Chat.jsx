import React, { useState } from "react";

export default function Chat() {
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([]);

  const send = () => {
    setChat([...chat, { user: msg, ai: "AI response here" }]);
    setMsg("");
  };

  return (
    <div>
      <div className="h-96 overflow-y-scroll">
        {chat.map((c, i) => (
          <div key={i}>
            <p>{c.user}</p>
            <p className="text-blue-500">{c.ai}</p>
          </div>
        ))}
      </div>

      <input
        className="border p-2"
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
      />
      <button onClick={send}>Send</button>
    </div>
  );
}