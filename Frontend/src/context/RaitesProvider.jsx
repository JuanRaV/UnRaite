import { useState, useEffect, createContext } from "react"
import { useNavigate } from "react-router-dom"
import axiosClient from "../config/axiosClient"
import useAuth from "../hooks/useAuth"

const RaitesContext = createContext()

const RaitesProvider = ({ children }) => {
    const [raites, setRaites] = useState([])
    const [raite, setRaite] = useState({})
    const [alert, setAlert] = useState({})
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const {auth} = useAuth()

    useEffect(()=>{
        const getRaites = async () =>{
            try {
                const token = localStorage.getItem('token')
                if(!token)
                    return

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization : `Bearer ${token}`
                    }
                }

                const data = await axiosClient.get('/driver/get-raites',config)

                setRaites(data)

            } catch (error) {
                console.log(error)
            }
        }
        getRaites()
    },[auth])


    const showAlert = alert =>{
        setAlert(alert)
        setTimeout(()=>{
            setAlert({})
        },3000)
    }
    return (
        <RaitesContext.Provider
            value={{
                raites,
                showAlert,
                alert
            }}
        >
            {children}
        </RaitesContext.Provider>
    )
}

export {RaitesProvider}
export default RaitesContext