import {
  consumeStream,
  convertToModelMessages,
  streamText,
  UIMessage,
} from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const prompt = convertToModelMessages(messages);

  const result = streamText({
    model: "openai/gpt-4o",
    system:
      "You are a helpful, harmless, and honest AI assistant. You provide clear, accurate, and thoughtful responses. Format your responses using markdown when appropriate.",
    prompt,
    abortSignal: req.signal,
  });

  return result.toUIMessageStreamResponse({
    onFinish: async ({ isAborted }) => {
      if (isAborted) {
        console.log("Aborted");
      }
    },
    consumeSseStream: consumeStream,
  });
}
