import { useState, useEffect, createContext } from "react"
import axiosClient from "../config/axiosClient"

const AuthContext = createContext()

const DriverAuthProvider = ({children}) => {
    const [auth, setAuth] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        const authUser = async() =>{
            setAuth({})
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
                const {data} = await axiosClient('/api/users/driver-profile',config)
                if(data)
                    setAuth(data)
                // console.log(auth)
            } catch (error) {
                console.log(error)
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
export {DriverAuthProvider}
export default AuthContext