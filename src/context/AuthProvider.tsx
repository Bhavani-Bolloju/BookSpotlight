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

  const [user, setUser] = useState<User | null>(getStoredToken);

  const checkTokenExpiration = function (expirationTime: number): boolean {
    const presentTime = Date.now();
    // console.log(presentTime - expirationTime);
    // console.log(new Date(expirationTime));
    return presentTime > expirationTime;
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseuser) => {
      if (firebaseuser) {
        if (!getStoredToken) {
          //store only when the token is not stored locally
          localStorage.setItem("token", JSON.stringify(firebaseuser));
        }
        if (getStoredToken) {
          //if token stored locally check its validity
          const isExpired = checkTokenExpiration(
            getStoredToken.stsTokenManager.expirationTime
          );
          if (isExpired) {
            handleLogout();
          }
        } else {
          //when there is not stored token in localstorage
          setUser(firebaseuser);
        }
      } else {
        handleLogout();
      }
    });
    if (typeof unsubscribe === "function") {
      return () => {
        unsubscribe();
      };
    }
  }, [getStoredToken, user]);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
