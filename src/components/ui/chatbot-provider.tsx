'use client';

import { useState } from 'react';
import { Chatbot, ChatbotToggle } from './chatbot';

interface ChatbotProviderProps {
  children: React.ReactNode;
}

export function ChatbotProvider({ children }: ChatbotProviderProps) {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const openChatbot = () => setIsChatbotOpen(true);
  const closeChatbot = () => setIsChatbotOpen(false);

  return (
    <>
      {children}
      <ChatbotToggle onClick={openChatbot} />
      <Chatbot isOpen={isChatbotOpen} onClose={closeChatbot} />
    </>
  );
}