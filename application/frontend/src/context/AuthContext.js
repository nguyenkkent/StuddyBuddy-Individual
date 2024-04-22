//This file is used to track the user login states
import { createContext, useReducer } from "react";

export const AuthContext = createContext();

//handles state change
export const authReducer = (state, action ) => {
    switch (action.type){
        case 'LOGIN' : 
            return {user : action.payload}
        case 'LOGOUT' : 
            return {user : null} 
        default:
            return state
    }
};

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, {
        user : null
    })
    //debugger to see everytime the state changes
    console.log("AuthContext state: ", state);
    //the authContext wraps the children argument and returns the provider component
    return (
        //dynamic spread operator on state
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}