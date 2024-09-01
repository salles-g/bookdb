import { ActionFunctionArgs, redirect } from "react-router-dom";
import { deleteRead } from "../reads";

export async function action({ params }: ActionFunctionArgs) {
  await deleteRead(params.readId!);
  return redirect("/");
}
