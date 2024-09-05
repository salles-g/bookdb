import React from "react";
import Carousel from "./Carousel";
import { useReads } from "../../context/ReadsProvider";

const ListCarousels = () => {
  const { lists } = useReads();
  return (
    <div>
      {lists.map((list) => (
        <Carousel list={list} />
      ))}
    </div>
  );
};

export default ListCarousels;
