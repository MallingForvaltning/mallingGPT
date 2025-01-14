import React from "react";

export const ChatTextInput = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ onPaste, ...props }, ref) => {
  const handlePaste = (event: React.ClipboardEvent<HTMLTextAreaElement>) => {
    if (onPaste) {
      onPaste(event); // Kall eventuelle prop-handler først
    }

    const clipboardItems = event.clipboardData.items;
    for (let i = 0; i < clipboardItems.length; i++) {
      const item = clipboardItems[i];
      if (item.type.startsWith("image/")) {
        const file = item.getAsFile();
        if (file) {
          const reader = new FileReader();
          reader.onload = () => {
            const base64 = reader.result as string;
            console.log("Bilde limt inn i base64-format:", base64);
            // Her kan du legge til logikk for å oppdatere state eller sende base64-bildet videre.
          };
          reader.readAsDataURL(file);
        }
        event.preventDefault(); // Forhindre at bildet også vises som tekst
      }
    }
  };

  return (
    <textarea
      ref={ref}
      className="p-4 w-full focus:outline-none bg-transparent resize-none"
      placeholder="Skriv ny melding her..."
      onPaste={handlePaste}
      {...props}
    />
  );
});
ChatTextInput.displayName = "ChatTextInput";
