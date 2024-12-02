"use client";

import { Button } from "@/features/ui/button";
import { Pencil } from "lucide-react";
import { FC } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { ExtensionModel } from "../extension-services/models";
import { extensionStore } from "../extension-store";
import { ExtensionCardContextMenu } from "./extension-context-menu";
import { StartNewExtensionChat } from "./start-new-extension-chat";
import { useSession } from "next-auth/react";

interface Props {
  extension: ExtensionModel;
  showContextMenu: boolean;
}

export const ExtensionCard: FC<Props> = (props) => {
  const { extension } = props;
  const { data } = useSession();
  const isAdmin = data?.user?.isAdmin;

  return (
    <Card key={extension.id} className="flex flex-col">
      <CardHeader className="flex flex-row">
        <CardTitle className="flex-1">{extension.name}</CardTitle>
        {props.showContextMenu && isAdmin && (
          <div>
            <ExtensionCardContextMenu extension={extension} />
          </div>
        )}
      </CardHeader>
      <CardContent className="text-muted-foreground flex-1">
        {extension.description}
      </CardContent>
      <CardFooter className="gap-1 content-stretch">
        {props.showContextMenu && isAdmin && (
          <Button
            variant="outline"
            title="Edit extension"
            onClick={() => extensionStore.openAndUpdate(props.extension)}
          >
            <Pencil size={18} />
          </Button>
        )}
        <StartNewExtensionChat extension={extension} />
      </CardFooter>
    </Card>
  );
};
