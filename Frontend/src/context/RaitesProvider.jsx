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
            console.log(error)
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
                completeRaite

            }}
        >
            {children}
        </RaitesContext.Provider>
    )
}

export {RaitesProvider}
export default RaitesContext