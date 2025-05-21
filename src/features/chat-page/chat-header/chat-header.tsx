"use client";
import { ExtensionModel } from "@/features/extensions-page/extension-services/models";
import { CHAT_DEFAULT_PERSONA } from "@/features/theme/theme-config";
import { VenetianMask } from "lucide-react";
import { FC } from "react";
import { useSession } from "next-auth/react"; // Importer useSession
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

export const ChatHeader: FC<Props> = (props) => {
  const { status } = useSession(); // Vi trenger ikke data eller isAdmin her

  const persona =
    props.chatThread.personaMessageTitle === "" ||
    props.chatThread.personaMessageTitle === undefined
      ? CHAT_DEFAULT_PERSONA
      : props.chatThread.personaMessageTitle;

  // Sjekk hvis sesjonen er fortsatt lastes inn
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
          <span>{props.chatThread.name}</span>
          <span className="text-sm text-muted-foreground flex gap-1 items-center">
            <VenetianMask size={18} />
            {persona}
          </span>
        </div>
        <div className="flex gap-2">
          <PersonaDetail chatThread={props.chatThread} />
          <DocumentDetail chatDocuments={props.chatDocuments} />
          {/* Fjern admin-sjekken slik at ExtensionDetail vises for alle */}
          <ExtensionDetail
            disabled={props.chatDocuments.length !== 0}
            extensions={props.extensions}
            installedExtensionIds={props.chatThread.extension}
            chatThreadId={props.chatThread.id}
          />
          {props.showModelSelect && props.modelMapping && (
            <form action={UpdateChatDeploymentAction} className="flex gap-2">
              <input type="hidden" name="chatThreadId" value={props.chatThread.id} />
              <select
                name="deploymentName"
                defaultValue={props.chatThread.deploymentName}
                className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                onChange={(e) => chatStore.updateDeploymentName(e.currentTarget.value)}
                aria-label="Velg modell"
              >
                {Object.entries(props.modelMapping).map(([model, deployment]) => (
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
