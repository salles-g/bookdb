import { useReads } from "../../context/ReadsProvider";
import React, { useRef } from "react";
import DraggableList from "react-draggable-list";
import ReadListItem from "../molecules/ReadListItem";

const ReadList = () => {
  const { reads, updateList } = useReads();
  const containerRef = useRef<HTMLElement | null>(null);

  return (
    <nav className="select-none" ref={containerRef}>
      {reads.length ? (
        <DraggableList
          itemKey="id"
          // @ts-expect-error - `template` prop expects a class
          template={ReadListItem}
          list={reads}
          onMoveEnd={updateList}
          container={() => containerRef.current}
        />
      ) : (
        <p>
          <i>No reads</i>
        </p>
      )}
    </nav>
  );
};

export default ReadList;
