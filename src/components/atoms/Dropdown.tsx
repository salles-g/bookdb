import React, { PropsWithChildren, ReactNode, useState } from "react";
import Button from "./Button";

interface Props extends PropsWithChildren {
  summary: string | ReactNode;
}
const Dropdown = ({ summary, children }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const toggle = () => setOpen((o) => !o);

  return (
    <details
      open={open}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <summary className="cursor-pointer font-bold flex justify-between items-center">
        {summary}
        <Button onClick={toggle}>{open ? "▲" : "▼"}</Button>
      </summary>
      {children}
    </details>
  );
};

export default Dropdown;
