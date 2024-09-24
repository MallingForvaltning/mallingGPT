import { HeroButton } from "@/features/ui/hero";
import { PocketKnife } from "lucide-react";
import { extensionStore } from "../extension-store";

export const NewExtension = () => {
  return (
    <HeroButton
      title="Ny utvidelse"
      description="Lag en ny utvidelse med nytt API"
      icon={<PocketKnife />}
      onClick={() => extensionStore.newAndOpenSlider()}
    />
  );
};
