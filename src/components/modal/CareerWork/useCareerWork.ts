import { JSX } from "react";
import useModal from "../useModal";
import BottomUpModalLayout from "../layout/BottomUp";
import CareerWorkModal from "./CareerWork";

const useCareerWorkModal = (): {
  openModal: (modalData: string) => void;
  closeModal: () => void;
  Modal: JSX.Element | null;
} => {
  const { Modal, openModal, closeModal } = useModal<string>({
    Layout: BottomUpModalLayout,
    Component: CareerWorkModal,
    modalKey: "career_work",
    showDelay: 200,
  });

  return { Modal, openModal, closeModal };
};

export default useCareerWorkModal;
