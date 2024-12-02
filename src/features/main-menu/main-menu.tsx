import { MenuTrayToggle } from "@/features/main-menu/menu-tray-toggle";
import {
  Menu,
  MenuBar,
  MenuItem,
  MenuItemContainer,
  menuIconProps,
} from "@/ui/menu";
import {
  Book,
  Home,
  MessageCircle,
  PocketKnife,
  Sheet,
  VenetianMask,
} from "lucide-react";
import { getCurrentUser } from "../auth-page/helpers";
import { MenuLink } from "./menu-link";
import { UserProfile } from "./user-profile";

export const MainMenu = async () => {
  const user = await getCurrentUser();

  return (
    <Menu>
      <MenuBar>
        <MenuItemContainer>
          <MenuItem tooltip="Hjem" asChild>
            <MenuLink href="/chat" ariaLabel="Gå til hjem">
              <Home {...menuIconProps} />
            </MenuLink>
          </MenuItem>
          <MenuTrayToggle />
          <MenuItem tooltip="Chat">
            <MenuLink href="/chat" ariaLabel="Gå til samtaler">
              <MessageCircle {...menuIconProps} />
            </MenuLink>
          </MenuItem>
          <MenuItem tooltip="personlighet">
            <MenuLink href="/persona" ariaLabel="Gå til personligheter">
              <VenetianMask {...menuIconProps} />
            </MenuLink>
          </MenuItem>
        </MenuItemContainer>

        {/* Admin-specific items */}
        {user.isAdmin && (
          <MenuItemContainer>
            <MenuItem tooltip="utvidelser">
              <MenuLink href="/extensions" ariaLabel="Gå til utvidelser">
                <PocketKnife {...menuIconProps} />
              </MenuLink>
            </MenuItem>
            <MenuItem tooltip="prompts">
              <MenuLink href="/prompt" ariaLabel="Gå til prompt-oversikt">
                <Book {...menuIconProps} />
              </MenuLink>
            </MenuItem>
            <MenuItem tooltip="reporting">
              <MenuLink href="/reporting" ariaLabel="Gå til rapportering">
                <Sheet {...menuIconProps} />
              </MenuLink>
            </MenuItem>
          </MenuItemContainer>
        )}

        {/* Profile/User at the bottom */}
        <MenuItemContainer>
          <MenuItem tooltip="Profil">
            <UserProfile />
          </MenuItem>
        </MenuItemContainer>
      </MenuBar>
    </Menu>
  );
};
