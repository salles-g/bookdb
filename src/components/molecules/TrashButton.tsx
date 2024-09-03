import clsx from "clsx";
import React from "react";
import { Trash } from "../atoms/Icons";
import { useEditList } from "../../context/EditListProvider";

interface Props {
  list: TList;
}
const TrashButton = ({ list }: Props) => {
  const { isEditing, selectedReads, deleteSelectedReads } = useEditList();
  return !isEditing ? null : (
    <button
      className={clsx("appearance-none p-2", {
        "cursor-pointer": selectedReads.length > 0,
        "cursor-not-allowed opacity-50": selectedReads.length === 0,
        "fill-gray-500": selectedReads.length === 0,
        "fill-red-500": selectedReads.length > 0,
      })}
      disabled={selectedReads.length === 0}
      onClick={() => deleteSelectedReads(list.id)}
    >
      <Trash />
    </button>
  );
};

export default TrashButton;
