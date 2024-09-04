import React from "react";
import { Check } from "../atoms/Icons";
import { useEditList } from "../../context/EditListProvider";
import Button from "../atoms/Button";

interface Props {
  list: TList;
}
const DoneButton = ({ list }: Props) => {
  const { isEditing, toggleEdit, onSubmitTitle } = useEditList();
  return !isEditing ? null : (
    <Button
      type="submit"
      layout={"styled"}
      className={"p-2 w-10 h-10 fill-green-500"}
      onClick={(e) => {
        toggleEdit();
        onSubmitTitle(e, list);
      }}
    >
      <Check />
    </Button>
  );
};

export default DoneButton;
