import { createContext } from "react";
// import firebase from "firebase/compat/app";
import { User } from "firebase/auth";

export const AuthContext = createContext<User | null>(null);
