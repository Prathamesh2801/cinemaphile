import React, { useEffect, useState } from "react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onConfirm,
  onCancel,
  message,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setTimeout(() => {
        setIsVisible(false);
      }, 200); // Match the transition duration
    }
  }, [isOpen]);

  if (!isVisible && !isOpen) return null;

  return (
    <div
      className={`fixed inset-0 bg-opacity-75 flex items-center justify-center transition-all duration-200 ease-in-out ${
        isOpen ? "backdrop-blur-sm opacity-100" : "backdrop-blur-none opacity-0"
      }`}
    >
      <div className="bg-neutral-900/90 p-6 rounded-lg shadow-lg border border-neutral-800/50">
        <h2 className="text-lg font-semibold mb-4 text-neutral-200 font-doto">
          Confirmation
        </h2>
        <p className="mb-4 text-neutral-400">{message}</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-transparent hover:bg-neutral-700 text-neutral-300 rounded-md transition-colors border border-neutral-700 cursor-pointer font-doto"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-800 hover:bg-red-900 text-white rounded-md transition-colors cursor-pointer font-doto"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
