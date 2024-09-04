import { useReads } from "../../context/ReadsProvider";
import React, { useRef } from "react";
import DraggableList from "react-draggable-list";
import ReadListItem from "../molecules/ReadListItem";
import { Link } from "react-router-dom";
import Dropdown from "../atoms/Dropdown";

const ReadList = () => {
  const { lists, reads, updateList } = useReads();
  const containerRef = useRef<HTMLElement | null>(null);

  return (
    <nav className="select-none" ref={containerRef}>
      {lists.map((list) => {
        return (
          <Dropdown
            summary={<Link to={`/lists/${list.id}`}>{list.title}</Link>}
          >
            <DraggableList
              itemKey="id"
              // @ts-expect-error - 'template' is expected to be a class
              template={ReadListItem}
              list={
                reads?.length
                  ? list.reads.filter((read) =>
                      reads.find((r) => r.id === read.id)
                    )
                  : list.reads
              }
              onMoveEnd={(reads: TRead[]) => {
                updateList(list.id, { reads });
              }}
              container={() => containerRef.current}
            />
          </Dropdown>
        );
      })}
    </nav>
  );
};

export default ReadList;
