import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

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
  await set(reads);
  return read;
}

export async function getRead(id: string) {
  await fakeNetwork(`read:${id}`);
  const reads = await getReads();
  const read = reads.find((read) => read.id === id);
  return read ?? null;
}

export async function updateRead(id: string, updates: Partial<TRead>) {
  await fakeNetwork();
  const reads = await getReads();
  const read = reads.find((read) => read.id === id);
  if (!read) throw new Error(`No read found for ${id}`);
  Object.assign(read, updates);
  await set(reads);
  return read;
}

export async function updateReadList(newList: TRead[]) {
  await fakeNetwork();
  await set(newList);
}

export async function deleteRead(id: string) {
  const reads = await getReads();
  const index = reads.findIndex((read) => read.id === id);
  if (index > -1) {
    reads.splice(index, 1);
    await set(reads);
    return true;
  }
  return false;
}

function set(reads: TRead[]) {
  return localforage.setItem("reads", reads);
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
