import React from "react";
import { Link } from "react-router-dom";
import { useReads } from "../../context/ReadsProvider";

const getReadRect = (read: TRead) =>
  $(`#read-${read.id}`).getBoundingClientRect();

const ReadGrid = () => {
  const { reads, updateList } = useReads();

  return (
    <div className="flex flex-wrap gap-8 box-border">
      {reads?.map((read, i) => (
        <Link
          key={i}
          to={`reads/${read.id}`}
          onDragEnd={(e) => {
            const rects = reads.map(getReadRect);
            let prevRead, nextRead;

            for (let j = 0; j < rects.length; j++) {
              const rect = rects[j];
              if (
                e.clientX > rect.left &&
                e.clientX < rect.right &&
                e.clientY > rect.top &&
                e.clientY < rect.bottom
              ) {
                prevRead = reads[j];
              }
              if (
                e.clientX < rect.left &&
                (nextRead === null || rect.left < nextRead?.left)
              ) {
                nextRead = reads[j];
              }
            }

            // If no suitable positions are found, exit early
            if (!prevRead && !nextRead) {
              const minY = Math.min(...rects.map((r) => r.top));
              const maxY = Math.max(...rects.map((r) => r.bottom));
              const firstElement = rects[0];
              const lastElement = rects[rects.length - 1];

              // Determine if the drag ended at the beginning or end of the list, and update it accordingly (splice+unshift or splice+push)
              // Remember that e.clientX > maxX doesn't mean end of the list, since it might be just the end of a row,
              // so we have to check if e.clientY > maxY to confirm it's the end of the list
              const isBeginningOfList =
                e.clientY <= minY || e.clientX < firstElement.left;

              const isEndOfList =
                e.clientY >= maxY ||
                (e.clientX > lastElement.right &&
                  e.clientY <= lastElement.bottom &&
                  e.clientY >= lastElement.top);
              if (isBeginningOfList) {
                const newReads = [...reads];
                newReads.splice(i, 1);
                newReads.unshift(read);
                updateList(newReads);
              } else if (isEndOfList) {
                const newReads = [...reads];
                newReads.splice(i, 1);
                newReads.push(read);
                updateList(newReads);
              }

              return;
            }

            const newReads = [...reads];
            newReads.splice(i, 1); // Remove the dragged item

            if (nextRead) {
              const nextIndex = newReads.findIndex((r) => r.id === nextRead.id);
              newReads.splice(nextIndex, 0, read);
            } else if (prevRead) {
              const prevIndex = newReads.findIndex((r) => r.id === prevRead.id);
              newReads.splice(prevIndex + 1, 0, read);
            } else {
              // If both are null, append at the end
              newReads.push(read);
            }

            // Filter duplicates and update it
            updateList(newReads);
          }}
          id={`read-${read.id}`}
          className="block w-40 aspect-book rounded-lg shadow-lg hover:brightness-105 hover:scale-105 transition-all duration-150"
          draggable="true"
        >
          <img
            className="h-full w-full"
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
