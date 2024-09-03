import React from "react";
import ReadGrid from "./ReadGrid";
import { Pencil } from "../atoms/Icons";
import { Link } from "react-router-dom";

interface Props {
  list: TList;
  editable?: boolean;
}
const ListGrid = ({ list, editable }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-5">
        <h1 className="text-3xl ml-4 font-bold font-sans">{list.title}</h1>
        {editable && (
          <Link
            to={`/lists/${list.id}/edit`}
            className="appearance-none p-0 m-0 outline-none border-none shadow-none hover:shadow-none"
          >
            <Pencil />
          </Link>
        )}
      </div>
      <ReadGrid list={list} />
    </div>
  );
};

export default ListGrid;
