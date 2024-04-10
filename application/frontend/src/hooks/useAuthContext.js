import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

//this function checks to see if we're using the correct context
export const useAuthContext = () => {
    const context = useContext(AuthContext);

    if (!context){
        throw Error("useAuthContext must be used inside an AuthContextProvider");
    }

    return context;
}