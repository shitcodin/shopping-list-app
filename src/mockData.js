export const initialMockData = [
  {
    id: "1",
    name: "Продукты на неделю",
    owner: "u1",
    archived: false,
    members: ["u2", "u3"],
    items: [
      { id: "i1", name: "Молоко", solved: false },
      { id: "i2", name: "Хлеб", solved: true },
      { id: "i3", name: "Яйца", solved: false },
    ],
  },
  {
    id: "2",
    name: "Для ремонта",
    owner: "u1",
    archived: false,
    members: ["u4"],
    items: [
      { id: "i4", name: "Краска", solved: false },
      { id: "i5", name: "Кисти", solved: false },
    ],
  },
];