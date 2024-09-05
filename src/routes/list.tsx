import { useParams } from "react-router-dom";
import { useReads } from "../context/ReadsProvider";
import ListGrid from "../components/organisms/ListGrid";

export default function List() {
  const { listId } = useParams<{ listId: string }>();
  const { lists } = useReads();

  return (
    <p id="zero-state">
      <ListGrid list={lists.find((x) => x.id === listId)!} />
    </p>
  );
}
