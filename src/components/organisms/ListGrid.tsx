import React from "react";
import ReadGrid from "./ReadGrid";

interface Props {
  list: TList;
}
const ListGrid = ({ list }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl ml-4 font-bold font-sans">{list.title}</h1>
      <ReadGrid list={list} reads={list.reads} />
    </div>
  );
};

export default ListGrid;
