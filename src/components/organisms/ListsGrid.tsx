import { useReads } from "../../context/ReadsProvider";
import React from "react";
import ListGrid from "./ListGrid";

const ListsGrid = () => {
  const { lists } = useReads();
  return (
    <div id="reading-lists">
      {lists.map((list, i) => (
        <ListGrid key={i} list={list} />
      ))}
    </div>
  );
};

export default ListsGrid;
