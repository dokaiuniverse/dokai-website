// src/stores/modalStackStore.ts
import { ProjectContent } from "@domain/careers";
import { MediaSource, MediaType } from "@domain/media";
import { create } from "zustand";

export type ModalMap = {
  API: {
    title: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onFetch: () => void | Promise<any>;
    loadingText?: string;
    doneText?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess?: (data: any) => void | Promise<void>;
    onConfirm?: () => void | Promise<void>;
  };

  CONFIRM: {
    title: string;
    content: string;
    onConfirm?: () => void | Promise<void>;
  };

  DRAWER_MENU: {
    closeMenuRef: React.RefObject<(() => void) | null>;
    closeSearchRef: React.RefObject<(() => void) | null>;
  };

  SEARCH: {
    closeSearchRef: React.RefObject<(() => void) | null>;
  };

  PROJECT: {
    ownerEmail: string;
  };

  EDIT_MEDIA_LIST: {
    initial?: MediaSource[];
    applyMedias?: (medias: MediaSource[]) => void;
    blockedTypes?: MediaType[];
  };

  EDIT_MEDIA_SINGLE: {
    initial?: MediaSource | null;
    applyMedia?: (media: MediaSource | null) => void;
    blockedTypes?: MediaType[];
  };

  EDIT_PROJECT_CONTENT: {
    initial?: ProjectContent;
    applyContent?: (content: ProjectContent) => void;
  };
};

export type ModalState = {
  [K in keyof ModalMap]: { id: string; type: K; props: ModalMap[K] };
}[keyof ModalMap];

type Store = {
  stack: ModalState[];
  push: <K extends keyof ModalMap>(type: K, props: ModalMap[K]) => void;
  pop: () => void;
  replaceTop: <K extends keyof ModalMap>(type: K, props: ModalMap[K]) => void;
  clear: () => void;
};

const uid = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

export const useModalStackStore = create<Store>((set) => ({
  stack: [],
  push: (type, props) =>
    set((s) => ({
      stack: [...s.stack, { id: uid(), type, props } as ModalState],
    })),
  pop: () => set((s) => ({ stack: s.stack.slice(0, -1) })),
  replaceTop: (type, props) =>
    set((s) => ({
      stack: [
        ...s.stack.slice(0, -1),
        { id: uid(), type, props } as ModalState,
      ],
    })),
  clear: () => set({ stack: [] }),
}));
