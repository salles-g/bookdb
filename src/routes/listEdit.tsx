import { useReads } from "../context/ReadsProvider";
import EditListGrid from "../components/organisms/EditListGrid";
import { useParams } from "react-router-dom";

export default function EditList() {
  const { listId } = useParams<{ listId: string }>();
  const { lists } = useReads();

  return (
    <p id="zero-state">
      <EditListGrid list={lists.find((x) => x.id === listId)!} />
    </p>
  );
}
