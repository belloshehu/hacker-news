import React from "react";
export type ModalProps = {
  children: React.ReactNode;
  title: string;
  cancelHandler: () => void;
  confirmHandler: () => void;
  confirmText: string;
};
