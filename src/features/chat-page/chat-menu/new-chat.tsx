"use client";

import { Button } from "@/features/ui/button";
import { LoadingIndicator } from "@/features/ui/loading";
import { Plus } from "lucide-react";
import { useFormStatus } from "react-dom";
import { ModelSelect } from "../model-select";

export const NewChat = ({
  models,
  defaultModel,
}: {
  models: Record<string, string>;
  defaultModel?: string;
}) => {
  const { pending } = useFormStatus();

  return (
    <>
      <ModelSelect models={models} defaultValue={defaultModel} />
      <Button
        aria-disabled={pending}
        size={"default"}
        className="flex gap-2"
        variant={"outline"}
      >
        {pending ? <LoadingIndicator isLoading={pending} /> : <Plus size={18} />}
        Ny Samtale
      </Button>
    </>
  );
};

