import React from "react";
import { Check } from "../atoms/Icons";
import { useEditList } from "../../context/EditListProvider";

interface Props {
  list: TList;
}
const DoneButton = ({ list }: Props) => {
  const { isEditing, toggleEdit, onSubmitTitle } = useEditList();
  return !isEditing ? null : (
    <button
      type="submit"
      className={"appearance-none p-2 w-10 h-10 fill-green-500"}
      onClick={(e) => {
        toggleEdit();
        onSubmitTitle(e, list);
      }}
    >
      <Check />
    </button>
  );
};

export default DoneButton;
