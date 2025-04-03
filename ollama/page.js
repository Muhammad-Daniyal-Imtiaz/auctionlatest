'use client';

import { useState, useRef } from 'react';

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const abortControllerRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    abortControllerRef.current = new AbortController();
    let aiMessageContent = '';

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) throw new Error('Stream failed');
      if (!response.body) throw new Error('No response body');

      // Add empty assistant message to start with
      setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);
      const messageIndex = messages.length; // Track the position of the AI message

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        aiMessageContent += chunk;

        // Update only the last message (the AI response)
        setMessages((prev) => {
          const newMessages = [...prev];
          newMessages[messageIndex].content = aiMessageContent;
          return newMessages;
        });
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Stream error:', error);
        setMessages((prev) => [
          ...prev,
          { 
            role: 'assistant', 
            content: `Error: ${error.message}`,
            isError: true 
          },
        ]);
      }
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handleCancel = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setIsLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 h-screen flex flex-col bg-gray-50">
      <div className="flex-1 overflow-y-auto mb-4 space-y-4 py-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-4 ${
                message.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : message.isError
                  ? 'bg-red-100 text-red-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {message.content || (isLoading && index === messages.length - 1 && '...')}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-auto py-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your message..."
            disabled={isLoading}
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
            disabled={isLoading || !input.trim()}
          >
            Send
          </button>
          {isLoading && (
            <button
              type="button"
              onClick={handleCancel}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Stop
            </button>
          )}
        </div>
      </form>
    </div>
  );
}