import React, { ReactNode, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { auth } from "../firebase/firebaseSetup";
import { User } from "firebase/auth";
import { signOut } from "firebase/auth";
// import firebase from "firebase/compat/app";

interface AuthProviderProps {
  children: ReactNode;
}

interface UserToken extends User {
  stsTokenManager: {
    expirationTime: number;
  };
}

export const AuthProvider: React.FC<AuthProviderProps> = function ({
  children
}) {
  const storedToken = localStorage.getItem("token");

  let getStoredToken: null | UserToken = null;

  if (storedToken) {
    getStoredToken = JSON.parse(storedToken);
  }

  // console.log(typeof getStoredToken);
  const [user, setUser] = useState<User | null>(getStoredToken);

  // console.log(getStoredToken);

  const checkTokenExpiration = function (expirationTime: number): boolean {
    const presentTime = Date.now();
    return presentTime > expirationTime;
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseuser) => {
      if (!getStoredToken && firebaseuser) {
        localStorage.setItem("token", JSON.stringify(firebaseuser));
      }
      if (getStoredToken) {
        console.log(new Date(getStoredToken.stsTokenManager.expirationTime));
        const isExpired = checkTokenExpiration(
          getStoredToken.stsTokenManager.expirationTime
        );
        if (isExpired) {
          setUser(null);
          localStorage.removeItem("token");
          signOut(auth);
        }
      }
      setUser(firebaseuser);
    });
    if (typeof unsubscribe === "function") {
      return () => {
        unsubscribe();
      };
    }
  }, [getStoredToken, user]);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
