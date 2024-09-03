import React from "react";
import EditGrid from "./EditGrid";
import { Trash } from "../atoms/Icons";
import { useEditList } from "../../context/EditListProvider";
import EditableTitle from "../molecules/EditableTitle";
import clsx from "clsx";

interface Props {
  list: TList;
}
const EditListGrid = ({ list }: Props) => {
  const { selectedReads, deleteSelectedReads } = useEditList();
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex items-center gap-5 justify-between">
        <EditableTitle list={list} />
        <button
          className={clsx("appearance-none p-2", {
            "cursor-pointer": selectedReads.length > 0,
            "cursor-not-allowed opacity-50": selectedReads.length === 0,
          })}
          disabled={selectedReads.length === 0}
          onClick={() => deleteSelectedReads(list.id)}
        >
          <Trash />
        </button>
      </div>
      <EditGrid list={list} />
    </div>
  );
};

export default EditListGrid;
