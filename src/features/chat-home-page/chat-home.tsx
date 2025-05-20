import { AddExtension } from "@/features/extensions-page/add-extension/add-new-extension";
import { ExtensionModel } from "@/features/extensions-page/extension-services/models";
import { PersonaModel } from "@/features/persona-page/persona-services/models";
import { AI_DESCRIPTION, AI_NAME } from "@/features/theme/theme-config";
import { Hero } from "@/features/ui/hero";
import { ScrollArea } from "@/features/ui/scroll-area";
import { TypewriterText } from "@/features/ui/typewriter-text";
import { Button } from "@/features/ui/button";
import { CreateChatAndRedirect } from "@/features/chat-page/chat-services/chat-thread-service";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { MessageCircle, VenetianMask } from "lucide-react";

interface ChatPersonaProps {
  personas: PersonaModel[];
  extensions: ExtensionModel[];
}

export const ChatHome: FC<ChatPersonaProps> = (props) => {
  return (
    <ScrollArea className="flex-1">
      <main className="flex flex-1 flex-col gap-6 pb-6">
        <Hero
          title={
            <>
              <Image
                src={"/ai-icon.png"}
                width={60}
                height={60}
                quality={100}
                alt="ai-icon"
              />{" "}
              {AI_NAME}
            </>
          }
          description={<TypewriterText text={AI_DESCRIPTION} />}
        >
          <form action={CreateChatAndRedirect} className="w-full">
            <Button
              className="bg-mallingBurgund-800 hover:bg-mallingBurgund-700 text-white text-lg px-6 py-4 w-full flex gap-2 justify-center"
            >
              <MessageCircle size={20} /> Ny samtale
            </Button>
          </form>
          <Link href="/persona" className="w-full">
            <Button
              variant="outline"
              className="w-full flex gap-2 justify-center text-mallingBurgund-800 border-mallingBurgund-800"
            >
              <VenetianMask size={20} /> Personligheter
            </Button>
          </Link>
        </Hero>

        <AddExtension />
      </main>
    </ScrollArea>
  );
};
