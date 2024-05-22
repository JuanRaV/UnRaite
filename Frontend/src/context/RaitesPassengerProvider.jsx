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
    const [rideHistory, setRideHistory] = useState([]);

    const navigate = useNavigate()

    const {auth} = useAuth()
    console.log(auth)
    
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
    },[])

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

            const {data} = await axiosClient(`/passenger/${id}`,config)
            
            setRaite(data)
            setAlert({})

        } catch (error) {
            
            setAlert({
                msg:error.response.data.msg,
                error:true
            })
            setTimeout(()=>{
                setAlert({})
                navigate('/passenger')
            },3000)
        }finally{
            setLoading(false)
        }
    }
    const reserveRaite = async id =>{
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

            await axiosClient.put(`/passenger/accept-raite/${id}`,{},config)
            setAlert({
                msg:"Raite accepted successfully",
                error:false
            })
            setTimeout(()=>{
                setAlert({})
                navigate('/passenger')
            },3000)


        } catch (error) {
            
            setAlert({
                msg:error.response.data.msg,
                error:true
            })
            setTimeout(()=>{
                setAlert({})
                navigate('/passenger')
            },3000)
        }finally{
            setLoading(false)
        }
    }

    const cancelReservation = async id=>{
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
            const confirmReport = window.confirm('Are you sure you want to cancel this reservarion?');
            if (!confirmReport) return; // Exit if user cancels
            await axiosClient.delete(`/passenger/cancel-raite/${id}`,config)
            setAlert({
                msg:"Raite unreserved successfully",
                error:false
            })
            setTimeout(()=>{
                setAlert({})
                navigate('/passenger')
            },3000)


        } catch (error) {
            
            setAlert({
                msg:error.response.data.msg,
                error:true
            })
            setTimeout(()=>{
                setAlert({})
                navigate('/passenger')
            },3000)
        }finally{
            setLoading(false)
        }
    }

    const reportDriver=async (driverId, raiteId) =>{
        console.log("raite id",raiteId)
        console.log("driver id", driverId)
        try {
            const token = localStorage.getItem('token')

            if(!token) return

            const config = {
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${token}`
                }
            }
            const confirmReport = window.confirm('Are you sure you want to cancel this reservarion?');
            if (!confirmReport) return; // Exit if user cancels

            const{data}= await axiosClient.post(`/passenger/strike-driver/${driverId}/${raiteId}`, {},config)
            
            setAlert({
                msg:"Report created successfully",
                error:false
            })
            setTimeout(()=>{
                setAlert({})
                navigate('/passenger')
            },3000)

        } catch (error) {
            setAlert({
                msg:error.response.data.msg,
                error:true
            })
            setTimeout(()=>{
                setAlert({})
                navigate('/passenger')
            },3000)
        }
    }

    const fetchRideHistory = async () => { // Add this function
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };

            const { data } = await axiosClient.get('/passenger/ride-history', config);
            setRideHistory(data);
        } catch (error) {
            console.log(error);
        }
    };


    return(
        <RaitesContext.Provider
            value={{
                raites,
                raite,
                getRaite,
                alert,
                showAlert,
                setAlert,
                cancelReservation,
                reserveRaite,
                reportDriver,
                fetchRideHistory,
                rideHistory
            }}
        >
            {children}
        </RaitesContext.Provider>
    )
}

export {RaitesPassengerProvider}
export default RaitesContext