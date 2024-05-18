import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../config/axiosClient";
import useAuth from "../hooks/useAuthPassenger";
import axios from "axios";

const RaitesContext = createContext()

const RaitesPassengerProvider = ({children}) =>{
    const [raites, setRaites] = useState([])
    const [raite, setRaite] = useState({})
    const [alert, setAlert] = useState({})
    const [loading, setLoading] = useState(false)
    const [formRaiteModal, setFormRaiteModal] = useState(false)
    const [deleteTaskModal, setDeleteTaskModal] = useState(false)

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

                const {data} = await axiosClient.get('/passenger',config)

                setRaites(data)
            } catch (error) {
                console.log(error)
            }
        }
        getRaites()
    },[auth])

    // const getRaite = async id =>{
    //     setLoading(true)
    //     try {
    //         const token = localStorage.getItem('token')

    //         if(!token) return

    //         const config = {
    //             headers:{
    //                 "Content-Type":"application/json",
    //                 Authorization:`Bearer ${token}`
    //             }
    //         }

    //         const {data} = await axiosClient(`/driver/get-raite/${id}`,config)
            
    //         setRaite(data)
    //         setAlert({})

    //     } catch (error) {
    //         navigate('/raites/driver')
    //         setAlert({
    //             msg:error.response.data.msg,
    //             error:true
    //         })
    //         setTimeout(()=>{
    //             setAlert({})
    //         },3000)
    //     }finally{
    //         setLoading(false)
    //     }
    // }

    return(
        <RaitesContext.Provider
            value={{
                raites,
                raite,
                alert,
                showAlert,
                setAlert,

            }}
        >
            {children}
        </RaitesContext.Provider>
    )
}

export {RaitesPassengerProvider}
export default RaitesContext