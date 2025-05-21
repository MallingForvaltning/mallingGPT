"use client";
import { ChatInput } from "@/features/chat-page/chat-input/chat-input";
import { chatStore, useChat } from "@/features/chat-page/chat-store";
import { ChatLoading } from "@/features/ui/chat/chat-message-area/chat-loading";
import { ChatMessageArea } from "@/features/ui/chat/chat-message-area/chat-message-area";
import ChatMessageContainer from "@/features/ui/chat/chat-message-area/chat-message-container";
import ChatMessageContentArea from "@/features/ui/chat/chat-message-area/chat-message-content";
import { useChatScrollAnchor } from "@/features/ui/chat/chat-message-area/use-chat-scroll-anchor";
import { useSession } from "next-auth/react";
import { FC, useEffect, useRef } from "react";
import { ExtensionModel } from "../extensions-page/extension-services/models";
import { ChatHeader } from "./chat-header/chat-header";
import {
  ChatDocumentModel,
  ChatMessageModel,
  ChatThreadModel,
} from "./chat-services/models";
import MessageContent from "./message-content";

interface ChatPageProps {
  messages: Array<ChatMessageModel>;
  chatThread: ChatThreadModel;
  chatDocuments: Array<ChatDocumentModel>;
  extensions: Array<ExtensionModel>;
  modelMapping: Record<string, string>;
}

export const ChatPage: FC<ChatPageProps> = ({
  messages: initialMessages,
  chatThread,
  chatDocuments,
  extensions,
  modelMapping,
}) => {
  const { data: session } = useSession();

  // Show model selector whenever a mapping object is provided
  const showModelSelect = Object.keys(modelMapping).length > 0;

  useEffect(() => {
    chatStore.initChatSession({
      chatThread,
      messages: initialMessages,
      userName: session?.user?.name!,
    });
  }, [initialMessages, session?.user?.name, chatThread]);

  const { messages, loading } = useChat();
  const scrollAnchor = useRef<HTMLDivElement>(null);
  useChatScrollAnchor({ ref: scrollAnchor });

  return (
    <main className="flex flex-1 relative flex-col">
      <ChatHeader
        chatThread={chatThread}
        chatDocuments={chatDocuments}
        extensions={extensions}
        showModelSelect={showModelSelect}
        modelMapping={modelMapping}
      />

      <ChatMessageContainer ref={scrollAnchor}>
        <ChatMessageContentArea>
          {messages.map((msg) => (
            <ChatMessageArea
              key={msg.id}
              profileName={msg.name}
              role={msg.role}
              onCopy={() => navigator.clipboard.writeText(msg.content)}
              profilePicture={
                msg.role === "assistant" ? "/ai-icon.png" : session?.user?.image
              }
            >
              <MessageContent message={msg} />
            </ChatMessageArea>
          ))}
          {loading === "loading" && <ChatLoading />}
        </ChatMessageContentArea>
      </ChatMessageContainer>

      <ChatInput />
    </main>
  );
};
