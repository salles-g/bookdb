import { useReads } from "../../context/ReadsProvider";
import React, { useRef } from "react";
import DraggableList from "react-draggable-list";
import ReadListItem from "../molecules/ReadListItem";
import { Link } from "react-router-dom";

const ReadList = () => {
  const { lists, reads, updateList } = useReads();
  const containerRef = useRef<HTMLElement | null>(null);

  return (
    <nav className="select-none" ref={containerRef}>
      {reads.length ? (
        // @ts-expect-error - 'template' is expected to be a class
        <DraggableList
          itemKey="id"
          template={ReadListItem}
          list={reads}
          onMoveEnd={updateList}
          container={() => containerRef.current}
        />
      ) : (
        <div>
          {lists.map((list) => (
            <Link key={list.id} to={`/lists/${list.id}`}>
              {list.title}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default ReadList;
