import React from "react";
import { Pencil } from "../atoms/Icons";
import { useEditList } from "../../context/EditListProvider";
import Button from "../atoms/Button";

const EditButton = () => {
  const { isEditing, toggleEdit } = useEditList();
  return isEditing ? null : (
    <Button type="button" onClick={toggleEdit} className="ml-4">
      <Pencil />
    </Button>
  );
};

export default EditButton;
