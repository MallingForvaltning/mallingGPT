"use client";
import { ExtensionModel } from "@/features/extensions-page/extension-services/models";
import { CHAT_DEFAULT_PERSONA } from "@/features/theme/theme-config";
import { VenetianMask } from "lucide-react";
import { FC } from "react";
import { useSession } from "next-auth/react";
import { ChatDocumentModel, ChatThreadModel } from "../chat-services/models";
import { DocumentDetail } from "./document-detail";
import { ExtensionDetail } from "./extension-detail";
import { PersonaDetail } from "./persona-detail";
import { UpdateChatDeploymentAction } from "../chat-services/chat-thread-service";
import { chatStore } from "../chat-store";

interface Props {
  chatThread: ChatThreadModel;
  chatDocuments: Array<ChatDocumentModel>;
  extensions: Array<ExtensionModel>;
  showModelSelect?: boolean;
  modelMapping?: Record<string, string>;
}

export const ChatHeader: FC<Props> = ({
  chatThread,
  chatDocuments,
  extensions,
  showModelSelect,
  modelMapping,
}) => {
  const { status } = useSession();

  const persona =
    !chatThread.personaMessageTitle
      ? CHAT_DEFAULT_PERSONA
      : chatThread.personaMessageTitle;

  if (status === "loading") {
    return (
      <div className="bg-background border-b flex items-center py-2">
        <div className="container max-w-3xl flex justify-between items-center">
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background border-b flex items-center py-2">
      <div className="container max-w-3xl flex justify-between items-center">
        <div className="flex flex-col">
          <span>{chatThread.name}</span>
          <span className="text-sm text-muted-foreground flex gap-1 items-center">
            <VenetianMask size={18} />
            {persona}
          </span>
        </div>
        <div className="flex gap-2">
          <PersonaDetail chatThread={chatThread} />
          <DocumentDetail chatDocuments={chatDocuments} />
          <ExtensionDetail
            disabled={chatDocuments.length !== 0}
            extensions={extensions}
            installedExtensionIds={chatThread.extension}
            chatThreadId={chatThread.id}
          />
          {showModelSelect && modelMapping && (
            <form action={UpdateChatDeploymentAction} className="flex gap-2">
              <input
                type="hidden"
                name="chatThreadId"
                value={chatThread.id}
              />
              <select
                name="deploymentName"
                defaultValue={chatThread.deploymentName}
                className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                onChange={(e) => {
                  chatStore.updateDeploymentName(e.currentTarget.value);
                  e.currentTarget.form?.requestSubmit();
                }}
                aria-label="Velg modell"
              >
                {Object.entries(modelMapping).map(([model, deployment]) => (
                  <option key={model} value={deployment}>
                    {model}
                  </option>
                ))}
              </select>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};