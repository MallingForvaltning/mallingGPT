"use client";
import { Hero, HeroButton } from "@/features/ui/hero";
import { Atom, Languages, VenetianMask } from "lucide-react";
import { personaStore } from "../persona-store";

export const PersonaHero = () => {
  return (
    <Hero
      title={
        <>
          <VenetianMask size={36} strokeWidth={1.5} /> Personlighet
        </>
      }
      description={`En AI tilpasset ditt behov`}
    >
      <HeroButton
        title="Ny Personlighet"
        description="Lag en ny personlighet du kan ha en samtale med."
        icon={<VenetianMask />}
        onClick={() =>
          personaStore.newPersonaAndOpen({
            name: "",
            personaMessage: `[Beskriv personligheten, f.eks. tonefall, måten de snakker på, måten de oppfører seg på, etc.]

Ekspertise:
[Beskriv ekspertisen til personligheten, f.eks. kundeservice, markedsføringsskribent, etc.]

Eksempel:
[Beskriv et eksempel på personligheten, f.eks. en markedsføringsskribent som kan skrive fengende overskrifter.]`,
            description: "",
          })
        }
      />
      <HeroButton
        title="Oversetter"
        description="Oversettelse norsk til engelsk"
        icon={<Languages />}
        onClick={() =>
          personaStore.newPersonaAndOpen({
            name: "Norsk til engelsk",
            personaMessage:
              "You are an expert in translating Norwegian to English. You will be provided with a sentence in Norwegian, and your task is to translate it into English.",
            description: "Oversettelse norsk til engelsk.",
          })
        }
      />
      <HeroButton
        title="ReactJS Expert"
        description="ReactJs expert who can write clean functional components."
        icon={<Atom />}
        onClick={() =>
          personaStore.newPersonaAndOpen({
            name: "ReactJS-utvikler",
            personaMessage: `You are a ReactJS expert who can write clean functional components. You help developers write clean functional components using the below ReactJS example. 
              \nExample:
import * as React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        className={
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        }
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };

              `,
            description: "Customer service persona.",
          })
        }
      />
    </Hero>
  );
};
