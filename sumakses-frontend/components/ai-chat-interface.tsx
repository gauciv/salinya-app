"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Send, Mic, Paperclip, MoreHorizontal, ThumbsUp, ThumbsDown, Copy } from "lucide-react"

interface Message {
  id: number
  type: "user" | "bot"
  content: string
  timestamp: Date
  helpful?: boolean
}

export default function AIChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "bot",
      content:
        "Kumusta! 🇵🇭 I'm your AI tutor, ready to help you on your tech journey. Ako ang magiging kasama mo sa pag-transition from BPO to tech career! 😊\n\nPwede mo akong tanungin about:\n• Career guidance at skill translation\n• Learning tips na fit sa schedule mo\n• Tech industry insights sa Philippines\n• Job search advice para sa Filipino professionals\n• Salary expectations at negotiation tips",
      timestamp: new Date(Date.now() - 300000),
    },
  ])
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const quickActions = [
    "How do my BPO skills translate to tech?",
    "What's a realistic salary expectation?",
    "Study tips for night shift workers",
    "Job search advice for Filipinos",
    "Interview preparation tips",
    "How to build confidence in tech",
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
    if (!newMessage.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      type: "user",
      content: newMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setNewMessage("")
    setIsTyping(true)

    // Simulate AI response with simple Filipino context
    setTimeout(() => {
      const responses = [
        "Great question! Your BPO skills are perfect for tech roles like:\n• Quality Assurance Tester\n• Customer Success Manager\n• Technical Writer\n\nYour problem-solving and communication skills are exactly what tech companies need. Want to learn more about any of these roles?",

        "I understand your concern. Many BPO professionals worry about the same thing.\n\nHere's the truth: Your skills are very valuable!\n\n✅ Problem-solving = Perfect for debugging\n✅ Customer service = User experience understanding\n✅ Documentation = Technical writing\n✅ Training others = Team leadership\n\nWhich skill would you like to explore?",

        "That's a smart approach! Here's a simple timeline:\n\n📅 Months 1-3: Learn basic tech concepts\n📅 Months 4-6: Build technical skills\n📅 Months 7-9: Prepare for job applications\n\nMany companies value Filipino professionals for their work ethic and communication skills.\n\nWould you like to start with the basics?",
      ]

      const randomResponse = responses[Math.floor(Math.random() * responses.length)]

      const botMessage: Message = {
        id: messages.length + 2,
        type: "bot",
        content: randomResponse,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 2000)
  }

  const handleQuickAction = (action: string) => {
    setNewMessage(action)
  }

  const handleMessageFeedback = (messageId: number, helpful: boolean) => {
    setMessages((prev) => prev.map((msg) => (msg.id === messageId ? { ...msg, helpful } : msg)))
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  return (
    <div className="flex flex-col h-full max-h-[600px]">
      {/* Simple Chat Header */}
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">AI</span>
              </div>
              <div>
                <h3 className="font-semibold">AI Tutor</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Online • Filipino & English</span>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Simple Quick Actions */}
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">Quick questions:</p>
        <div className="flex flex-wrap gap-2">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => handleQuickAction(action)}
            >
              {action}
            </Button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] ${message.type === "user" ? "order-2" : "order-1"}`}>
              <div
                className={`p-3 rounded-lg ${
                  message.type === "user" ? "bg-blue-600 text-white" : "bg-white border border-gray-200 shadow-sm"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>

              <div
                className={`flex items-center mt-1 space-x-2 ${message.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <span className="text-xs text-gray-500">{formatTime(message.timestamp)}</span>

                {message.type === "bot" && (
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => handleMessageFeedback(message.id, true)}
                    >
                      <ThumbsUp
                        className={`h-3 w-3 ${message.helpful === true ? "text-green-600" : "text-gray-400"}`}
                      />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => handleMessageFeedback(message.id, false)}
                    >
                      <ThumbsDown
                        className={`h-3 w-3 ${message.helpful === false ? "text-red-600" : "text-gray-400"}`}
                      />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => navigator.clipboard.writeText(message.content)}
                    >
                      <Copy className="h-3 w-3 text-gray-400" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="border-t pt-4">
        <div className="flex items-end space-x-2">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Mic className="h-4 w-4" />
              </Button>
            </div>
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  sendMessage()
                }
              }}
              placeholder="Type your message in English or Filipino..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={2}
            />
          </div>
          <Button onClick={sendMessage} disabled={!newMessage.trim() || isTyping} className="mb-2">
            <Send className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
          <span>Press Enter to send, Shift+Enter for new line</span>
          <Badge variant="secondary" className="text-xs">
            Powered by AI
          </Badge>
        </div>
      </div>
    </div>
  )
}
