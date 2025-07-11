import React from "react";
import { InputImageStore } from "./input-image-store"; // Legg til denne importen

export const ChatTextInput = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ ...props }, ref) => {
  const handlePaste = (event: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const clipboardItems = event.clipboardData.items;
    for (const item of clipboardItems) {
      if (item.type.startsWith("image/")) {
        const file = item.getAsFile();
        if (file) {
          const reader = new FileReader();
          reader.onload = () => {
            const base64 = reader.result as string;
            console.log("Base64 generert:", base64); // Bekreft at bildet er konvertert
            InputImageStore.UpdateBase64Image(base64); // Oppdater state for bildet
          };
          reader.readAsDataURL(file);
        }
        event.preventDefault(); // Forhindre standard lim-inn oppførsel
      }
    }
  };

  return (
    <textarea
      ref={ref}
      className="p-4 w-full focus:outline-none bg-transparent resize-none overflow-y-auto"
      placeholder="Skriv ny melding her..."
      onPaste={handlePaste}
      {...props}
    />
  );
});
ChatTextInput.displayName = "ChatTextInput";
