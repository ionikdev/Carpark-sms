import React from "react";

interface DestinationModalProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const ModalWrapper: React.FC<DestinationModalProps> = ({
  isVisible,
  onClose,
  children,
}) => {
  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    if (target.id === "container") onClose();
  };

  if (!isVisible) return null;

  return (
    <div
      onClick={handleClose}
      id="container"
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-[9999] flex items-center justify-center duration-300 transition-all"
    >
      {children}
    </div>
  );
};

export default ModalWrapper;
