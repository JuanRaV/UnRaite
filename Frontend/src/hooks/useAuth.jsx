import { useContext } from "react";
import AuthContext from "../context/DriverAuthProvider";

const useAuth= ()=>{
    return useContext(AuthContext)
}

export default useAuth