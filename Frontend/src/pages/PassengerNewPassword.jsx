import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import axiosClient from "../config/axiosClient"
import Alert from "../components/Alert"

const PassengerNewPassword = () => {
    const [password, setPassword] = useState("")
    const [alert, setAlert] = useState({})
    const [validToken, setValidToken] = useState(false)
    const [modifiedPassword, setModifiedPassword] = useState("")

    const {token} = useParams()
    const navigate = useNavigate()
    const alertDisapears = () =>{
        setTimeout(()=>{
            setAlert({})
        },3000)
    }

    useEffect(()=>{
        const checkToken = async()=>{
            try {
                await axiosClient.get(`/api/users/forgot-password/passenger/${token}`)
                setValidToken(true)
            } catch (error) {
                setAlert({
                    msg:error.response.data.msg,
                    error:true
                })
            }
        }
        checkToken()
    },[])

    const handleSubmit = async e=>{
        e.preventDefault()
        if(password.length<6){
            setAlert({
                msg:"Password must be minimum of 6 characters",
                error:true
            })
            alertDisapears()
            return
        }
        
        try {
            const {data} = await axiosClient.post( `/api/users/forgot-password/passenger/${token}`,{password})
            setPassword("")
            setAlert({
                msg:data.msg,
                error:false
            })
            setModifiedPassword(true)
            alertDisapears()
            setTimeout(()=>{
                navigate('/login/passenger')
            },3000)
        } catch (error) {
            setAlert({
                msg:error.response.data.msg,
                error:true
            })
            alertDisapears()
        }
    }

    const {msg} = alert

  return (
    <>
        <h1 className="text-indigo-400 font-bold text-6xl capitalize">Reset Your Password and Don't Lose Access to Your <span className="text-indigo-600">Raites</span> </h1>
        {msg && <Alert alert={alert}/>}
        {validToken &&(
            <form 
                className="my-10 bg-white shadow rounded-lg p-10"
                onSubmit={handleSubmit}
            >
                <div className="my-5">
                    <label htmlFor="password" className="uppercase text-gray-600 block text-xl font-bold">New Password</label>
                    <input 
                        id="password"
                        type="password"
                        placeholder="Write your password, and try to not forget it!"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                        value={password}
                        onChange={e=>setPassword(e.target.value)}
                    />
                </div>
                <input 
                    type="submit"
                    value="Reset Password"
                    className="bg-indigo-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-indigo-800 transition-colors"
                />
            </form>
        )}
        {modifiedPassword && (
            <Link
                className="block text-center my-3 text-slate-500 uppercase text-sm"
                to="/"
            >
                Sign In
            </Link>   
        )}
    </>
  )
}

export default PassengerNewPassword