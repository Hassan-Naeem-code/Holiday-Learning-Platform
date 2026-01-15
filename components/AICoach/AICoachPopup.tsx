'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useAICoachStore } from '@/stores/aiCoachStore';
import { X, Send, Sparkles, User, Loader2, RefreshCw } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useUserStore } from '@/stores/userStore';
import { usePathname } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

export default function AICoachPopup() {
  const { isOpen, closeCoach } = useAICoachStore();
  const { user } = useUserStore();
  const pathname = usePathname();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([]);
  const [inputValue, setInputValue] = useState('');
  const [lastFailedMessage, setLastFailedMessage] = useState<{ role: string; content: string } | null>(null);

  const getCurrentModule = () => {
    if (pathname.includes('/tutorial/')) return 'Tutorial';
    if (pathname.includes('/game/')) return 'Game';
    if (pathname.includes('/sandbox/')) return 'Sandbox';
    if (pathname.includes('/module/webDev')) return 'Web Development';
    if (pathname.includes('/module/softwareDev')) return 'Software Development';
    if (pathname.includes('/module/aiMachineLearning')) return 'AI & Machine Learning';
    if (pathname.includes('/module/dataScience')) return 'Data Science';
    if (pathname.includes('/module/mobileApp')) return 'Mobile App Development';
    if (pathname.includes('/module/graphicsDesign')) return 'Graphics Design';
    if (pathname.includes('/module/contentCreation')) return 'Content Creation';
    return 'Dashboard';
  };

  // TanStack Query mutation for sending AI messages
  const aiChatMutation = useMutation({
    mutationFn: async (userMessage: { role: string; content: string }) => {
      const response = await fetch('/api/ai-coach/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          username: 'Student',
          currentModule: getCurrentModule(),
          level: user.level,
        }),
      });

      if (!response.ok) {
        // Try to parse error JSON
        try {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to get AI response');
        } catch {
          throw new Error('Failed to get AI response. Please try again.');
        }
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response body');

      const decoder = new TextDecoder();
      let fullText = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n').filter(line => line.trim() !== '');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);

            if (data === '[DONE]') {
              break;
            }

            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content || '';
              if (content) {
                fullText += content;
              }
            } catch {
              console.warn('Failed to parse SSE data:', data);
            }
          }
        }
      }

      return fullText.trim();
    },
    onSuccess: (aiResponse) => {
      // Clear failed message on success
      setLastFailedMessage(null);

      // Add AI response to messages
      if (aiResponse) {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: aiResponse },
        ]);
      } else {
        // Fallback message if AI returns empty response
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: "I'm having trouble responding right now. Could you try rephrasing your question? 🤔"
          },
        ]);
      }
    },
    onError: (error, variables) => {
      console.error('Chat error:', error);
      // Save the failed message for retry
      setLastFailedMessage(variables);
      // Remove the user message that failed from the list
      setMessages((prev) => prev.slice(0, -1));
    },
  });

  // Auto-resize textarea as user types
  const autoResizeTextarea = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto'; // Reset height
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`; // Max 200px
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    autoResizeTextarea();
  }, [inputValue]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || aiChatMutation.isPending) return;

    const userMessage = { role: 'user', content: inputValue };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');

    // Reset textarea height after sending
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }, 0);

    // Trigger the mutation with TanStack Query
    aiChatMutation.mutate(userMessage);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Submit on Enter (without Shift)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(e);
    }
    // Allow Shift+Enter for new line
  };

  const isTyping = aiChatMutation.isPending;

  // Retry last failed message
  const handleRetry = () => {
    if (lastFailedMessage) {
      setMessages((prev) => [...prev, lastFailedMessage]);
      setLastFailedMessage(null);
      aiChatMutation.reset();
      aiChatMutation.mutate(lastFailedMessage);
    }
  };

  const getMessageText = (message: any): string => {
    if (typeof message === 'string') return message;
    if (message.content && message.content.trim()) return message.content;
    if (message.text && message.text.trim()) return message.text;
    return '';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-none z-50"
            onClick={closeCoach}
          />

          {/* Chat Popup */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="pointer-events-auto w-full max-w-[460px] h-[90vh] sm:h-[85vh] md:h-[82vh] max-h-[700px] bg-slate-900 text-white rounded-xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-purple-500/30"
            >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-purple-600 via-pink-500 to-purple-700 p-3 sm:p-4 md:p-5 text-white">
              {/* Animated background */}
              <motion.div
                className="absolute inset-0 opacity-20"
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
                style={{
                  backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                }}
              />

              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-3">
                  <motion.div
                    animate={{
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" />
                  </motion.div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold">AI Coach</h2>
                    <p className="text-xs text-purple-100 hidden sm:block">Your personal learning assistant</p>
                  </div>
                </div>

                <motion.button
                  onClick={closeCoach}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-700 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-slate-600">
              {aiChatMutation.isError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm bg-red-900/40 border border-red-500/40 px-4 py-3 rounded-xl"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <p className="text-red-300 font-medium mb-1">
                        {aiChatMutation.error instanceof Error
                          ? aiChatMutation.error.message
                          : 'Something went wrong. Please try again.'}
                      </p>
                      {lastFailedMessage && (
                        <p className="text-red-400/70 text-xs">
                          Your message: &quot;{lastFailedMessage.content.slice(0, 50)}...&quot;
                        </p>
                      )}
                    </div>
                    {lastFailedMessage && (
                      <button
                        onClick={handleRetry}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/30 hover:bg-red-500/50 text-red-200 rounded-lg text-xs font-medium transition-colors"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        Retry
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
              {messages.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center h-full text-center space-y-4"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    <Sparkles className="w-16 h-16 text-purple-500" />
                  </motion.div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-white">
                      Hi there! 👋
                    </h3>
                    <p className="text-sm text-slate-200 max-w-xs">
                      I&apos;m your AI Coach! Ask me anything about your learning journey.
                    </p>
                    <div className="pt-4 space-y-2">
                      <p className="text-xs text-slate-300 font-semibold">
                        Try asking:
                      </p>
                      <div className="space-y-1 text-xs text-left">
                        <div className="bg-slate-800 text-white p-2 rounded-lg border border-purple-700/40">
                          💡 &quot;Can you explain how APIs work?&quot;
                        </div>
                        <div className="bg-slate-800 text-white p-2 rounded-lg border border-purple-700/40">
                          🎯 &quot;I&apos;m stuck on this puzzle, give me a hint&quot;
                        </div>
                        <div className="bg-slate-800 text-white p-2 rounded-lg border border-purple-700/40">
                          🚀 &quot;What should I learn next?&quot;
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                messages.map((message: any, index: number) => {
                  const isUser = message.role === 'user';
                  return (
                    <motion.div
                      key={message.id || index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`flex gap-3 ${
                        isUser ? 'flex-row-reverse' : 'flex-row'
                      }`}
                    >
                      {/* Avatar */}
                      <div
                        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                          isUser
                            ? 'bg-blue-500'
                            : 'bg-gradient-to-br from-purple-500 to-pink-500'
                        }`}
                      >
                        {isUser ? (
                          <User className="w-5 h-5 text-white" />
                        ) : (
                          <Sparkles className="w-5 h-5 text-white" />
                        )}
                      </div>

                      {/* Message Bubble */}
                      <div
                        className={`flex-1 max-w-[80%] ${
                          isUser ? 'items-end' : 'items-start'
                        }`}
                      >
                        <div
                          className={`px-4 py-3 rounded-2xl ${
                            isUser
                              ? 'bg-blue-500 text-white rounded-tr-sm'
                              : 'bg-slate-800 text-white rounded-tl-sm border border-slate-700'
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap leading-relaxed">
                          {getMessageText(message)}
                          </p>
                        </div>
                        <p className="text-xs text-slate-400 mt-1 px-2">
                          {new Date(message.createdAt || Date.now()).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </motion.div>
                  );
                })
              )}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-slate-800 border border-slate-700 px-4 py-3 rounded-2xl rounded-tl-sm">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 bg-purple-500 rounded-full"
                          animate={{
                            y: [-3, 0, -3],
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: i * 0.15,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-slate-900 border-t border-slate-800">
              <form onSubmit={handleSend} className="flex gap-2 items-end">
                <textarea
                  ref={textareaRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything..."
                  rows={1}
                  className="flex-1 px-3 py-2 sm:px-4 sm:py-3 bg-slate-800 border border-slate-700 rounded-xl sm:rounded-2xl text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                  style={{ minHeight: '44px', maxHeight: '150px' }}
                  disabled={aiChatMutation.isPending}
                />
                <motion.button
                  type="submit"
                  disabled={aiChatMutation.isPending || !inputValue.trim()}
                  className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {aiChatMutation.isPending ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </motion.button>
              </form>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Powered by AI • Always learning with you 🚀
              </p>
            </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
