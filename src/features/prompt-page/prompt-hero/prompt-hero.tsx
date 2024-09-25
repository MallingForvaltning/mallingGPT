"use client";
import { Hero, HeroButton } from "@/features/ui/hero";
import { Book, BookImage, NotebookPen } from "lucide-react";
import { promptStore } from "../prompt-store";

export const PromptHero = () => {
  return (
    <Hero
      title={
        <>
          <Book size={36} strokeWidth={1.5} /> Promptbibliotek
        </>
      }
      description={
        "Med prompt-maler kan du lage og lagre tilpassede meldinger for å få bedre og raskere resultater med AI"
      }
    >
      <HeroButton
        title="Lag ny prompt"
        description="Bygg dine egne prompts"
        icon={<Book />}
        onClick={() => promptStore.newPrompt()}
      />
      <HeroButton
        title="Miniatyrbyen"
        description="Bilde av fremtidens eiendom"
        icon={<BookImage />}
        onClick={() =>
          promptStore.updatePrompt({
            createdAt: new Date(),
            id: "",
            name: "Miniatyrbyen",
            description:
              "Skap en miniatyrby med fargerike bygninger og grønne trær med [ikonisk bygning]. Den [ikoniske bygningen] står i midten av bildet, omgitt av en uklar bakgrunn med mange [innfødt tresort] trær. Bildet har en drømmende og eventyrlig stemning, med lav dybdeskarphet og et perspektiv sett fra høy vinkel. Byen ser ut som et leketøy eller en modell, med ulike stiler og former på bygningene.",
            isPublished: false,
            type: "PROMPT",
            userId: "",
          })
        }
      />
      <HeroButton
        title="Problemformulering"
        description="Problemformulering for et nytt produkt"
        icon={<NotebookPen />}
        onClick={() =>
          promptStore.updatePrompt({
            createdAt: new Date(),
            id: "",
            name: "Problemformulering",
            description: `
Gitt følgende problemstilling:
[PROBLEMSTILLING]

Generer en respons med følgende punkter:

Problemformulering
Løsningsoversikt og anbefalinger
Anbefalt omfang for MVP (Minimum Viable Product)
Hvordan sikre brukeradopsjon
Hvordan måle suksess
Liste over lignende produkter
Potensielle spørsmål til sponsor (5 spørsmål) 
              `,
            isPublished: false,
            type: "PROMPT",
            userId: "",
          })
        }
      />
    </Hero>
  );
};
