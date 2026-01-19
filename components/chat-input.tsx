"use client";

import React from "react"

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUp, Square } from "lucide-react";
import { useRef, useEffect } from "react";

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  onStop: () => void;
}

export function ChatInput({
  input,
  setInput,
  onSubmit,
  isLoading,
  onStop,
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        200
      )}px`;
    }
  }, [input]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit(e);
    }
  };

  return (
    <form onSubmit={onSubmit} className="relative">
      <div className="relative flex items-end rounded-2xl border border-border bg-secondary/50 focus-within:ring-2 focus-within:ring-ring focus-within:border-transparent transition-all">
        <Textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message ChatGPT"
          className="min-h-[52px] max-h-[200px] resize-none border-0 bg-transparent pr-14 py-4 px-4 focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground placeholder:text-muted-foreground"
          rows={1}
        />
        <div className="absolute right-2 bottom-2">
          {isLoading ? (
            <Button
              type="button"
              size="icon"
              variant="default"
              onClick={onStop}
              className="h-8 w-8 rounded-lg"
            >
              <Square className="h-3 w-3 fill-current" />
              <span className="sr-only">Stop generating</span>
            </Button>
          ) : (
            <Button
              type="submit"
              size="icon"
              variant="default"
              disabled={!input.trim()}
              className="h-8 w-8 rounded-lg disabled:opacity-30"
            >
              <ArrowUp className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          )}
        </div>
      </div>
    </form>
  );
}
