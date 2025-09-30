'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, X, Loader2 } from 'lucide-react'

interface Message {
  id: string
  content: string
  isUser: boolean
  timestamp: Date
}

interface ChatbotProps {
  isOpen: boolean
  onClose: () => void
}

// Woman in saree icon using the provided SVG file
const WomanInSareeIcon = () => (
  <div className="w-8 h-8 flex items-center justify-center">
    <img 
      src="/woman-in-saree.svg" 
      alt="Woman in Saree" 
      className="w-full h-full object-contain"
    />
  </div>
)

export function Chatbot({ isOpen, onClose }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Namaste! I'm AASHNI, your personal jewelry assistant from Chennai. I'm here to help you discover our exquisite collections, provide styling advice, and share jewelry care tips. How may I assist you today?",
      isUser: false,
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    try {
      // Only send API call when user actually sends a message
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(msg => ({
            role: msg.isUser ? 'user' : 'assistant',
            content: msg.content
          }))
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.message || 'I apologize, but I\'m having trouble responding right now. Please try again in a moment.',
        isUser: false,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'I apologize, but I\'m having trouble responding right now. Please try again in a moment.',
        isUser: false,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-20 right-4 left-4 sm:bottom-24 sm:right-8 sm:left-auto sm:w-96 h-[500px] sm:h-[600px] bg-white rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden z-[9999] backdrop-blur-sm flex flex-col"
          style={{
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.05)'
          }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-900 via-gray-900 to-slate-900 p-4 sm:p-6 flex items-center justify-between relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent"></div>
            <div className="absolute inset-0" style={{
              background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(184, 134, 11, 0.05) 100%)'
            }}></div>
            <div className="flex items-center space-x-3 sm:space-x-4 relative z-10">
              <div className="bg-gradient-to-br from-amber-100 to-yellow-50 p-2 sm:p-3 rounded-2xl shadow-lg border border-amber-200/20">
                <WomanInSareeIcon />
              </div>
              <div>
                <h3 className="font-serif text-white text-lg sm:text-xl font-light tracking-wider">AASHNI</h3>
                <p className="text-xs text-gray-300 font-light tracking-wide uppercase hidden sm:block">Personal Jewelry Concierge</p>
                <p className="text-xs text-gray-300 font-light tracking-wide uppercase sm:hidden">Jewelry Assistant</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-300 hover:text-white transition-all duration-300 relative z-10 bg-white/5 hover:bg-white/10 p-2 rounded-xl backdrop-blur-sm border border-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-gray-50/30 to-white/50">
            {messages.map((message, index) => (
              <motion.div
                key={message.id || index}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-4 shadow-lg ${
                    message.isUser
                      ? 'bg-gradient-to-br from-slate-800 to-gray-900 text-white rounded-3xl rounded-br-lg border border-slate-700/20'
                      : 'bg-gradient-to-br from-white to-gray-50 text-gray-800 rounded-3xl rounded-bl-lg border border-gray-200/50 shadow-xl'
                  }`}
                  style={{
                    backdropFilter: 'blur(10px)',
                    boxShadow: message.isUser 
                      ? '0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                      : '0 8px 32px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
                  }}
                >
                  <p className="text-sm leading-relaxed font-light">{message.content}</p>
                  <p className={`text-xs mt-2 font-light ${
                    message.isUser ? 'text-gray-300' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-gradient-to-br from-white to-gray-50 p-4 rounded-3xl rounded-bl-lg border border-gray-200/50 shadow-xl backdrop-blur-sm">
                  <div className="flex items-center space-x-3">
                    <Loader2 className="w-4 h-4 animate-spin text-gray-600" />
                    <span className="text-sm text-gray-700 font-light">AASHNI is crafting a response...</span>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 sm:p-6 border-t border-gray-200/30 bg-gradient-to-r from-white/90 to-gray-50/90 backdrop-blur-xl">
            <div className="flex space-x-2 sm:space-x-4">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Inquire about our exquisite collections..."
                className="flex-1 px-3 py-2 sm:px-6 sm:py-4 border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-400/50 focus:border-slate-300 bg-white/90 backdrop-blur-sm text-gray-800 placeholder-gray-500 font-light shadow-lg transition-all duration-300 text-sm sm:text-base"
                style={{
                  boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.1)'
                }}
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="p-2 sm:p-4 bg-gradient-to-br from-slate-800 to-gray-900 text-white rounded-2xl hover:from-slate-700 hover:to-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl border border-slate-700/20"
                style={{
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}
              >
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

interface ChatbotToggleProps {
  onClick: () => void;
}

export function ChatbotToggle({ onClick }: ChatbotToggleProps) {
  const [showBubble, setShowBubble] = useState(true);

  return (
    <>
      {/* Speech Bubble */}
      <AnimatePresence>
        {showBubble && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.8 }}
            className="fixed bottom-20 right-2 sm:bottom-24 sm:right-2 z-[9999] cursor-pointer"
            onClick={() => setShowBubble(false)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative">
              <motion.div 
                className="bg-gradient-to-br from-white to-gray-50 px-3 py-2 sm:px-4 sm:py-3 rounded-2xl shadow-xl border border-gray-200/50 backdrop-blur-sm hover:shadow-2xl transition-shadow duration-300"
                style={{
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
                }}
                whileHover={{
                  boxShadow: '0 12px 40px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.9)'
                }}
              >
                <p className="text-xs sm:text-sm text-gray-700 font-light whitespace-nowrap">
                  How may I help you?
                </p>
              </motion.div>
              {/* Speech bubble tail */}
              <div 
                className="absolute -bottom-2 right-12 w-4 h-4 bg-gradient-to-br from-white to-gray-50 border-r border-b border-gray-200/50 transform rotate-45"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 100% 100%)'
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
       <motion.button
         onClick={onClick}
         className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 bg-gradient-to-br from-white to-gray-50 hover:from-gray-50 hover:to-gray-100 text-gray-800 rounded-full transition-all duration-500 flex items-center justify-center z-[9998] border border-gray-200/50"
         style={{
           width: '60px',
           height: '60px',
           borderRadius: '50%',
           boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08), 0 8px 16px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
         }}
         whileHover={{ 
           scale: 1.05,
           boxShadow: '0 25px 50px rgba(0, 0, 0, 0.12), 0 10px 20px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.9)'
         }}
         whileTap={{ scale: 0.95 }}
         initial={{ scale: 0, opacity: 0 }}
         animate={{ scale: 1, opacity: 1 }}
         transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
       >
         <div 
           className="flex items-center justify-center"
           style={{
             width: '40px',
             height: '40px',
             overflow: 'hidden'
           }}
         >
           <div 
             style={{
               width: '32px',
               height: '32px',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center'
             }}
           >
             <WomanInSareeIcon />
           </div>
         </div>
       </motion.button>
    </>
  )
}