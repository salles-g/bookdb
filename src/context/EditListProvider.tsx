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
  toggleSelect: (read: TRead) => void;
  editListTitle: (id: string, title: string) => void;
} & ReturnType<typeof useReads>;
const EditListContext = createContext<EditListProviderValue | null>(null);
const EditListProvider = ({ children }) => {
  const readsContextValue = useReads();
  const [selectedReads, setSelectedReads] = useState<TRead[]>([]);

  const toggleSelect = (read: TRead) => {
    setSelectedReads((prevSelectedReads) =>
      prevSelectedReads.includes(read)
        ? prevSelectedReads.filter((r) => r !== read)
        : [...prevSelectedReads, read]
    );
  };
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
  };
  const editListTitle = (id: string, title: string) => {
    updateList(id, { title });
  };

  return (
    <EditListContext.Provider
      value={{
        ...readsContextValue,
        toggleSelect,
        editListTitle,
        selectedReads,
        setSelectedReads,
        deleteSelectedReads,
      }}
    >
      {children}
    </EditListContext.Provider>
  );
};

export default EditListProvider;
