import React from "react";
import { Link } from "react-router-dom";
import { useReads } from "../../context/ReadsProvider";

const getReadRect = (read: TRead) =>
  $(`#read-${read.id}`).getBoundingClientRect();

interface Props {
  list: TList;
  reads: TRead[];
}
const ReadGrid = ({ list, reads }: Props) => {
  const { updateList, updateCount, previews, setPreviews } = useReads();

  return (
    <div key={updateCount} id="read-grid" className="flex flex-wrap box-border">
      {reads?.map((read, i) => (
        <Link
          key={i}
          id={`read-${read.id}`}
          to={`reads/${read.id}`}
          onDragEnd={() => {
            if (previews?.length === reads?.length) {
              return updateList(list.id, previews);
            }
          }}
          onDrag={(e) => {
            const rects = reads.map(getReadRect);
            const hoverIndex = rects.findIndex(
              (rect) =>
                e.clientX > rect.left &&
                e.clientX < rect.right &&
                e.clientY > rect.top &&
                e.clientY < rect.bottom
            );

            if (hoverIndex !== -1) {
              const hoveredEl = $(`#read-${reads[hoverIndex].id}`);
              const draggedEl = $(`#read-${read.id}`);
              const previewElement = draggedEl.cloneNode(true);
              if (hoveredEl.id !== draggedEl.id) {
                const isBefore =
                  e.clientX <
                  rects[hoverIndex].left + rects[hoverIndex].width / 2;
                hoveredEl[isBefore ? "before" : "after"](previewElement);
                draggedEl.remove();
              }

              const newPreviews = [...$(`#read-grid`).children].map((c) => {
                return reads.find((r) => r.id === c.id.replace("read-", ""));
              }) as TRead[];
              setPreviews(newPreviews);
            }
          }}
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
