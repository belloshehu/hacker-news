import "./Modal.scss";
import { Backdrop } from "../Backdrop/Backdrop";
import { ModalProps } from "./types";

export const Modal = ({
  title,
  children,
  cancelHandler,
  confirmHandler,
  confirmText,
}: ModalProps) => {
  return (
    <>
      <Backdrop />
      <div className="modal">
        <header className="modal__header">
          <h3>{title}</h3>
        </header>
        <div className="modal__content">{children}</div>
        <div className="modal__actions">
          <button className="btn" onClick={cancelHandler}>
            Cancel
          </button>
          <button className="btn" onClick={confirmHandler}>
            {confirmText}
          </button>
        </div>
      </div>
    </>
  );
};
