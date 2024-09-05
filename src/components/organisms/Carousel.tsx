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
        <div className="carousel-buttons hidden gap-4 w-full lg:flex">
          <Arrow carouselRef={carouselRef} direction="left" />
          <Arrow carouselRef={carouselRef} direction="right" />
        </div>
        <div
          ref={carouselRef}
          className={clsx(
            "overflow-x-scroll no-scrollbar",
            // gives breathing room for cards that scale up on hover, without scaling the container
            "px-2 py-2 scroll-smooth"
          )}
          data-name="scrollable"
        >
          <div className="flex w-full gap-1 lg:gap-4 h-fit overflow-visible">
            {list.reads.map((read, i) => {
              if (i > 7) return;
              return (
                <Link
                  key={i}
                  to={`/reads/${read.id}`}
                  className={clsx(
                    "w-landscape relative shrink-0 grow",
                    "flex flex-col justify-center hover:scale-105 transition-all duration-150"
                  )}
                >
                  <div
                    className={clsx(
                      "w-full h-auto aspect-book relative",
                      "overflow-clip rounded-md"
                    )}
                  >
                    <Image
                      key={i}
                      src={read.cover}
                      className="w-40 h-auto aspect-book"
                    />
                  </div>
                  <div className="flex flex-col mt-2">
                    <p className="line-clamp-1 text-textPrimary overflow-hidden max-w-40">
                      {read.title}
                    </p>
                  </div>
                </Link>
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
