import {
  Form,
  useLoaderData,
  redirect,
  ActionFunctionArgs,
  useNavigate,
} from "react-router-dom";
import { updateRead } from "../reads";

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();
  const listIds = formData.getAll("lists") as string[];
  const updates = Object.fromEntries(formData);
  delete updates.listIds;
  await updateRead(params.readId!, updates, listIds);
  return redirect(`/reads/${params.readId}`);
}

export default function EditRead() {
  const { lists, read } = useLoaderData() as { read: TRead; lists: TList[] };
  const navigate = useNavigate();

  return (
    <Form method="post" id="read-form">
      <p>
        <span>Title</span>
        <input
          placeholder="Title"
          aria-label="Title"
          type="text"
          name="title"
          defaultValue={read?.title}
        />
      </p>
      <p>
        <span>Authors</span>
        <input
          placeholder={'Authors (separated by ";")'}
          aria-label="Authors"
          type="text"
          name="authors"
          defaultValue={read?.authors}
        />
      </p>
      <p>
        <span>Edition</span>
        <input
          placeholder="Edition"
          aria-label="Edition"
          type="number"
          name="edition"
          defaultValue={read?.edition}
        />
      </p>
      <p>
        <span>Series</span>
        <input
          placeholder="Series"
          aria-label="Series"
          type="text"
          name="series"
          defaultValue={read?.series}
        />
      </p>
      <p>
        <span>Pages</span>
        <input
          placeholder="Pages"
          aria-label="Pages"
          type="number"
          name="pages"
          defaultValue={read?.pages}
        />
      </p>
      <p>
        <span>ISBN</span>
        <input
          placeholder="ISBN"
          aria-label="ISBN"
          type="number"
          name="isbn"
          defaultValue={read?.isbn}
        />
      </p>
      <p>
        <span>Publisher</span>
        <input
          placeholder="Publisher"
          aria-label="Publisher"
          type="text"
          name="publisher"
          defaultValue={read?.publisher}
        />
      </p>
      <p>
        <span>Publish Year</span>
        <input
          placeholder="YYYY"
          aria-label="Publish Year"
          type="text"
          name="publishYear"
          defaultValue={read?.publishYear}
        />
      </p>
      <label>
        <span>Cover URL</span>
        <input
          placeholder="https://example.com/cover.jpg"
          aria-label="Cover URL"
          type="text"
          name="cover"
          defaultValue={read?.cover}
        />
      </label>
      <label>
        <span>Description</span>
        <textarea
          name="description"
          defaultValue={read?.description}
          rows={6}
        />
      </label>
      {/* Use checkboxes to determine which lists it belongs to */}
      {lists?.map((list) => (
        <label key={list.id} className="flex items-center">
          <span>Lists</span>
          <input
            type="checkbox"
            name="lists"
            className="w-5 h-5 max-w-5 mr-2"
            value={list.id}
            defaultChecked={list.reads.some((r) => r.id === read.id)}
          />
          {list.title}
        </label>
      ))}
      <p>
        <button type="submit">Save</button>
        <button
          type="button"
          onClick={() => {
            navigate(-1);
          }}
        >
          Cancel
        </button>
      </p>
    </Form>
  );
}
