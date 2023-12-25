import { LinkList } from "../../components/LinkList/LinkList";
import { useEffect, useRef, useState } from "react";
import { Modal } from "../../components/Modal/Modal";
import { LinkForm } from "../../components/LinkForm/LinkForm";
import { useLinkContext } from "../../context/link-context";
import { AuthContextType, LinkContextType } from "../../context/types";
import { useNavigate } from "react-router-dom";
import "./Feed.scss";
import { useAuthProvider } from "../../context/auth-context";

export const Feed = () => {
  const [showModal, setShowModal] = useState(false);
  const submitBtnRef = useRef<HTMLButtonElement>(null);
  const { token } = useAuthProvider() as AuthContextType;
  const navigate = useNavigate();
  const modalConfirmHandler = () => {
    submitBtnRef.current?.click();
  };

  useEffect(() => {
    if (showModal && !token) {
      navigate("/auth");
    }
  }, [showModal]);
  return (
    <div className="container">
      <div className="list__top">
        <h1>Feeds</h1>
        <button className="btn" onClick={() => setShowModal(true)}>
          new feed
        </button>
      </div>
      <LinkList />
      {showModal && (
        <Modal
          title="New feed"
          cancelHandler={() => {
            setShowModal(false);
          }}
          confirmHandler={modalConfirmHandler}
          confirmText="Submit">
          <LinkForm submitBtnRef={submitBtnRef} />
        </Modal>
      )}
    </div>
  );
};
