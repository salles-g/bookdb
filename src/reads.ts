import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

export async function getLists(): Promise<TList[]> {
  await fakeNetwork("getLists");
  let lists = (await localforage.getItem("lists")) as TList[];
  if (!lists) lists = [];
  return lists.sort(sortBy("order", "createdAt"));
}

export async function createList(params?: Partial<TList>) {
  await fakeNetwork();
  const id = Math.random().toString(36).substring(2, 9);
  const list: TList = {
    id: params?.id || id,
    createdAt: Date.now(),
    title: params?.title || "New List",
    order: ((await getLists()).length || 0) + 1,
    reads: params?.reads || [],
  };
  const lists = await getLists();
  lists.unshift(list);
  await setLists(lists);
  return list;
}

export async function createDefaultList(read: TRead) {
  let lists = await getLists();
  // Create a default list if none exist
  if (!lists.length) {
    const defaultList = await createList({
      id: "default",
      title: "Default",
      reads: [read],
    });
    lists = [defaultList];
  } else {
    // Add the read to the default list if it exists
    const defaultList = lists.find((list) => list.id === "default")!;
    defaultList.reads.push(read);
    await updateList(defaultList.id, defaultList);
  }
}

export async function updateList(id: string, updates: Partial<TList>) {
  await fakeNetwork();
  const lists = await getLists();
  const list = lists.find((list) => list.id === id);
  if (!list) throw new Error(`No list found for ${id}`);
  Object.assign(list, updates);
  await setLists(lists);
  return list;
}

export async function deleteList(id: string) {
  const lists = await getLists();
  const index = lists.findIndex((list) => list.id === id);
  if (index > -1) {
    lists.splice(index, 1);
    await setLists(lists);
    return true;
  }
  return false;
}

export async function getReads(query?: string): Promise<TRead[]> {
  await fakeNetwork(`getReads:${query}`);
  let reads = (await localforage.getItem("reads")) as TRead[];
  if (!reads) reads = [];
  if (query) {
    reads = matchSorter(reads, query, { keys: ["title"] });
  }
  return reads.sort(sortBy("order", "createdAt"));
}

export async function createRead() {
  await fakeNetwork();
  const id = Math.random().toString(36).substring(2, 9);
  const read = {
    id,
    createdAt: Date.now(),
    title: "",
    order: ((await getReads()).length || 0) + 1,
  };

  const reads = await getReads();
  reads.unshift(read);
  await setReads(reads);
  await createDefaultList(read);

  return read;
}

export async function getRead(id: string) {
  await fakeNetwork(`read:${id}`);
  const reads = await getReads();
  const read = reads.find((read) => read.id === id);
  return read ?? null;
}

export async function updateRead(
  id: string,
  updates: Partial<TRead>,
  listIds?: string[]
) {
  await fakeNetwork();
  const reads = await getReads();
  const read = reads.find((read) => read.id === id);
  if (!read) throw new Error(`No read found for ${id}`);
  Object.assign(read, updates);
  await setReads(reads);

  // Update lists to reflect the new listIds for this read
  const lists = await getLists();
  // Iterate over each list to add or remove the read
  lists.forEach((list) => {
    const readIndex = list.reads.findIndex((r) => r.id === id);

    if (listIds && listIds.includes(list.id)) {
      // If the listId is in the provided listIds, ensure the read is in the list
      if (readIndex === -1) {
        list.reads.push(read); // Add the read if it's not already in the list
      } else {
        list.reads[readIndex] = read; // Update the read if it's already in the list
      }
    } else {
      // If the listId is not in the provided listIds, remove the read from the list
      if (readIndex !== -1) {
        list.reads.splice(readIndex, 1);
      }
    }
  });

  await setLists(lists);

  return read;
}

export async function updateReadList(newList: TRead[]) {
  await fakeNetwork();
  await setReads(newList);
}

export async function deleteRead(id: string) {
  const reads = await getReads();
  const index = reads.findIndex((read) => read.id === id);
  if (index > -1) {
    reads.splice(index, 1);
    await setReads(reads);

    // Remove read from lists
    const lists = await getLists();
    lists.forEach((list) => {
      const readIndex = list.reads.findIndex((r) => r.id === id);
      if (readIndex !== -1) {
        list.reads.splice(readIndex, 1);
      }
    });
    await setLists(lists);

    return true;
  }
  return false;
}

function set(key: string, value) {
  return localforage.setItem(key, value);
}

export async function setReads(reads: TRead[]) {
  await set("reads", reads);
}

export async function setLists(lists: TList[]) {
  await set("lists", lists);
}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache = {} as Record<string, boolean>;

async function fakeNetwork(key?: string) {
  if (!key) {
    fakeCache = {};
  }

  key = key as string;
  if (fakeCache[key]) {
    return;
  }

  fakeCache[key] = true;
  return new Promise((res) => {
    setTimeout(res, Math.random() * 800);
  });
}
