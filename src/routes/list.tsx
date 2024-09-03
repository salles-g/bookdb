import { useReads } from "../context/ReadsProvider";
import ListGrid from "../components/organisms/ListGrid";
import { useParams } from "react-router-dom";

export default function List() {
  const { listId } = useParams<{ listId: string }>();
  const { lists } = useReads();
  const list = lists.find((list) => list.id === listId)!;

  return (
    <p id="zero-state">
      <ListGrid list={list} />
    </p>
  );
}
