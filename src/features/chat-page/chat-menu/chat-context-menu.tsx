"use client";
import { RedirectToPage } from "@/features/common/navigation-helpers";
import { showError } from "@/features/globals/global-message-store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/features/ui/dropdown-menu";
import { LoadingIndicator } from "@/features/ui/loading";
import { MoreVertical, Trash } from "lucide-react";
import { useState } from "react";
import { DropdownMenuItemWithIcon } from "./chat-menu-item";
import { DeleteAllChatThreads } from "./chat-menu-service";

export const ChatContextMenu = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAction = async () => {
    if (
      window.confirm("Er du sikker på at du vil slette alle samtaler?")
    ) {
      setIsLoading(true);
      const response = await DeleteAllChatThreads();

      if (response.status === "OK") {
        setIsLoading(false);
        RedirectToPage("chat");
      } else {
        showError(response.errors.map((e) => e.message).join(", "));
      }
    }
  };

  const shouldShowMenu = false; // Endre til false hvis du vil skjule menyen

return shouldShowMenu ? (
  <DropdownMenu>
    <DropdownMenuTrigger disabled={isLoading}>
      {isLoading ? (
        <LoadingIndicator isLoading={isLoading} />
      ) : (
        <MoreVertical size={18} aria-label="Chat Menu Dropdown Menu"/>
      )}
    </DropdownMenuTrigger>
    <DropdownMenuContent side="right" align="start">
      <DropdownMenuItemWithIcon onClick={async () => await handleAction()}>
        <Trash size={18} />
        <span>Slett alle</span>
      </DropdownMenuItemWithIcon>
    </DropdownMenuContent>
  </DropdownMenu>
) : null;

  
  
};