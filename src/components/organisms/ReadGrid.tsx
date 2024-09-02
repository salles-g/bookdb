import React from "react";
import { Link } from "react-router-dom";
import { useReads } from "../../context/ReadsProvider";

const getReadRect = (read: TRead) =>
  $(`#read-${read.id}`).getBoundingClientRect();

const ReadGrid = () => {
  const { reads, updateList, previews, setPreviews } = useReads();

  return (
    <div
      key={reads.map((r) => r.id).join(",")}
      id="read-grid"
      className="flex flex-wrap box-border"
    >
      {reads?.map((read, i) => (
        <Link
          key={i}
          id={`read-${read.id}`}
          to={`reads/${read.id}`}
          onDragEnd={() => {
            if (previews?.length === reads?.length) {
              return updateList(previews);
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
              const isBefore =
                e.clientX <
                rects[hoverIndex].left + rects[hoverIndex].width / 2;
              const hoveredElement = $(`#read-${reads[hoverIndex].id}`);
              const draggedElement = $(`#read-${read.id}`);
              const previewElement = draggedElement.cloneNode(true);
              hoveredElement[isBefore ? "before" : "after"](previewElement);
              draggedElement.remove();

              const newPreviews = [...$(`#read-grid`).children].map((c) => {
                return reads.find((r) => r.id === c.id.replace("read-", ""));
              }) as TRead[];
              setPreviews(newPreviews);
            }
          }}
          className="block hover:brightness-105 hover:scale-105 transition-all duration-150 p-4"
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
