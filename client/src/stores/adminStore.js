import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

const adminStore = (set, get) => ({
  selectedId: null,
  BACKEND: "http://localhost:3001",

  setSelectedId: (input) => {
    set({ selectedId: input }, false);
  },
});

export const useAdminStore = create(
  persist(devtools(adminStore), {
    name: "adminStore",
  })
);
