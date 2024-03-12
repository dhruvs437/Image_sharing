import React,{createContext} from "react";

const INITIAL_STATE = {
    user:JSON.parse(localStorage.getItem("user")) || null,
    isFetching: false,
    error: false,
  };
  
  
export const AuthContext = createContext(INITIAL_STATE);
export const LoginContext=createContext();