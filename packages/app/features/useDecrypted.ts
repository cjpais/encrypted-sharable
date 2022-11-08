import create from "zustand";
import { persist } from "zustand/middleware";
import localforage from "localforage";
import { useEffect, useState } from "react";

type DecryptedData = {
  id: string;
  data: string;
  timestamp: number;
  creator: string;
};

interface DecryptedState {
  decryptedData: DecryptedData[];
  addDecryptedData: (key: string, value: DecryptedData) => void;
}

const emptyState: DecryptedState = {
  decryptedData: [],
  addDecryptedData: () => {},
};

export const useDecrypted = create<DecryptedState>()(
  persist<DecryptedState>(
    (set) => ({
      decryptedData: [],
      addDecryptedData: (key, value) => {
        set((state) => ({
          decryptedData: [...state.decryptedData, value],
        }));
      },
    }),
    {
      name: "decrypted-data",
      getStorage: () => localforage as never,
      // getStorage: () => ({
      //   getItem: async (name: string) => localStorage.getItem(name),
      //   setItem: (name: string, value: string) =>
      //     localStorage.setItem(name, value),
      //   removeItem: (name: string) => localStorage.removeItem(name),
      // }),
    }
  )
);

// export const useDecrypted = ((selector: any, compare?: any) => {
//   console.log("selector", selector);
//   const store: DecryptedState = decryptedDataStore(selector, compare);
//   const [isHydrated, setIsHydrated] = useState(false);
//   useEffect(() => setIsHydrated(true), []);
//   return emptyState;
//   // return isHydrated ? store : selector(emptyState);
// }) as typeof decryptedDataStore;
