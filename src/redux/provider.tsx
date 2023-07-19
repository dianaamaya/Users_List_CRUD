"use client";

import { Provider } from "react-redux";
import { store } from "./store";

interface IChildren {
  children: React.ReactNode
}

export function Providers({ children }: IChildren) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}
