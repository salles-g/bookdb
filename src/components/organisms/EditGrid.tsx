import React from "react";
import { useGridDnd } from "../../lib/hooks/useGridDnd";
import { useEditList } from "../../context/EditListProvider";
import clsx from "clsx";
import { Circle, CircleCheck } from "../atoms/Icons";
import { Link } from "react-router-dom";
import Image from "../atoms/Image";

interface Props {
  list: TList;
}
const EditGrid = ({ list }: Props) => {
  const reads = list?.reads;
  const { onDrag, onDragEnd } = useGridDnd({ list });
  const { updateCount, isEditing, selectedReads, toggleSelect } = useEditList();

  return (
    <div key={updateCount} id="read-grid" className="flex flex-wrap box-border">
      {reads?.map((read, i) => {
        const isSelected = selectedReads.includes(read);
        return (
          <Link
            key={i}
            id={`read-${read.id}`}
            className={
              "block relative hover:scale-105 transition-all duration-150 p-4 cursor-pointer"
            }
            // Edit mode stuff
            to={isEditing ? "" : `/reads/${read.id}`}
            onClick={(e) => {
              if (isEditing) {
                e.preventDefault();
                e.stopPropagation();
                toggleSelect(read);
              }
            }}
            // Drag-and-drop props
            draggable="true"
            onDragEnd={onDragEnd}
            onDrag={(e) => onDrag(e, read)}
          >
            <div className="absolute bottom-0 right-0 mb-6 mr-6 z-10">
              {isEditing ? isSelected ? <CircleCheck /> : <Circle /> : null}
            </div>
            <Image
              className={clsx("h-full w-40 aspect-book rounded-lg shadow-lg", {
                "brightness-90": isEditing && !isSelected,
                "brightness-50": isEditing && isSelected,
              })}
              key={i}
              src={read.cover!}
              alt={read.title}
              title={read.title}
            />
          </Link>
        );
      })}
    </div>
  );
};

export default EditGrid;
