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
      {reads.length ? (
        lists.map((list) => {
          return (
            <Dropdown
              summary={<Link to={`/lists/${list.id}`}>{list.title}</Link>}
            >
              <DraggableList
                itemKey="id"
                // @ts-expect-error - 'template' is expected to be a class
                template={ReadListItem}
                list={list.reads.filter((read) =>
                  reads.find((r) => r.id === read.id)
                )}
                onMoveEnd={(reads: TRead[]) => {
                  updateList(list.id, { reads });
                }}
                container={() => containerRef.current}
              />
            </Dropdown>
          );
        })
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
