"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Send, Terminal, X } from "lucide-react"

export default function ChatWithSeller({ seller, className = "" }) {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "seller",
      text: "SYSTEM: Connection established. How can I assist with this product?",
      timestamp: new Date(Date.now() - 3600000),
    },
  ])

  const handleSendMessage = () => {
    if (!message.trim()) return

    // Add user message
    const newMessage = {
      id: messages.length + 1,
      sender: "user",
      text: message,
      timestamp: new Date(),
    }

    setMessages([...messages, newMessage])
    setMessage("")

    // Simulate seller response after a short delay
    setTimeout(() => {
      const sellerResponse = {
        id: messages.length + 2,
        sender: "seller",
        text: "SYSTEM: Message received. Processing request...",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, sellerResponse])
    }, 1000)
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className={className}>
      <div className="cyber-box neon-border-blue">
        <button
          className="w-full flex items-center justify-between p-4 bg-card hover:bg-card/80 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center gap-3">
            <Terminal className="h-5 w-5 text-neon-blue" />
            <span className="uppercase tracking-wider text-neon-blue">NEURAL_CHAT</span>
          </div>
          {isOpen ? (
            <X className="h-5 w-5 text-muted-foreground" />
          ) : (
            <MessageSquare className="h-5 w-5 text-muted-foreground" />
          )}
        </button>

        {isOpen && (
          <div className="p-4 border-t border-neon-blue/30">
            <div className="flex items-center gap-3 mb-4">
              <Avatar className="border border-neon-blue/50">
                <AvatarImage src={seller.avatar} alt={seller.name} />
                <AvatarFallback className="bg-card text-neon-blue">{seller.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="text-neon-blue font-mono">{seller.name}</div>
                <div className="text-xs text-muted-foreground">RESPONSE_TIME: {seller.responseTime}</div>
              </div>
            </div>

            <div className="h-64 overflow-y-auto mb-4 space-y-3 cyber-box p-2 font-mono text-sm">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`
                      max-w-[80%] px-3 py-2
                      ${msg.sender === "user" ? "cyber-box neon-border-pink" : "cyber-box neon-border-blue"}
                    `}
                  >
                    <div className={msg.sender === "user" ? "text-accent" : "text-neon-blue"}>{msg.text}</div>
                    <div className="text-xs text-muted-foreground mt-1">{formatTime(msg.timestamp)}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <Input
                placeholder="ENTER_MESSAGE"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1 bg-card border-neon-blue/50 focus:border-neon-blue font-mono text-sm"
              />
              <Button className="cyber-button-pink" onClick={handleSendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

