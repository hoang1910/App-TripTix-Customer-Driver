import { useContext } from "react";

import { RootStoreContext } from "./store";

export const Provider = RootStoreContext.Provider;

export function useStore() {
  const store = useContext(RootStoreContext);

  if (!store) {
    throw new Error("Store null");
  }

  return store;
}
