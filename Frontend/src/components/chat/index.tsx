import { useState, useEffect, useRef } from "react";
import { FaPaperPlane, FaUserCircle } from "react-icons/fa";

export const Chat = ({ documentId }: { documentId: string }) => {
  const [messages, setMessages] = useState<{ text: string; user: string }[]>(
    []
  );
  const [input, setInput] = useState("");
  const [ws, setWs] = useState<WebSocket | null>(null);
  const endOfMessagesRef = useRef<null | HTMLDivElement>(null);

  const string = `wss://ec2-18-231-30-122.sa-east-1.compute.amazonaws.com:3333/document/${documentId}/chat`;

  useEffect(() => {
    const socket = new WebSocket(string);
    setWs(socket);

    socket.onmessage = (event) => {
      const message = event.data;
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: message, user: "bot" },
      ]);
    };

    return () => {
      socket.close();
    };
  }, [string]);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (input.trim() && ws) {
      ws.send(input);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: input, user: "user" },
      ]);
      setInput("");
    }
  };

  return (
    <div className="w-full min-h-[250px] max-h-[180px] mx-auto flex flex-col bg-primary p-4 rounded-lg">
      <div className="flex-1 overflow-y-auto mb-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-start mb-4 ${
              message.user === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {message.user === "bot" && (
              <FaUserCircle className="text-white mr-2" size={32} />
            )}
            <div
              className={`p-2 rounded-lg ${
                message.user === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-black"
              }`}
            >
              {message.text}
            </div>
            {message.user === "user" && (
              <FaUserCircle className="text-white ml-2" size={32} />
            )}
          </div>
        ))}
        <div ref={endOfMessagesRef} />
      </div>
      <div className="flex items-center">
        <input
          type="text"
          className="flex-1 p-2 rounded-l-lg outline-none"
          placeholder="Digite uma mensagem..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          className="bg-blue-500 text-white p-2 rounded-r-lg"
          onClick={handleSend}
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};
