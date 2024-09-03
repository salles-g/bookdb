import React, { createContext, useContext, useState } from "react";
import { useReads } from "./ReadsProvider";
import { updateList } from "../reads";

export const useEditList = () => {
  return useContext(EditListContext)!;
};

type EditListProviderValue = {
  selectedReads: TRead[];
  setSelectedReads: React.Dispatch<React.SetStateAction<TRead[]>>;
  deleteSelectedReads: (id: string) => void;

  isEditing: boolean;
  toggleEdit: () => void;
  toggleSelect: (read: TRead) => void;

  title: string;
  onChangeTitle: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmitTitle: (event: React.FormEvent, list: TList) => void;

  isDeleting: boolean;
  toggleDeletePrompt: () => void;
} & ReturnType<typeof useReads>;
const EditListContext = createContext<EditListProviderValue | null>(null);
const EditListProvider = ({ children }) => {
  const readsContextValue = useReads();
  const [title, setTitle] = useState("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [selectedReads, setSelectedReads] = useState<TRead[]>([]);

  // Toggles editing mode
  const toggleEdit = () => {
    setIsEditing((prevIsEditing) => !prevIsEditing);
  };

  // Selects or deselects an item for deletion
  const toggleSelect = (read: TRead) => {
    setSelectedReads((prevSelectedReads) =>
      prevSelectedReads.includes(read)
        ? prevSelectedReads.filter((r) => r !== read)
        : [...prevSelectedReads, read]
    );
  };

  // Deletes selected reads from a list
  const deleteSelectedReads = (listId: string) => {
    if (!selectedReads.length) return;
    const reads = readsContextValue.lists.find(
      (list) => list.id === listId
    )?.reads;
    if (!reads) return;
    const updatedReads = reads.filter(
      (read) => !selectedReads.find((r) => r.id === read.id)
    );
    readsContextValue.updateList(listId, updatedReads);
    setSelectedReads([]);
    setIsDeleting(false);
  };
  const toggleDeletePrompt = () => {
    setIsDeleting((prevIsDeleting) => !prevIsDeleting);
  };

  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const onSubmitTitle = (event: React.FormEvent, list: TList) => {
    if (!title) return;
    event.preventDefault();
    editListTitle(list.id, title);
  };
  // Updates the title of a list in the DB
  const editListTitle = (id: string, title: string) => {
    updateList(id, { title });
  };

  return (
    <EditListContext.Provider
      value={{
        ...readsContextValue,

        isEditing,
        toggleEdit,
        toggleSelect,

        title,
        onChangeTitle,
        onSubmitTitle,

        selectedReads,
        setSelectedReads,
        deleteSelectedReads,

        isDeleting,
        toggleDeletePrompt,
      }}
    >
      {children}
    </EditListContext.Provider>
  );
};

export default EditListProvider;
