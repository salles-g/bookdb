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
            let nextX, nextY, prevRead, nextRead;
            let prevX = rects[0].left;
            let prevY = rects[0].top;

            for (const rect of rects) {
              if (rect.left < e.clientX && rect.left > prevX) {
                prevX = rect.left;
              }
              if (rect.left > e.clientX && rect.left < nextX) {
                nextX = rect.left;
              }
              if (rect.top < e.clientY && rect.top > prevY) {
                prevY = rect.top;
              }
              if (rect.top > e.clientY && rect.top < nextY) {
                nextY = rect.top;
              }
            }

            for (const read of reads) {
              const rRect = getReadRect(read);
              if (rRect.left === prevX && rRect.top === prevY) {
                prevRead = read;
              }
              if (rRect.left === nextX && rRect.top === nextY) {
                nextRead = read;
              }
            }

            // Now, place the "read" after prevRead and before nextRead in a new list
            const newReads = [...reads];
            newReads.splice(i, 1);
            const prevIndex = newReads.findIndex((r) => r.id === prevRead?.id);
            newReads.splice(prevIndex, 0, read);
            const nextIndex = newReads.findIndex((r) => r.id === nextRead?.id);
            newReads.splice(nextIndex, 0, read);

            // Filter out duplicates and update the list
            const orderedList = newReads.filter(
              (item, index, self) =>
                index === self.findIndex((t) => t.id === item.id)
            );
            updateList(orderedList);
          }}
          id={`read-${read.id}`}
          className="block w-40 aspect-book rounded-lg shadow-lg hover:brightness-105 hover:scale-105 transition-all duration-150"
          draggable="true"
        >
          <img className="h-full" key={i} src={read.cover} alt={read.title} />
        </Link>
      ))}
    </div>
  );
};

export default ReadGrid;
