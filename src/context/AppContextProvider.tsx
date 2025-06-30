import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

import { auth } from "../services/firebaseConection";
import { AppContext } from "./AppContext";

interface AppContextProviderProps {
  children: React.ReactNode;
}

export interface UserContextProps {
  name: string | null;
  uid: string;
  email: string | null;
}
export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [user, setUser] = useState<UserContextProps | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          name: user?.displayName,
          email: user?.email,
          uid: user?.uid,
        });
        setLoadingAuth(false);
      } else {
        setUser(null);
        setLoadingAuth(false);
      }
    });

    return () => {
      unSub();
    };
  }, []);
  const handleInfoUser = ({ name, email, uid }: UserContextProps) => {
    setUser({ name, email, uid });
  };

  return (
    <AppContext.Provider
      value={{ signed: !!user, loadingAuth, handleInfoUser, user }}
    >
      {children}
    </AppContext.Provider>
  );
};
