import { updateReadList } from "../reads";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

export const useReads = () => {
  return useContext(ReadsContext)!;
};

interface ReadsProviderValue {
  q: string;
  reads: TRead[];
  previews: TRead[] | null;
  setPreviews: React.Dispatch<React.SetStateAction<TRead[] | null>>;
  updateList: (newList: TRead[]) => void;
  updateCount: number;
}
const ReadsContext = createContext<ReadsProviderValue | null>(null);
const ReadsProvider = ({ children }) => {
  const { reads: list, q } = useLoaderData() as { reads: TRead[]; q: string };
  const [reads, setReads] = useState<TRead[]>(list);
  const [updateCount, setUpdateCount] = useState<number>(0);
  const [previews, setPreviews] = useState<TRead[] | null>(null);

  const updateList = (newList: TRead[]) => {
    const orderedList = newList.map((item, index) => ({
      ...item,
      order: index,
    }));
    setReads(orderedList);
    updateReadList(orderedList);
    setUpdateCount((c) => c + 1);
  };

  useEffect(() => {
    setReads(list);
  }, [list]);

  return (
    <ReadsContext.Provider
      value={{
        q,
        reads,
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
