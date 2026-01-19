"use client";

import { UIMessage } from "ai";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import { User } from "lucide-react";

interface ChatMessageProps {
  message: UIMessage;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  // Extract text content from message parts
  const textContent = message.parts
    ?.filter((part): part is { type: "text"; text: string } => part.type === "text")
    .map((part) => part.text)
    .join("") || "";

  return (
    <div className="flex gap-4">
      <div
        className={cn(
          "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
          isUser ? "bg-secondary" : "bg-primary"
        )}
      >
        {isUser ? (
          <User className="w-4 h-4 text-secondary-foreground" />
        ) : (
          <SparklesIcon className="w-4 h-4 text-primary-foreground" />
        )}
      </div>
      <div className="flex-1 pt-1 overflow-hidden">
        <div className="font-semibold text-sm mb-1 text-foreground">
          {isUser ? "You" : "ChatGPT"}
        </div>
        <div className="prose prose-invert prose-sm max-w-none text-foreground">
          {isUser ? (
            <p className="whitespace-pre-wrap">{textContent}</p>
          ) : (
            <ReactMarkdown
              components={{
                pre: ({ children }) => (
                  <pre className="bg-secondary rounded-lg p-4 overflow-x-auto my-4">
                    {children}
                  </pre>
                ),
                code: ({ className, children, ...props }) => {
                  const isInline = !className;
                  return isInline ? (
                    <code
                      className="bg-secondary px-1.5 py-0.5 rounded text-sm"
                      {...props}
                    >
                      {children}
                    </code>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
                p: ({ children }) => (
                  <p className="mb-4 last:mb-0 leading-relaxed">{children}</p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc pl-6 mb-4 space-y-2">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal pl-6 mb-4 space-y-2">{children}</ol>
                ),
                li: ({ children }) => (
                  <li className="leading-relaxed">{children}</li>
                ),
                h1: ({ children }) => (
                  <h1 className="text-xl font-bold mb-4 mt-6 first:mt-0">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-lg font-bold mb-3 mt-5 first:mt-0">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-base font-bold mb-2 mt-4 first:mt-0">
                    {children}
                  </h3>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-border pl-4 italic my-4 text-muted-foreground">
                    {children}
                  </blockquote>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline hover:no-underline"
                  >
                    {children}
                  </a>
                ),
              }}
            >
              {textContent}
            </ReactMarkdown>
          )}
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
