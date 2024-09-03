import React from "react";
import { Pencil } from "../atoms/Icons";
import { useEditList } from "../../context/EditListProvider";

const EditButton = () => {
  const { isEditing, toggleEdit } = useEditList();
  return isEditing ? null : (
    <button
      type="button"
      onClick={toggleEdit}
      className="appearance-none p-0 m-0 ml-4 outline-none border-none shadow-none hover:shadow-none transition-all duration-150"
    >
      <Pencil />
    </button>
  );
};

export default EditButton;
