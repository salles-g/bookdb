import {
  Outlet,
  redirect,
  useNavigation,
  LoaderFunctionArgs,
  Form,
  Link,
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
        <div>
          <Link to="/" className="mr-2">
            <img
              className="block w-10 h-10 rounded-lg"
              src="/vite.svg"
              alt="Home"
            />
          </Link>
          <SearchForm />
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
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
