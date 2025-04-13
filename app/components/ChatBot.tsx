'use client';

import React, { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'bot';
  content: string;
}

interface ChatBotProps {
  category?: string;
  apiKey: string;
}

const ChatBot = ({ category = '', apiKey }: ChatBotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'bot', 
      content: `Hi! I'm your personal SafeGuard assistant. How can I help you with ${category ? category + ' safety' : 'emergency preparedness'} today?` 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = input.trim();
    setInput('');
    setIsLoading(true);
    
    // Add user message to chat
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    
    try {
      // Example prompt that includes context about the current disaster category
      const prompt = category 
        ? `You are a helpful assistant specializing in emergency preparedness, particularly for ${category} disasters. Help the user with their question: ${userMessage}` 
        : `You are a helpful assistant for emergency preparedness. Help the user with their question: ${userMessage}`;
      
      // Call the API (this would typically be handled through a server-side function)
      // For frontend demonstration, we'll use a simplified approach
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + apiKey, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{ 
            parts: [{ text: prompt }] 
          }]
        })
      });
      
      const data = await response.json();
      let botResponse = '';
      
      if (data.candidates && data.candidates[0]?.content?.parts) {
        botResponse = data.candidates[0].content.parts[0].text;
      } else {
        botResponse = "I'm sorry, I wasn't able to process your request. Please try again.";
      }
      
      // Add bot response to chat
      setMessages(prev => [...prev, { role: 'bot', content: botResponse }]);
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      setMessages(prev => [...prev, { 
        role: 'bot', 
        content: "Sorry, I couldn't connect to my knowledge base. Please check your internet connection and try again." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Suggesting a mock drill based on the disaster category
  const startMockDrill = () => {
    let drillInstructions = '';
    
    switch(category.toLowerCase()) {
      case 'flood':
        drillInstructions = "Let's practice a flood evacuation drill. First, identify the highest point in your home. Imagine water is rising quickly. What's your first action? (Try to respond with what you would do)";
        break;
      case 'earthquake':
        drillInstructions = "Let's practice an earthquake drill. Imagine the ground starts shaking right now. Remember: Drop, Cover, and Hold On. Describe what you would do in the next 30 seconds.";
        break;
      case 'wildfire':
        drillInstructions = "Let's practice a wildfire evacuation drill. You receive an evacuation notice and have 15 minutes to leave. What are the three most important things to take with you?";
        break;
      case 'hurricane':
        drillInstructions = "Let's practice a hurricane preparedness drill. A hurricane is expected to make landfall in 24 hours. What immediate steps would you take to secure your home and family?";
        break;
      default:
        drillInstructions = "Let's practice an emergency evacuation drill. You have 5 minutes to leave your home. What essential items would you gather and what route would you take?";
    }
    
    setMessages(prev => [...prev, { role: 'bot', content: drillInstructions }]);
  };

  return (
    <div className="flex flex-col h-96 border rounded-lg shadow-md bg-white">
      <div className="flex justify-between items-center p-4 border-b">
        <h3 className="font-medium text-gray-800">
          {category ? `${category} Safety Assistant` : 'SafeGuard Assistant'}
        </h3>
        {category && (
          <button 
            onClick={startMockDrill}
            className="text-sm px-3 py-1 bg-primary-600 text-white rounded-md hover:bg-primary-700"
          >
            Start Mock Drill
          </button>
        )}
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] p-3 rounded-lg ${
                message.role === 'user' 
                  ? 'bg-primary-600 text-white rounded-tr-none' 
                  : 'bg-gray-100 text-gray-800 rounded-tl-none'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] p-3 rounded-lg bg-gray-100 text-gray-800 rounded-tl-none">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-75"></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-150"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="border-t p-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your question here..."
            className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
            className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50"
          >
            Send
          </button>
        </div>
        <div className="mt-2 text-xs text-gray-500">
          {category ? `Ask me anything about ${category} safety or preparation` : 'Ask me about any emergency preparation'}
        </div>
      </div>
    </div>
  );
};

export default ChatBot; 