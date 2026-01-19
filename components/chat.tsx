"use client";

import React from "react"

// import { useChat, DefaultChatTransport } from "@ai-sdk/react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from 'ai';
import { useState, useRef, useEffect } from "react";
import { ChatMessage } from "./chat-message";
import { ChatInput } from "./chat-input";
import { EmptyState } from "./empty-state";

export function Chat() {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status, stop } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });

  const isLoading = status === "streaming" || status === "submitted";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage({ role: "user", content: input });
    setInput("");
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 py-8">
          {messages.length === 0 ? (
            <EmptyState onSuggestionClick={(text) => setInput(text)} />
          ) : (
            <div className="flex flex-col gap-6">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {isLoading &&
                messages[messages.length - 1]?.role === "user" && (
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                      <SparklesIcon className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div className="flex-1 pt-1">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:-0.3s]" />
                        <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:-0.15s]" />
                        <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" />
                      </div>
                    </div>
                  </div>
                )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Input area */}
      <div className="border-t border-border bg-background">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <ChatInput
            input={input}
            setInput={setInput}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            onStop={stop}
          />
          <p className="text-center text-xs text-muted-foreground mt-3">
            ChatGPT can make mistakes. Check important info.
          </p>
        </div>
      </div>
    </div>
  );
}

function SparklesIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.48.48 0 01.458.33l.37 1.196a2.24 2.24 0 001.399 1.4l1.195.37a.48.48 0 010 .908l-1.195.37a2.24 2.24 0 00-1.4 1.4l-.37 1.195a.48.48 0 01-.907 0l-.37-1.196a2.24 2.24 0 00-1.399-1.399l-1.196-.37a.48.48 0 010-.908l1.196-.37a2.24 2.24 0 001.4-1.4l.369-1.195A.48.48 0 0118 1.5zM16.5 15a.48.48 0 01.458.33l.37 1.196a2.24 2.24 0 001.399 1.4l1.195.37a.48.48 0 010 .907l-1.195.37a2.24 2.24 0 00-1.4 1.4l-.37 1.196a.48.48 0 01-.907 0l-.37-1.196a2.24 2.24 0 00-1.399-1.4l-1.196-.37a.48.48 0 010-.907l1.196-.37a2.24 2.24 0 001.4-1.4l.369-1.196A.48.48 0 0116.5 15z"
        clipRule="evenodd"
      />
    </svg>
  );
}
