import { initialMockData } from "./mockData";

const USE_MOCK_SERVER = true;
let localDb = JSON.parse(JSON.stringify(initialMockData));
const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));
const generateId = () => Date.now().toString();

const mockApi = {
  fetchLists: async () => {
    await delay();
    return JSON.parse(JSON.stringify(localDb));
  },
  fetchListById: async (id) => {
    await delay();
    const list = localDb.find((l) => l.id === id);
    if (!list) throw new Error("List not found");
    return JSON.parse(JSON.stringify(list));
  },
  createList: async (name) => {
    await delay();
    const newList = {
      id: generateId(),
      name,
      owner: "u1",
      archived: false,
      members: [],
      items: [],
    };
    localDb.push(newList);
    return newList;
  },
  updateListName: async (id, newName) => {
    await delay();
    const index = localDb.findIndex((l) => l.id === id);
    if (index !== -1) {
      localDb[index].name = newName;
      return localDb[index];
    }
    throw new Error("List not found");
  },
  deleteList: async (id) => {
    await delay();
    localDb = localDb.filter((l) => l.id !== id);
    return { success: true };
  },
  addItem: async (listId, itemName) => {
    await delay();
    const listIndex = localDb.findIndex((l) => l.id === listId);
    if (listIndex !== -1) {
      const newItem = { id: generateId(), name: itemName, solved: false };
      localDb[listIndex].items.push(newItem);
      return localDb[listIndex];
    }
    throw new Error("List not found");
  },
  toggleItem: async (listId, itemId) => {
    await delay();
    const listIndex = localDb.findIndex((l) => l.id === listId);
    if (listIndex !== -1) {
      const itemIndex = localDb[listIndex].items.findIndex((i) => i.id === itemId);
      if (itemIndex !== -1) {
        localDb[listIndex].items[itemIndex].solved = !localDb[listIndex].items[itemIndex].solved;
        return localDb[listIndex];
      }
    }
    throw new Error("Item not found");
  },
  deleteItem: async (listId, itemId) => {
     await delay();
     const listIndex = localDb.findIndex((l) => l.id === listId);
     if (listIndex !== -1) {
         localDb[listIndex].items = localDb[listIndex].items.filter(i => i.id !== itemId);
         return localDb[listIndex];
     }
     throw new Error("List not found");
  }
};

const realApi = {
  fetchLists: async () => { throw new Error("Real server not implemented"); }
};

export const api = USE_MOCK_SERVER ? mockApi : realApi;