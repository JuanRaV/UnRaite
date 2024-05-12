import { useContext } from "react";
import RaitesContext from "../context/RaitesProvider";

const useRaites = () =>{
    return useContext(RaitesContext)
}

export default useRaites