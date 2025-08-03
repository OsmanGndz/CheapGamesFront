import { FaTimes } from "react-icons/fa";

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Eğer tıklanan element backdrop ise (modal içeriği değilse) modal'ı kapat
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed text-zinc-200 inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={handleBackdropClick}
    >
      <div className="bg-slate-800 w-full max-w-md mx-4 rounded-lg shadow-2xl animate-modal-appear">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-blue-400 rounded-full transition-colors duration-200 cursor-pointer"
          >
            <FaTimes className="text-zinc-200 text-sm" />
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};