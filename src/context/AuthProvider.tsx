import React, { ReactNode, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

// import firebase from "firebase/app";
import { auth } from "../firebase/firebaseSetup";
// import { User as FirebaseAuthUser } from "firebase/auth";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = function ({
  children
}) {
  const [user, setUser] = useState<unknown>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseuser) => {
      // console.log(firebaseuser, "user");
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
