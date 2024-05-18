import { useContext } from "react";
import AuthContext from "../context/PassengerAuthProvider";

const useAuth= ()=>{
    return useContext(AuthContext)
}

export default useAuth