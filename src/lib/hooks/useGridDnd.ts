import { useReads } from "../../context/ReadsProvider";

const getReadRect = (read: TRead) =>
  $(`#read-${read.id}`).getBoundingClientRect();

type Props = {
  list: TList;
};
type UseGridDndReturn = {
  onDragEnd: () => void;
  onDrag: (e: React.DragEvent, currentRead: TRead) => void;
};

export const useGridDnd = ({ list }: Props): UseGridDndReturn => {
  const reads = list.reads;
  const { updateList, previews, setPreviews } = useReads();

  const onDragEnd = () => {
    if (previews?.length === reads?.length) {
      return updateList(list.id, previews);
    }
  };

  const onDrag = (e: React.DragEvent, currentRead: TRead) => {
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
      const draggedEl = $(`#read-${currentRead.id}`);
      const previewElement = draggedEl.cloneNode(true);
      if (hoveredEl.id !== draggedEl.id) {
        const isBefore =
          e.clientX < rects[hoverIndex].left + rects[hoverIndex].width / 2;
        hoveredEl[isBefore ? "before" : "after"](previewElement);
        draggedEl.remove();
      }

      const newPreviews = [...$(`#read-grid`).children].map((c) => {
        return reads.find((r) => r.id === c.id.replace("read-", ""));
      }) as TRead[];
      setPreviews(newPreviews);
    }
  };

  return { onDragEnd, onDrag };
};
