import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../config/axiosClient";
import useAuth from "../hooks/useAuthDriver";
import axios from "axios";

const RaitesContext = createContext()

const RaitesDriverProvider = ({children}) =>{
    const [raites, setRaites] = useState([])
    const [raite, setRaite] = useState({})
    const [alert, setAlert] = useState({})
    const [loading, setLoading] = useState(false)
    const [formRaiteModal, setFormRaiteModal] = useState(false)
    const [deleteTaskModal, setDeleteTaskModal] = useState(false)

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

                const {data} = await axiosClient.get('/driver/get-raites',config)

                setRaites(data)
            } catch (error) {
                console.log(error)
            }
        }
        getRaites()
    },[auth.driverId])

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

    const handleRaiteModal = () =>{
        setFormRaiteModal(!formRaiteModal)
        setRaite({})
    }

    const createRaite = async raite =>{
        try {
            const token = localStorage.getItem('token')
            if(!token) return 

            const config = {
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${token}`
                }
            }

            const {data} = await axiosClient.post('/driver/create-raite', raite,config)
            setRaite([...raites,data])
            setAlert({
                msg:"Raite Created Successfully",
                error:false
            })
            setTimeout(()=>{
                setAlert({})
                navigate('/driver')
            },3000)
        } catch (error) {
            setAlert({
                msg:error.response.data.msg,
                error:true
            })
            setTimeout(()=>{
                setAlert({})
                navigate('/driver')
            },3000)
        }
    }

    const editRaite = async raite =>{
        try {
            const token = localStorage.getItem('token')
            if(!token) return

            const config = {
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${token}`
                }
            }

            const {data} = await axiosClient.put(`/driver/edit-raite/${raite.id}`,raite,config)

            //Sincronize State
            const updatedRaites = raites.map(raiteState => raiteState.id === data.id ? data : raiteState)
            setRaites(updatedRaites)

            setAlert({
                msg:'Raite Updated Successfully',
                error: false
            })
            setTimeout(()=>{
                setAlert({})
                navigate('/driver')
            },3000)

        } catch (error) {
            console.log(error)
        }
    }
    const submitRaite = async raite =>{
        if(raite.id)
            await editRaite(raite)
        else
            await createRaite(raite)
    }

    const handleModalEditRaite = raite =>{
        setRaite(raite)
        setFormRaiteModal(true)
    }

    const completeRaite = async id =>{
        try {
            const token = localStorage.getItem("token")
            if(!token) return
            const config = {
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${token}`
                }
            }
            const confirmReport = window.confirm('Are you sure you want to finish this raite?');
            if (!confirmReport) return; // Exit if user cancels
            await axiosClient.put(`/driver/complete-raite/${id}`,{},config)
            // const updatedRaites = raites.map(raiteState => raiteState.id === data.id ? data : raiteState)
            // setRaites(updatedRaites)
            // setRaite({})
            setAlert({
                msg:'Raite Completed Successfully',
                error: false
            })
            setTimeout(()=>{
                setAlert({})
                navigate('/driver')
            },3000)
        } catch (error) {
            console.log(error.response)
        }
    }
    const deleteRaite = async id =>{
        const token = localStorage.getItem("token")
        if(!token) return
        const config = {
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            }
        }
        const confirmReport = window.confirm('Are you sure you want to cancel this raite?');
        if (!confirmReport) return; // Exit if user cancels
        await axiosClient.delete(`/driver/delete-raite/${id}`,config)

        setAlert({
            msg:'Raite Deleted Successfully',
            error: false
        })
        setTimeout(()=>{
            setAlert({})
            navigate('/driver')
        },3000)
    }

    const reportPassenger = async (passengerId, raiteId)=>{
        const token = localStorage.getItem("token")
        if(!token) return
        const config = {
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            }
        }
        const confirmReport = window.confirm('Are you sure you want to report this passenger?');
        if (!confirmReport) return; // Exit if user cancels
        try {
            await axiosClient.post(`/driver/strike-passenger/${passengerId}/${raiteId}`,{},config)

            setAlert({
                msg:'Passenger Reported Successfully',
                error: false
            })
            setTimeout(()=>{
                setAlert({})
                navigate('/driver')
            },3000)
        } catch (error) {
            setAlert({
                msg:error.response.data.msg,
                error: true
            })
            setTimeout(()=>{
                setAlert({})
            },3000)
            console.log(error.response.data.msg)
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
                setAlert,
                formRaiteModal,
                handleRaiteModal,
                handleModalEditRaite,
                submitRaite,
                completeRaite,
                deleteRaite,
                reportPassenger

            }}
        >
            {children}
        </RaitesContext.Provider>
    )
}

export {RaitesDriverProvider}
export default RaitesContext