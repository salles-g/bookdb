import React, { createContext, useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { updateList as updateReadList } from "../reads";

export const useReads = () => {
  return useContext(ReadsContext)!;
};

type LoaderData = {
  q: string;
  lists: TList[];
  reads: TRead[];
};

interface ReadsProviderValue {
  q: string;
  reads: TRead[];
  lists: TList[];
  previews: TRead[] | null;
  setPreviews: React.Dispatch<React.SetStateAction<TRead[] | null>>;
  updateList: (listId: string, updates: Partial<TList>) => void;
  updateCount: number;
}
const ReadsContext = createContext<ReadsProviderValue | null>(null);
const ReadsProvider = ({ children }) => {
  const { q, lists: initialLists, reads } = useLoaderData() as LoaderData;
  const [lists, setLists] = useState<TList[]>(initialLists);
  const [updateCount, setUpdateCount] = useState<number>(0);
  const [previews, setPreviews] = useState<TRead[] | null>(null);

  const updateList = (listId: string, updates: Partial<TList>) => {
    updateReadList(listId, {
      ...updates,
    });
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId ? { ...list, ...updates } : list
      )
    );
    setUpdateCount((count) => count + 1);
  };

  useEffect(() => {
    setLists(initialLists);
  }, [initialLists]);

  return (
    <ReadsContext.Provider
      value={{
        q,
        reads,
        lists,
        updateList,
        previews,
        updateCount,
        setPreviews,
      }}
    >
      {children}
    </ReadsContext.Provider>
  );
};

export default ReadsProvider;
