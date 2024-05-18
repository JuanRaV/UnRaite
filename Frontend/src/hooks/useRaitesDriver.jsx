import { useContext } from "react"
import RaitesContext from "../context/RaitesDriverProvider"

const useRaites = () => {
  return useContext(RaitesContext)
}

export default useRaites