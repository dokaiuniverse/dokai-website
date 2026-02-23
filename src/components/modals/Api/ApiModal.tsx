// src/components/modals/ConfirmModal.tsx
"use client";

import { useEffect, useState } from "react";
import ModalLayout from "../ModalLayout";
import LoadingComponent from "@components/ui/Status/Loading";
import ErrorComponent from "@components/ui/Status/Error";
import DoneComponent from "@components/ui/Status/Done";
import * as Styles from "./style.css";
import useMount from "@hooks/useMount";

type Props = {
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onFetch: () => void | Promise<any>;
  loadingText?: string;
  doneText?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSuccess?: (data: any) => void | Promise<void>;
  onConfirm?: () => void | Promise<void>;
  onClose: () => void;
};

export default function ConfirmModal({
  title = "확인",
  onFetch,
  loadingText,
  doneText,
  onSuccess,
  onConfirm,
  onClose,
}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const mounted = useMount();

  const handleConfirm = async () => {
    await onConfirm?.();
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (!mounted) return;
    (async () => {
      setIsLoading(true);
      try {
        const data = await onFetch();
        await onSuccess?.(data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [onFetch, onSuccess, mounted]);

  return (
    <ModalLayout
      title={title}
      onClose={onClose}
      isOpen={isOpen}
      className={Styles.Container}
      maxWidth="24rem"
    >
      <div className={Styles.Content}>
        {isLoading ? (
          <LoadingComponent useText={loadingText} />
        ) : error ? (
          <ErrorComponent errorText={error.message} />
        ) : (
          <DoneComponent doneText={doneText ?? "fetch complete"} />
        )}
      </div>

      <div className={Styles.ButtonContainer}>
        <button className={Styles.CancelButton} onClick={handleCancel}>
          Cancel
        </button>
        <button
          className={Styles.ConfirmButton}
          onClick={handleConfirm}
          disabled={isLoading || !!error}
        >
          Confirm
        </button>
      </div>
    </ModalLayout>
  );
}
