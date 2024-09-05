import {
  Outlet,
  redirect,
  useNavigation,
  LoaderFunctionArgs,
  Form,
  Link,
} from "react-router-dom";
import { createList, createRead, getLists, getReads } from "../reads";
import ReadList from "../components/organisms/ReadList";
import SearchForm from "../components/molecules/SearchForm";
import { Plus } from "../components/atoms/Icons";
import FooterDev from "../__tests__/FooterDev";
import Button from "../components/atoms/Button";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q")!;
  const lists = await getLists();
  let reads: TRead[] = [];
  if (q) {
    reads = await getReads(q);
  }
  return { lists, reads, q };
}

export async function action({ request }) {
  const formData = await request.formData();
  const actionType = formData.get("actionType");

  switch (actionType) {
    case "newRead": {
      const read = await createRead();
      return redirect(`/reads/${read.id}/edit`);
    }
    case "newList": {
      const list = await createList();
      return redirect(`/lists/${list.id}`);
    }
    default: {
      return null;
    }
  }
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
            <Button
              layout="styled"
              type="submit"
              name="actionType"
              value="newRead"
            >
              New
            </Button>
          </Form>
        </div>
        <ReadList />
        <Form method="post" className="mt-2">
          <Button
            type="submit"
            name="actionType"
            value="newList"
            className="default flex items-center gap-2 font-bold text-black opacity-50 hover:opacity-100 transition-all duration-150"
          >
            <i className="p-1 m-0 w-8 h-8">
              <Plus />
            </i>
            <span>New List</span>
          </Button>
        </Form>
        {process.env.NODE_ENV === "development" && <FooterDev />}
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
