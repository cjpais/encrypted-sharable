import create from "zustand";
import { persist } from "zustand/middleware";
import { useEffect, useState } from "react";

type RandomState = {
  user: { isSignedIn: boolean };
  setUser: (userData: { isSignedIn: boolean }) => void;
  resetUser: () => void;
};

const emptyState = (set: any): RandomState => ({
  user: {
    isSignedIn: false,
  },
  setUser: async (userData) => {
    set({ user: { ...userData } });
  },
  resetUser: () => {
    set({ user: {} });
  },
});

const usePersistedStore = create(persist(emptyState, { name: "user-storage" }));

export const useStore = (selector, compare) => {
  /*
  This a fix to ensure zustand never hydrates the store before React hydrates the page.
  Without this, there is a mismatch between SSR/SSG and client side on first draw which produces
  an error.
   */
  const store = usePersistedStore(selector, compare);
  const [isHydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return isHydrated ? store : selector(emptyState);
};
