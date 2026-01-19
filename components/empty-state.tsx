"use client";

import { Lightbulb, Code, FileText, HelpCircle } from "lucide-react";

interface EmptyStateProps {
  onSuggestionClick: (text: string) => void;
}

const suggestions = [
  {
    icon: Lightbulb,
    title: "Brainstorm ideas",
    prompt: "Help me brainstorm creative ideas for a mobile app that helps people learn new skills",
  },
  {
    icon: Code,
    title: "Write code",
    prompt: "Write a Python function that finds all prime numbers up to n using the Sieve of Eratosthenes",
  },
  {
    icon: FileText,
    title: "Summarize text",
    prompt: "Can you explain the key differences between REST and GraphQL APIs?",
  },
  {
    icon: HelpCircle,
    title: "Get help",
    prompt: "What are some best practices for writing clean, maintainable code?",
  },
];

export function EmptyState({ onSuggestionClick }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="mb-8">
        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mx-auto mb-6">
          <SparklesIcon className="w-8 h-8 text-primary-foreground" />
        </div>
        <h1 className="text-2xl font-semibold text-center text-foreground mb-2">
          How can I help you today?
        </h1>
        <p className="text-muted-foreground text-center">
          Ask me anything or try one of the suggestions below.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSuggestionClick(suggestion.prompt)}
            className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card hover:bg-secondary/50 transition-colors text-left group"
          >
            <div className="p-2 rounded-lg bg-secondary group-hover:bg-secondary/80 transition-colors">
              <suggestion.icon className="w-4 h-4 text-muted-foreground" />
            </div>
            <div>
              <div className="font-medium text-sm text-foreground">
                {suggestion.title}
              </div>
              <div className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                {suggestion.prompt}
              </div>
            </div>
          </button>
        ))}
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
