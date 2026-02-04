import { HiXMark } from "react-icons/hi2";
import type { ReactNode } from "react";

type ModalProps = {
  children: ReactNode;
  onClose: () => void;
};

function Modal({ children, onClose }: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 rounded-lg bg-white shadow-xl animate-scaleIn">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition"
        >
          <HiXMark size={22} />
        </button>

        {children}
      </div>
    </div>
  );
}

export default Modal;
