import { createContext } from "react";

import type { UserContextProps } from "./AppContextProvider";

type AppContextProps = {
  user: UserContextProps | null;
  signed: boolean;
  loadingAuth: boolean;
  handleInfoUser: ({ name, email, uid }: UserContextProps) => void;
};

export const AppContext = createContext({} as AppContextProps);
