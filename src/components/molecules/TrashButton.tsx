import clsx from "clsx";
import React from "react";
import { Trash } from "../atoms/Icons";
import { useEditList } from "../../context/EditListProvider";
import TrashModal from "./TrashModal";

interface Props {
  list: TList;
}
const TrashButton = ({ list }: Props) => {
  const { isEditing, selectedReads, toggleDeletePrompt } = useEditList();
  return !isEditing ? null : (
    <>
      <button
        className={clsx("appearance-none p-2", {
          "cursor-pointer fill-red-500": !!selectedReads.length,
          "cursor-not-allowed opacity-50 fill-gray-500": !selectedReads.length,
        })}
        disabled={selectedReads.length === 0}
        onClick={toggleDeletePrompt}
      >
        <Trash />
      </button>
      <TrashModal list={list} />
    </>
  );
};

export default TrashButton;
