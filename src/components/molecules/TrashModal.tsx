import { useEditList } from "../../context/EditListProvider";
import React from "react";
import ReactModal from "react-modal";
import Button from "../atoms/Button";

interface Props {
  list: TList;
}
const TrashModal = ({ list }: Props) => {
  const { isDeleting, toggleDeletePrompt, deleteSelectedReads } = useEditList();
  return isDeleting ? (
    <ReactModal
      appElement={$("#root")}
      isOpen={true}
      portalClassName="z-50 bg-[rgba(255,255,255,0.75)] fixed top-0 left-0 w-full h-full"
      overlayClassName="w-full h-full flex justify-center items-center"
      className="relative w-1/3 h-1/3 rounded-xl bg-white border border-gray-200 shadow-lg p-8 flex items-center justify-center outline-none"
    >
      <div className="flex flex-col justify-center items-center gap-8 p-8">
        <h1 className="font-bold text-3xl text-[#535353] text-center">
          Tem certeza que quer deletar esses itens?
        </h1>
        <div className="flex gap-4">
          <Button
            layout="styled"
            className="text-green-600"
            onClick={() => deleteSelectedReads(list.id)}
          >
            Sim
          </Button>
          <Button
            layout="styled"
            className="text-red-600"
            onClick={toggleDeletePrompt}
          >
            Não
          </Button>
        </div>
      </div>
    </ReactModal>
  ) : null;
};

export default TrashModal;
