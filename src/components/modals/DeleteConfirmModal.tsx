import type { Flashcard } from "../../types/Flashcard";

function DeleteConfirmModal({
  card,
  onClose,
  onConfirm,
}: {
  card: Flashcard;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white border-2 border-black rounded-lg shadow-[8px_8px_0px_0px_#000] w-80 p-6 space-y-4">
        <h2 className="text-lg font-bold text-red-600">Delete Card</h2>
        <p>Are you sure you want to delete this card?</p>
        <p className="text-sm text-gray-600 font-medium">"{card.question}"</p>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border-2 border-black rounded shadow-[3px_3px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#000] transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white border-2 border-black rounded shadow-[3px_3px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#000] transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;
