import React, { useMemo } from "react";
import { useEditList } from "../../context/EditListProvider";

interface EditableTitleProps {
  list: TList;
}
const EditableTitle: React.FC<EditableTitleProps> = ({ list }) => {
  const { title, isEditing, onChangeTitle } = useEditList();
  const shownTitle = useMemo(() => title || list?.title, [list, title]);
  return (
    <div className="ml-4">
      {isEditing ? (
        <input
          type="text"
          value={shownTitle}
          onChange={onChangeTitle}
          autoFocus
          className="text-3xl font-bold font-sans border-none outline-none h-fit p-0 shadow-none hover:shadow-none"
        />
      ) : (
        <h1 className="text-3xl font-bold font-sans">{shownTitle}</h1>
      )}
    </div>
  );
};

export default EditableTitle;
