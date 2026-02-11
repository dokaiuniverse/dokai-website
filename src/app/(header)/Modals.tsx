"use client";

import useCareerWorkModal from "@components/modal/CareerWork/useCareerWork";

const Modals = () => {
  const { Modal } = useCareerWorkModal();
  return <>{Modal}</>;
};

export default Modals;
