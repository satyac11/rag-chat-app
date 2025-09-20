import React, { useState } from "react";

export default function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = () => {
    if (!input.trim()) return;

    // Push user message to chat
    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);

    setInput("");
    setIsLoading(true);

    // Call backend SSE endpoint
    const eventSource = new EventSource("http://localhost:8080/api/msg?messsage=" + encodeURIComponent(userMessage.content));

    // Add empty assistant message placeholder
    let assistantMessage = { role: "assistant", content: "" };
    setMessages((prev) => [...prev, assistantMessage]);

    eventSource.onmessage = (event) => {
      const token = event.data;

      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          ...updated[updated.length - 1],
          content: updated[updated.length - 1].content + token,
        };
        return updated;
      });
    };

    eventSource.onerror = () => {
      setIsLoading(false);
      eventSource.close();
    };

    eventSource.onopen = () => {
      setIsLoading(false);
    };
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 p-4">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto mb-4 bg-white shadow-md rounded-2xl p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-2xl max-w-[75%] whitespace-pre-wrap ${
              msg.role === "user"
                ? "bg-blue-500 text-white ml-auto"
                : "bg-gray-200 text-gray-900 mr-auto"
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>

      {/* Input box */}
      <div className="flex gap-2">
        <input
          className="flex-1 p-3 border rounded-2xl shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded-2xl shadow hover:bg-blue-600 disabled:opacity-50"
        >
          {isLoading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}
