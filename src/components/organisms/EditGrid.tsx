import React from "react";
import { useGridDnd } from "../../lib/hooks/useGridDnd";
import { useEditList } from "../../context/EditListProvider";
import clsx from "clsx";
import { CircleCheck } from "../atoms/Icons";
import { useReads } from "../../context/ReadsProvider";

interface Props {
  list: TList;
}
const EditGrid = ({ list }: Props) => {
  const reads = list.reads;
  const { updateCount } = useReads();
  const { onDrag, onDragEnd } = useGridDnd({ list });
  const { selectedReads, toggleSelect } = useEditList();

  return (
    <div key={updateCount} id="read-grid" className="flex flex-wrap box-border">
      {reads?.map((read, i) => {
        const isSelected = selectedReads.includes(read);
        return (
          <div
            key={i}
            onClick={() => toggleSelect(read)}
            id={`read-${read.id}`}
            onDrag={(e) => onDrag(e, read)}
            onDragEnd={onDragEnd}
            className={
              "block relative hover:scale-105 transition-all duration-150 p-4 cursor-pointer"
            }
            draggable="true"
          >
            <div className="absolute bottom-0 right-0 mb-6 mr-6 z-10">
              {isSelected ? <CircleCheck /> : null}
            </div>
            <img
              className={clsx("h-full w-40 aspect-book rounded-lg shadow-lg", {
                "filter brightness-50 ": isSelected,
              })}
              key={i}
              src={read.cover}
              alt={read.title}
              title={read.title}
            />
          </div>
        );
      })}
    </div>
  );
};

export default EditGrid;
