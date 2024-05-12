import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../config/axiosClient";
import useAuth from "../hooks/useAuth";
import axios from "axios";

const RaitesContext = createContext()

const RaitesProvider = ({children}) =>{
    const [raites, setRaites] = useState([])
    const [raite, setRaite] = useState({})
    const [alert, setAlert] = useState({})
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const {auth} = useAuth()

    
    const showAlert = alert =>{
        setAlert(alert)
        setTimeout(()=>{
            setAlert({})
        },3000)
    }

    useEffect(()=>{
        const getRaites = async() =>{
            try {
                const token = localStorage.getItem('token')
                
                if(!token) return

                const config = {
                    headers:{
                        "Content-Type":"application/json",
                        Authorization:`Bearer ${token}`
                    }
                }

                const {data} = await axiosClient.get('/driver/get-raites',config)

                setRaites(data)
            } catch (error) {
                console.log(error)
            }
        }
        getRaites()
    },[auth])

    const getRaite = async id =>{
        setLoading(true)
        try {
            const token = localStorage.getItem('token')

            if(!token) return

            const config = {
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${token}`
                }
            }

            const {data} = await axiosClient(`/driver/get-raite/${id}`,config)
            
            setRaite(data)
            setAlert({})

        } catch (error) {
            navigate('/raites/driver')
            setAlert({
                msg:error.response.data.msg,
                error:true
            })
            setTimeout(()=>{
                setAlert({})
            },3000)
        }finally{
            setLoading(false)
        }
    }

    return(
        <RaitesContext.Provider
            value={{
                raites,
                raite,
                getRaite,
                alert,
                showAlert,
                setAlert
            }}
        >
            {children}
        </RaitesContext.Provider>
    )
}

export {RaitesProvider}
export default RaitesContext