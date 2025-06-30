import { createContext } from "react";

import type { UserContextProps } from "./AppContextProvider";

type AppContextProps = {
  signed: boolean;
  loadingAuth: boolean;
  handleInfoUser: ({ name, email, uid }: UserContextProps) => void;
  user: UserContextProps | null;
};

export const AppContext = createContext({} as AppContextProps);
