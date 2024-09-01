import {
  Outlet,
  useLoaderData,
  Form,
  redirect,
  NavLink,
  useNavigation,
  LoaderFunctionArgs,
  useSubmit,
} from "react-router-dom";
import { getReads, createRead } from "../reads";
import { useEffect } from "react";

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
  const { reads, q } = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const navigation = useNavigation();
  const submit = useSubmit();

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");

  useEffect(() => {
    $("#search-form")!.value = q;
  }, [q]);

  return (
    <>
      <div id="sidebar">
        <h1>React Router Reads</h1>
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              className={searching ? "loading" : ""}
              aria-label="Search reads"
              placeholder="Search"
              type="search"
              name="q"
              defaultValue={q}
              onChange={(event) => {
                const isFirstSeach = q == null;
                submit(event.currentTarget.form!, {
                  replace: !isFirstSeach,
                });
              }}
            />
            <div id="search-spinner" aria-hidden hidden={!searching} />
            <div className="sr-only" aria-live="polite"></div>
          </Form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {reads.length ? (
            <ul>
              {reads.map((read) => (
                <li key={read.id}>
                  <NavLink
                    to={`reads/${read.id}`}
                    className={({ isActive, isPending }) =>
                      isActive ? "active" : isPending ? "pending" : ""
                    }
                  >
                    {read.title ? <>{read.title}</> : <i>No Name</i>}{" "}
                    {read.favorite && <span>★</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No reads</i>
            </p>
          )}
        </nav>
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
