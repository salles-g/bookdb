import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

export async function getReads(query) {
  await fakeNetwork(`getReads:${query}`);
  let reads = await localforage.getItem("reads");
  if (!reads) reads = [];
  if (query) {
    reads = matchSorter(reads, query, { keys: ["first", "last"] });
  }
  return reads.sort(sortBy("last", "createdAt"));
}

export async function createRead() {
  await fakeNetwork();
  let id = Math.random().toString(36).substring(2, 9);
  let read = { id, createdAt: Date.now() };
  let reads = await getReads();
  reads.unshift(read);
  await set(reads);
  return read;
}

export async function getRead(id) {
  await fakeNetwork(`read:${id}`);
  let reads = await localforage.getItem("reads");
  let read = reads.find((read) => read.id === id);
  return read ?? null;
}

export async function updateRead(id, updates) {
  await fakeNetwork();
  let reads = await localforage.getItem("reads");
  let read = reads.find((read) => read.id === id);
  if (!read) throw new Error("No read found for", id);
  Object.assign(read, updates);
  await set(reads);
  return read;
}

export async function deleteRead(id) {
  let reads = await localforage.getItem("reads");
  let index = reads.findIndex((read) => read.id === id);
  if (index > -1) {
    reads.splice(index, 1);
    await set(reads);
    return true;
  }
  return false;
}

function set(reads) {
  return localforage.setItem("reads", reads);
}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache = {};

async function fakeNetwork(key) {
  if (!key) {
    fakeCache = {};
  }

  if (fakeCache[key]) {
    return;
  }

  fakeCache[key] = true;
  return new Promise((res) => {
    setTimeout(res, Math.random() * 800);
  });
}
