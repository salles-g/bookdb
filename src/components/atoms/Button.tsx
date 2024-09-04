import clsx from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";

type TButtonLayout = "styled" | "default";
const layouts: {
  [x in TButtonLayout]: string;
} = {
  default: "",
  styled: "rounded-lg py-2 px-3 shadow-md bg-white text-[#3992ff]",
};
interface Props extends React.ComponentProps<"button"> {
  layout?: TButtonLayout;
}
const Button = ({ layout, ...props }: Props) => {
  return (
    <button
      {...props}
      className={twMerge(
        clsx({
          [layouts[layout!]]: Boolean(layout),
          [props.className!]: Boolean(props.className),
        })
      )}
    />
  );
};

export default Button;
