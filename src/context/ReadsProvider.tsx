import { updateReadList } from "../reads";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

export const useReads = () => {
  return useContext(ReadsContext)!;
};

interface ReadsProviderValue {
  q: string;
  reads: TRead[];
  updateList: (newList: TRead[]) => void;
}
const ReadsContext = createContext<ReadsProviderValue | null>(null);
const ReadsProvider = ({ children }) => {
  const { reads: list, q } = useLoaderData() as { reads: TRead[]; q: string };
  const [reads, setReads] = useState<TRead[]>(list);

  const updateList = (newList: TRead[]) => {
    const orderedList = newList.map((item, index) => ({
      ...item,
      order: index,
    }));
    setReads(orderedList);
    updateReadList(orderedList);
  };

  useEffect(() => {
    setReads(list);
  }, [list]);

  return (
    <ReadsContext.Provider value={{ reads, q, updateList }}>
      {children}
    </ReadsContext.Provider>
  );
};

export default ReadsProvider;
