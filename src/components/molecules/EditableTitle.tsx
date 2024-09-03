import { useEditList } from "../../context/EditListProvider";
import React, { useState } from "react";
import { Form } from "react-router-dom";

interface EditableTitleProps {
  list: TList;
}
const EditableTitle: React.FC<EditableTitleProps> = ({ list }) => {
  const { editListTitle } = useEditList();
  const [title, setTitle] = useState(list.title);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleTitleClick = () => {
    setIsEditing(true);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    editListTitle(list.id, title);
    setIsEditing(false);
  };

  return (
    <div className="ml-4">
      {isEditing ? (
        <Form onSubmit={handleFormSubmit}>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            autoFocus
          />
          <button className="ml-2 p-2" type="submit">
            ✔️
          </button>
        </Form>
      ) : (
        <h1 className="text-3xl font-bold font-sans" onClick={handleTitleClick}>
          {title}
        </h1>
      )}
    </div>
  );
};

export default EditableTitle;
