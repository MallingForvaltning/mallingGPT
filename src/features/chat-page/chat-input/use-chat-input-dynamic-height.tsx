import { proxy, snapshot, useSnapshot } from "valtio";

const MAX_ROWS = 6;

interface ChatInputStoreProps {
  rows: number;
  keysPressed: Set<string>;
}

const state = proxy<ChatInputStoreProps>({
  rows: 1,
  keysPressed: new Set(),
});


export const SetInputRowsToMax = () => {
  state.rows = MAX_ROWS;
};

export const ResetInputRows = () => {
  state.rows = 1;
};

export const UpdateRowsFromTextArea = (
  textarea: HTMLTextAreaElement | null
) => {
  if (!textarea) return;
  const lineHeight = parseFloat(getComputedStyle(textarea).lineHeight);
  if (!lineHeight) return;
  const rows = Math.ceil(textarea.scrollHeight / lineHeight);
  state.rows = Math.min(rows, MAX_ROWS);
};

export const onKeyDown = (
  event: React.KeyboardEvent<HTMLTextAreaElement>,
  submit: () => void
) => {
  state.keysPressed.add(event.key);
  const snap = snapshot(state);
  if (
    !event.nativeEvent.isComposing &&
    snap.keysPressed.has("Enter") &&
    !snap.keysPressed.has("Shift")
  ) {
    submit();
    ResetInputRows();
    event.preventDefault();
  }
};

export const onKeyUp = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
  state.keysPressed.delete(event.key);
};

export const useChatInputDynamicHeight = () => {
  return useSnapshot(state);
};
