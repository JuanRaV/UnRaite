import { useState, useEffect, createContext } from "react"
import axiosClient from "../config/axiosClient"

const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        const authUser = async() =>{
            const token = localStorage.getItem('token')
            if(!token){
                setLoading(false)
                return
            }
            const config = {
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${token}`
                }
            }
            try {
                const {data} = await axiosClient('/api/users/passenger-profile',config)
                const {data2} = await axiosClient('/api/users/driver-profile',config)
                // console.log(data)
                if(data2)
                    setAuth(data2)
                else if(data)
                    setAuth(data)
                // console.log(auth)
            } catch (error) {
                setAuth({})
            }finally{
                setLoading(false)
            }
        }
        authUser()
    },[])

    const signOffAuth= ()=>{
        setAuth({})
    }

    return(
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                loading,
                signOffAuth
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
export {AuthProvider}
export default AuthContext