import { NavLink } from "react-router-dom";

const ReadListItem = ({ item, dragHandleProps }) => {
  const { onMouseDown, onTouchStart } = dragHandleProps;
  return (
    <li
      className="list-none select-none dragHandle"
      key={item.id}
      onTouchStart={(e) => {
        e.preventDefault();
        document.body.style.overflow = "hidden";
        onTouchStart(e);
      }}
      onMouseDown={(e) => {
        document.body.style.overflow = "hidden";
        onMouseDown(e);
      }}
      onTouchEnd={() => {
        document.body.style.overflow = "visible";
      }}
      onMouseUp={() => {
        document.body.style.overflow = "visible";
      }}
    >
      <NavLink
        to={`reads/${item.id}`}
        className={({ isActive, isPending }) =>
          isActive ? "active" : isPending ? "pending" : ""
        }
      >
        {item.title ? <>{item.title}</> : <i>No Name</i>}{" "}
        {item.favorite && <span>★</span>}
      </NavLink>
    </li>
  );
};

export default ReadListItem;
