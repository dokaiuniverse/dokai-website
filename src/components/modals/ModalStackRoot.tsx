// src/components/modals/ModalStackRoot.tsx
"use client";

import dynamic from "next/dynamic";
import { useModalStackStore } from "@stores/modalStackStore";
const ApiModal = dynamic(() => import("./Api/ApiModal"), { ssr: false });
const ConfirmModal = dynamic(() => import("./Confirm/ConfirmModal"), {
  ssr: false,
});
import DrawerMenuModal from "./DrawerMenu/DrawerMenuModal";
import SearchModal from "./Search/SearchModal";
import ProjectModal from "./Project/ProjectModal";
import EditMediaListModal from "./Edit/EditMedia/EditMediaListModal";
import EditProjectContentModal from "./Edit/EditProjectContent/EditProjectContentModal";
import EditMediaSingleModal from "./Edit/EditMedia/EditMediaSingleModal";

const ModalStackRoot = () => {
  const stack = useModalStackStore((s) => s.stack);
  const pop = useModalStackStore((s) => s.pop);

  if (stack.length === 0) return null;

  return (
    <>
      {stack.map((m, idx) => {
        const isTop = idx === stack.length - 1;

        const common = {
          // top만 닫히게: 아래 모달들은 클릭/esc 반응 안 하게 할 때 사용
          isTop,
          onClose: isTop ? pop : () => {},
          zIndex: 9999 + idx,
        };

        switch (m.type) {
          case "API":
            return <ApiModal key={m.id} {...m.props} {...common} />;
          case "CONFIRM":
            return <ConfirmModal key={m.id} {...m.props} {...common} />;
          case "DRAWER_MENU":
            return <DrawerMenuModal key={m.id} {...common} {...m.props} />;
          case "SEARCH":
            return <SearchModal key={m.id} {...common} {...m.props} />;
          case "PROJECT":
            return <ProjectModal key={m.id} {...common} {...m.props} />;
          case "EDIT_MEDIA_LIST":
            return <EditMediaListModal key={m.id} {...common} {...m.props} />;
          case "EDIT_MEDIA_SINGLE":
            return <EditMediaSingleModal key={m.id} {...common} {...m.props} />;
          case "EDIT_PROJECT_CONTENT":
            return (
              <EditProjectContentModal key={m.id} {...common} {...m.props} />
            );
          default:
            return null;
        }
      })}
    </>
  );
};

export default ModalStackRoot;
