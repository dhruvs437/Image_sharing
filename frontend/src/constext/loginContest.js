import React,{createContext} from "react";


export const LoginContext=createContext();
const INITIAL_STATE = {
    user:JSON.parse(localStorage.getItem("user")) || null,
    isFetching: false,
    error: false,
  };
  
  
  export const AuthContext = createContext(INITIAL_STATE);