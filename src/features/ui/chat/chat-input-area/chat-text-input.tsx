import React from "react";

export const ChatTextInput = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ ...props }, ref) => {
  const handlePaste = (event: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const clipboardItems = event.clipboardData.items;
    for (let i = 0; i < clipboardItems.length; i++) {
      const item = clipboardItems[i];
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
        event.preventDefault(); // Forhindre standard tekst-lim-inn-oppførsel
      }
    }
  };

  return (
    <textarea
      ref={ref}
      className="p-4 w-full focus:outline-none bg-transparent resize-none"
      placeholder="Skriv ny melding her..."
      onPaste={handlePaste} // Koble paste-handleren her
      {...props}
    />
  );
});
ChatTextInput.displayName = "ChatTextInput";

