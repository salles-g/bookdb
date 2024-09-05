import clsx from "clsx";
import React, { useEffect } from "react";

const LeftIcon = () => (
  <svg
    clip-rule="evenodd"
    fill-rule="evenodd"
    fill="white"
    stroke-linejoin="round"
    stroke-miterlimit="2"
    viewBox="0 0 24 24"
    className="drop-shadow-md"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="m22 12.002c0-5.517-4.48-9.997-9.998-9.997-5.517 0-9.997 4.48-9.997 9.997 0 5.518 4.48 9.998 9.997 9.998 5.518 0 9.998-4.48 9.998-9.998zm-8.211-4.843c.141-.108.3-.157.456-.157.389 0 .755.306.755.749v8.501c0 .445-.367.75-.755.75-.157 0-.316-.05-.457-.159-1.554-1.203-4.199-3.252-5.498-4.258-.184-.142-.29-.36-.29-.592 0-.23.107-.449.291-.591z"
      fill-rule="nonzero"
    />
  </svg>
);
const RightIcon = () => (
  <svg
    clip-rule="evenodd"
    fill-rule="evenodd"
    stroke-linejoin="round"
    stroke-miterlimit="2"
    viewBox="0 0 24 24"
    fill="white"
    className="drop-shadow-md"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="m2.009 12.002c0-5.517 4.48-9.997 9.998-9.997s9.998 4.48 9.998 9.997c0 5.518-4.48 9.998-9.998 9.998s-9.998-4.48-9.998-9.998zm8.211-4.843c-.141-.108-.3-.157-.456-.157-.389 0-.755.306-.755.749v8.501c0 .445.367.75.755.75.157 0 .316-.05.457-.159 1.554-1.203 4.199-3.252 5.498-4.258.184-.142.29-.36.29-.592 0-.23-.107-.449-.291-.591z"
      fill-rule="nonzero"
    />
  </svg>
);

interface Props {
  carouselRef: React.RefObject<HTMLDivElement>;
  direction: "left" | "right";
}
const Arrow = ({ carouselRef, direction }: Props) => {
  const [hidden, setHidden] = React.useState(direction === "left");
  const onClick = () => {
    const threshold = direction === "left" ? -880 : 880;
    carouselRef?.current?.scrollBy({ left: threshold });
  };
  useEffect(() => {
    const changeVisibility = (e) => {
      if (direction === "left") {
        setHidden(e.target.scrollLeft === 0);
      } else {
        const remainingScroll =
          e.target.scrollWidth - e.target.clientWidth - e.target.scrollLeft;
        setHidden(remainingScroll < 1);
      }
    };
    carouselRef?.current?.addEventListener("scroll", changeVisibility);
    return () =>
      carouselRef?.current?.removeEventListener("scroll", changeVisibility);
  }, [carouselRef, direction]);

  return (
    <button
      className={clsx(
        "h-full w-12 outline-none",
        "absolute top-0 z-30",
        "flex items-center justify-center",
        "bg-gradient-to-r from-backgroundPrimary to-transparent",
        {
          "left-0": direction === "left",
          "right-0": direction === "right",
          "opacity-0 cursor-default": hidden,
        }
      )}
      onClick={onClick}
    >
      {direction === "left" ? <LeftIcon /> : <RightIcon />}
    </button>
  );
};

export default Arrow;
