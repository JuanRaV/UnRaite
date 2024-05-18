import { useContext } from "react"
import RaitesContext from "../context/RaitesPassengerProvider"

const useRaites = () => {
  return useContext(RaitesContext)
}

export default useRaites