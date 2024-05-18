import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Alert from "../components/Alert"
import axiosClient from "../config/axiosClient"
import useAuth from "../hooks/useAuth"

const DriverLogIn = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alert, setAlert] = useState({})

    const { setAuth } = useAuth()
    const navigate = useNavigate()

    const alertDisapears = () => {
        setTimeout(() => {
            setAlert({})
        }, 3000)
    }

    const handleSubmit = async e => {
        e.preventDefault()
        if ([email, password].includes('')) {
            setAlert({
                msg: "All fields are required",
                error: true
            })
            alertDisapears()
            return
        }
        try {
            const { data } = await axiosClient.post('/api/users/driver-login', {
                email,
                password
            })
            // console.log(data)
            //Saving token on localStorage
           
                localStorage.setItem('token', data.token)
                setAuth(data)
                navigate('/driver')
            

        } catch (error) {
            setAlert({
                msg: error.response.data.msg,
                error: true
            })
            alertDisapears()
        }
    }

    const { msg } = alert

    return (
        <>
            <h1 className="text-indigo-400 font-black text-6xl capitalize">LogIn & Get <span className="text-indigo-600">Raites</span></h1>
            {msg && <Alert alert={alert} />}
            <form
                className="my-10 bg-white shadow rounded-lg p-10"
                onSubmit={handleSubmit}
            >
                <div className="my-5">
                    <label
                        htmlFor="email"
                        className="uppercase text-gray-600 block text-xl font-bold">Email</label>
                    <input
                        id="email"
                        type="text"
                        placeholder="Write your Email"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="my-5">
                    <label
                        htmlFor="password"
                        className="uppercase text-gray-600 block text-xl font-bold">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Write your Password"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <input
                    type="submit"
                    value="LogIn"
                    className="bg-indigo-600 mb-5 w-full p-3 text-white uppercase font-bold rounded-lg hover:cursor-pointer hover:bg-indigo-800 transition-colors"
                />
            </form>
            <nav className="lg:flex lg:justify-between">
                <Link
                    className="block text-center my-3 text-slate-500 uppercase text-sm"
                    to="/signUp/driver"
                >
                    Don't Have an Account? Sign Up</Link>
                <Link
                    className="block text-center my-3 text-slate-500 uppercase text-sm"
                    to="/forgotPassword/driver"
                >
                    Forgot my Password</Link>
            </nav>
        </>
    )
}

export default DriverLogIn