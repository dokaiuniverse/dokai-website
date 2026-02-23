// src/components/modals/ConfirmModal.tsx
"use client";

import { useState } from "react";
import ModalLayout from "../ModalLayout";
import * as Styles from "./style.css";

type Props = {
  title: string;
  content: string;
  onConfirm?: () => void | Promise<void>;
  onClose: () => void;
};

export default function ConfirmModal({
  title = "확인",
  content,
  onConfirm,
  onClose,
}: Props) {
  const [isOpen, setIsOpen] = useState(true);

  const handleConfirm = async () => {
    await onConfirm?.();
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <ModalLayout
      title={title}
      onClose={onClose}
      isOpen={isOpen}
      className={Styles.Container}
      maxWidth="24rem"
    >
      <div className={Styles.Content}>{content}</div>

      <div className={Styles.ButtonContainer}>
        <button className={Styles.CancelButton} onClick={handleCancel}>
          Cancel
        </button>
        <button className={Styles.ConfirmButton} onClick={handleConfirm}>
          Confirm
        </button>
      </div>
    </ModalLayout>
  );
}
