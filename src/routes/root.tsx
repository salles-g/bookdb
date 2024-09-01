import {
  Outlet,
  redirect,
  useNavigation,
  LoaderFunctionArgs,
} from "react-router-dom";
import { getReads, createRead } from "../reads";
import ReadList from "../components/organisms/ReadList";
import SearchForm from "../components/molecules/SearchForm";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q")!;
  const reads = await getReads(q);
  return { reads, q };
}

export async function action() {
  const read = await createRead();
  return redirect(`/reads/${read.id}/edit`);
}

export default function Root() {
  const navigation = useNavigation();
  return (
    <>
      <div id="sidebar">
        <SearchForm />
        <ReadList />
      </div>
      <div
        id="detail"
        className={navigation.state === "loading" ? "loading" : ""}
      >
        <Outlet />
      </div>
    </>
  );
}
