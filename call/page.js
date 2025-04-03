'use client';
import React, { useState, useEffect } from 'react';
import Vapi from '@vapi-ai/web';

const TextToVoiceChat = () => {
  const [userMessage, setUserMessage] = useState('');
  const [assistantResponse, setAssistantResponse] = useState('');
  const [vapiInstance, setVapiInstance] = useState(null);

  useEffect(() => {
    // Initialize the Vapi client
    const vapi = new Vapi('a2f7a9c0-3cab-4219-b472-1d44e6fca073');
    setVapiInstance(vapi);

    // Handle call events
    vapi.on('call-start', () => {
      console.log('Call has started');
    });

    vapi.on('call-end', () => {
      console.log('Call has ended');
    });

    vapi.on('message', (message) => {
      console.log('Message received:', message);
      // Handle the assistant's response
      if (message.role === 'assistant') {
        setAssistantResponse(message.content);
        vapi.say(message.content); // Convert text to speech
      }
    });

    vapi.on('error', (e) => {
      console.error('Error:', e);
    });

    // Cleanup on component unmount
    return () => {
      vapi.stop();
    };
  }, []);

  const handleSendMessage = () => {
    if (vapiInstance && userMessage) {
      vapiInstance.send({
        type: 'add-message',
        message: {
          role: 'user',
          content: userMessage,
        },
      });
      setUserMessage('');
    }
  };

  const startCall = () => {
    if (vapiInstance) {
      vapiInstance.start('eabc7ef5-531c-49a4-b2fd-dfdf6e293478');
    }
  };

  return (
    <div>
      <h2>Chat with Assistant</h2>
      <textarea
        value={userMessage}
        onChange={(e) => setUserMessage(e.target.value)}
        placeholder="Type your message here"
      />
      <button onClick={handleSendMessage}>Send Message</button>
      <button onClick={startCall}>Start Call</button>
      <p>Assistant Response: {assistantResponse}</p>
    </div>
  );
};

export default TextToVoiceChat;
