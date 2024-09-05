import React from "react";
import clsx from "clsx";
import Arrow from "../atoms/Arrow";
import Image from "../atoms/Image";
import { Link } from "react-router-dom";
import { ArrowRight } from "../atoms/Icons";

interface Props {
  list: TList;
}
const Carousel = ({ list }: Props) => {
  const carouselRef = React.useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col relative mb-8">
      <h2 className="text-3xl font-bold mb-4 group">
        <Link to={`/list/${list.id}`} className="flex gap-4 items-center">
          {list.title}
          <div className="opacity-0 group-hover:opacity-100 transfform transition-all duration-150 w-8 h-8">
            <ArrowRight />
          </div>
        </Link>
      </h2>
      <div className="relative">
        <div className="carousel-buttons flex gap-4 w-full">
          <Arrow carouselRef={carouselRef} direction="left" />
          <Arrow carouselRef={carouselRef} direction="right" />
        </div>
        <div
          ref={carouselRef}
          className={clsx(
            "overflow-x-scroll no-scrollbar",
            "px-responsive lg:px-theme",
            // gives breathing room for cards that scale up on hover, without scaling the container
            "py-4 my-[-1rem] scroll-smooth"
          )}
          data-name="scrollable"
        >
          <div className="flex w-full gap-1 lg:gap-4 h-fit overflow-visible">
            {list.reads.map((read, i) => {
              if (i > 10) return;
              return (
                <Image key={i} src={read.cover} className="w-40 aspect-book" />
              );
            })}
            <div className="flex items-center justify-center min-w-40 w-40 aspect-book">
              Ver mais
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
