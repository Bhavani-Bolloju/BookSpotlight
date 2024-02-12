import React, { ReactNode, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { auth } from "../firebase/firebaseSetup";
import { User } from "firebase/auth";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = function ({
  children
}) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseuser) => {
      setUser(firebaseuser);
    });
    if (typeof unsubscribe === "function") {
      return () => {
        unsubscribe();
      };
    }
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
