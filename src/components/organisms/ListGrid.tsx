import React from "react";
import EditGrid from "./EditGrid";
import DoneButton from "../molecules/DoneButton";
import EditButton from "../molecules/EditButton";
import TrashButton from "../molecules/TrashButton";
import EditableTitle from "../molecules/EditableTitle";

interface Props {
  list: TList;
}
const ListGrid = ({ list }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between cursor-default">
        <div className="flex gap-2">
          <EditableTitle list={list} />
          <EditButton />
        </div>
        <div className="flex gap-2">
          <DoneButton list={list} />
          <TrashButton list={list} />
        </div>
      </div>
      <EditGrid list={list} />
    </div>
  );
};

export default ListGrid;
