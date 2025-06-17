'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import supabase from "../../../Supabase/config";
import { useUser } from '@clerk/clerk-react';
import { MessageCircle, SendHorizonal, Search, MoreVertical, X } from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';

export default function ChannelPage() {
  const router = useRouter();
  const { user } = useUser();
  const { channelName } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [error, setError] = useState(null);
  const [channels, setChannels] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  useEffect(() => {
    if (!channelName) return;

    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('channels')
        .select('messages')
        .eq('channel_name', channelName)
        .single();

      if (error) {
        console.error('Error fetching messages:', error);
        setError('Failed to fetch messages.');
        return;
      }

      setMessages(data?.messages || []);
      setError(null);
    };

    fetchMessages();

    const channel = supabase
      .channel(`channel_${channelName}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'channels',
          filter: `channel_name=eq.${channelName}`
        },
        (payload) => setMessages(payload.new.messages || [])
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [channelName]);

  useEffect(() => {
    const fetchChannels = async () => {
      const { data, error } = await supabase
        .from('channels')
        .select('channel_name, created_at, messages');

      if (error) {
        console.error('Error fetching channels:', error);
        setError('Failed to fetch channels.');
        return;
      }

      const channelsWithLastMessage = data.map(channel => {
        const messages = channel.messages || [];
        const lastMessage = messages.length > 0 ? messages[messages.length - 1] : null;
        return {
          ...channel,
          last_message: lastMessage?.content || 'No messages yet',
          last_message_time: lastMessage?.time || null
        };
      });

      setChannels(channelsWithLastMessage);
    };

    fetchChannels();
  }, [messages]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !channelName) return;

    const newMsg = {
      content: newMessage,
      sender_id: user.id,
      receiver_id: getReceiverId(),
      time: new Date().toISOString(),
    };

    const { data: channelData, error: channelError } = await supabase
      .from('channels')
      .select('messages')
      .eq('channel_name', channelName)
      .single();

    if (channelError) {
      console.error('Error checking channel:', channelError);
      setError('Failed to check channel.');
      return;
    }

    if (!channelData) {
      const { error: createError } = await supabase
        .from('channels')
        .insert([{ channel_name: channelName, user1_id: user.id, user2_id: getReceiverId(), messages: [newMsg] }]);

      if (createError) {
        console.error('Error creating channel:', createError);
        setError('Failed to create channel.');
        return;
      }
    } else {
      const updatedMessages = [...channelData.messages, newMsg];

      const { error: updateError } = await supabase
        .from('channels')
        .update({ messages: updatedMessages })
        .eq('channel_name', channelName);

      if (updateError) {
        console.error('Error updating messages:', updateError);
        setError('Failed to send message.');
        return;
      }
    }

    setNewMessage('');
    setError(null);
    setShowEmojiPicker(false); // Close emoji picker after sending message
  };

  const getReceiverId = () => {
    if (!channelName) return null;
    const channelParts = channelName.split('_');
    return channelParts.includes(user?.id?.toString())
      ? channelParts.find(part => part !== user?.id?.toString())
      : null;
  };

  const filteredChannels = channels.filter(channel =>
    channel.channel_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getChannelColor = (name) => {
    // Using black and white theme for channel icons
    return 'bg-gray-200 text-gray-800';
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleEmojiClick = (emojiObject) => {
    setNewMessage((prevMessage) => prevMessage + emojiObject.emoji);
    setShowEmojiPicker(false); // Close emoji picker after selecting an emoji
  };

  if (!channelName) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex h-screen w-screen fixed top-0 left-0 right-0 bottom-0 overflow-hidden bg-white">
      {/* Sidebar - simplified black and white */}
      <div className="w-1/4 min-w-[300px] border-r border-gray-200 bg-black flex flex-col h-full">
        <div className="p-4 bg-black flex justify-between items-center">
          <div className="flex items-center">
            <MessageCircle className="text-white mr-3" />
            <h1 className="font-bold text-xl text-white">Messages</h1>
          </div>
          <MoreVertical className="text-white" />
        </div>
        <div className="p-3 bg-black">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full bg-black rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 border border-gray-700 text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {filteredChannels.map((channel, index) => (
            <div
              key={index}
              className={`flex items-center p-3 border-b border-gray-800 cursor-pointer transition-all duration-200 hover:bg-gray-900 ${channelName === channel.channel_name ? 'bg-gray-900' : ''}`}
              onClick={() => router.push(`/messages/${channel.channel_name}`)}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold mr-3 ${getChannelColor(channel.channel_name)}`}>
                {channel.channel_name?.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <h2 className="font-semibold text-white truncate">{channel.channel_name}</h2>
                  <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
                    {channel.last_message_time ? new Date(channel.last_message_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'New'}
                  </span>
                </div>
                <p className="text-sm text-gray-400 truncate">
                  {channel.last_message || 'No messages yet'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main chat area - mirror-like grey */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-gray-100">
        <div className="p-4 bg-white flex justify-between items-center shadow-md border-b border-gray-200">
          <div className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold mr-3 ${getChannelColor(channelName)}`}>
              {channelName?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">{channelName}</h2>
              <p className="text-xs text-gray-500">Active now</p>
            </div>
          </div>
          <div className="flex space-x-4">
            <Search className="text-gray-500 hover:text-gray-700 cursor-pointer" />
            <MoreVertical className="text-gray-500 hover:text-gray-700 cursor-pointer" />
          </div>
        </div>
        <div className="flex-1 p-6 overflow-y-auto bg-gray-100">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
              <p className="text-lg mb-2">No messages yet</p>
              <p className="text-sm">Start a conversation by sending a message below.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.sender_id === user?.id ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${msg.sender_id === user?.id ?
                      'bg-black text-white rounded-br-none' :
                      'bg-white border border-gray-200 text-black rounded-bl-none shadow-sm'}`}
                  >
                    {msg.sender_id !== user?.id && (
                      <p className="text-xs font-semibold text-gray-500 mb-1">{msg.sender_name}</p>
                    )}
                    <p className={`text-sm ${msg.sender_id === user?.id ? 'text-white' : 'text-gray-800'}`}>
                      {msg.content}
                    </p>
                    <p className={`text-xs mt-1 ${msg.sender_id === user?.id ? 'text-gray-300' : 'text-gray-500'}`}>
                      {new Date(msg.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="p-4 bg-white border-t border-gray-200 shadow-inner">
          <div className="flex items-center">
            <div className="flex-1 bg-gray-100 rounded-full px-5 py-3 focus-within:ring-2 focus-within:ring-gray-300 focus-within:bg-white transition-all">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="w-full bg-transparent focus:outline-none text-gray-800 placeholder-gray-500"
              />
            </div>
            <button
              onClick={() => setShowEmojiPicker((prev) => !prev)}
              className="ml-3 w-12 h-12 rounded-full bg-gray-200 text-gray-800 flex items-center justify-center hover:bg-gray-300 transition-all shadow-md"
            >
              😃
            </button>
            <button
              onClick={sendMessage}
              disabled={!newMessage.trim()}
              className="ml-3 w-12 h-12 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <SendHorizonal className="h-5 w-5" />
            </button>
          </div>
          {showEmojiPicker && (
            <div className="absolute bottom-20 left-4 bg-white border border-gray-200 rounded-lg p-4 shadow-lg">
              <button
                onClick={() => setShowEmojiPicker(false)}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
      </div>
    </div>
  );
}