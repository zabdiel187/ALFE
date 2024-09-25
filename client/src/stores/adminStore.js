import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

const adminStore = (set, get) => ({
  selectedId: null,

  setSelectedId: (input) => {
    set({ selectedId: input }, false);
  },
});

export const useAdminStore = create(
  persist(devtools(adminStore), {
    name: "adminStore",
  })
);
