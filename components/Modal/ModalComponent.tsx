import React, { useState } from "react";
import { GrClose } from "react-icons/gr";
import Modal from "react-modal";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)", // This will give a black, semi-transparent backdrop
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "1px solid #fff",
    borderRadius: "4px",
    backgroundColor: "#fff",
    padding: "20px",
    color: "#000", // This will make text black
  },
  closeButton: {
    position: "absolute" as "absolute",
    top: "10px",
    right: "10px",
    background: "none",
    border: "none",
    padding: "0",
    cursor: "pointer",
  },
};

interface ModalComponentProps {
  buttonText?: string | React.ReactNode;
  buttonClass: string;
  modalContent: string | React.ReactNode;
}

const ModalComponent: React.FC<ModalComponentProps> = ({
  buttonText,
  buttonClass,
  modalContent,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <button onClick={() => setModalOpen(true)} className={buttonClass}>
        {buttonText}
      </button>
      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button
          className=" hover:scale-125"
          style={customStyles.closeButton}
          onClick={closeModal}
        >
          <GrClose />
        </button>
        <div>{modalContent}</div>
      </Modal>
    </>
  );
};

export default ModalComponent;
