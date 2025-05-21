import { CreateChatAndRedirect } from "../chat-services/chat-thread-service";
import { ChatContextMenu } from "./chat-context-menu";
import { NewChat } from "./new-chat";
import { getModelDeployments } from "@/features/common/services/model-deployments";

export const ChatMenuHeader = () => {
  const models = getModelDeployments();
  return (
    <div className="flex p-2 px-3 justify-end">
      <form action={CreateChatAndRedirect} className="flex gap-2 pr-3">
        <NewChat models={models} defaultModel={process.env.AZURE_OPENAI_API_DEPLOYMENT_NAME} />
        <ChatContextMenu />
      </form>
    </div>
  );
};

