import { createList, setLists, setReads } from "../reads";
import { books } from "./books";

export async function repopulate() {
  const list = await createList({
    id: "default",
    title: "Lista de Leitura 2024",
  });
  const newReads: TRead[] = [];
  for (let i = 0; i < books.length; i++) {
    const read: TRead = {
      title: books[i].title!,
      cover: books[i].cover,
      authors: books[i].authors,
      id: Math.random().toString(36).substring(2, 9),
      createdAt: Date.now(),
      order: i + 1,
    };
    newReads.push(read);
    list.reads.push(read);
  }
  await setReads(newReads);
  await setLists([list]);
}
