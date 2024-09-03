import {
  ActionFunctionArgs,
  Form,
  LoaderFunctionArgs,
  useFetcher,
  useLoaderData,
} from "react-router-dom";
import { getLists, getRead, updateRead } from "../reads";
import Image from "../components/atoms/Image";

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();
  return updateRead(params.readId!, {
    favorite: formData.get("favorite") === "true",
  });
}
export async function loader({ params }: LoaderFunctionArgs) {
  const read = await getRead(params.readId!);
  const lists = await getLists();
  if (!read) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return { read, lists };
}

export default function Read() {
  const { read } = useLoaderData() as { read: TRead };

  return (
    <div id="read" className="gap-8">
      <div>
        <div className="block w-52 h-auto aspect-book rounded-lg shadow-lg">
          <Image
            className="h-full w-full"
            key={read.cover}
            src={
              read.cover || `https://robohash.org/${read.id}.png?size=200x200`
            }
          />
        </div>
      </div>

      <div>
        <h1>
          {read.title ? <>{read.title}</> : <i>No Name</i>}{" "}
          <Favorite read={read} />
        </h1>

        {read?.authors ? <p className="mt-1">{read.authors}</p> : null}

        {read.description && <p className="mt-4">{read.description}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (!confirm("Please confirm you want to delete this record.")) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

function Favorite({ read }: { read: TRead }) {
  const fetcher = useFetcher();
  const favorite = fetcher.formData
    ? fetcher.formData.get("favorite") === "true"
    : read.favorite;

  return (
    <fetcher.Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        {favorite ? "★" : "☆"}
      </button>
    </fetcher.Form>
  );
}
