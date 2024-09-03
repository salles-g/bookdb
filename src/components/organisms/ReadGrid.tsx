import React from "react";
import { Link } from "react-router-dom";
import { useReads } from "../../context/ReadsProvider";
import { useGridDnd } from "../../lib/hooks/useGridDnd";

interface Props {
  list: TList;
}
const ReadGrid = ({ list }: Props) => {
  const reads = list.reads;
  const { updateCount } = useReads();
  const { onDrag, onDragEnd } = useGridDnd({ list });

  return (
    <div key={updateCount} id="read-grid" className="flex flex-wrap box-border">
      {reads?.map((read, i) => (
        <Link
          key={i}
          id={`read-${read.id}`}
          to={`reads/${read.id}`}
          onDrag={(e) => onDrag(e, read)}
          onDragEnd={onDragEnd}
          className="block hover:scale-105 transition-all duration-150 p-4"
          draggable="true"
        >
          <img
            className="h-full w-40 aspect-book rounded-lg shadow-lg"
            key={i}
            src={read.cover}
            alt={read.title}
            title={read.title}
          />
        </Link>
      ))}
    </div>
  );
};

export default ReadGrid;
