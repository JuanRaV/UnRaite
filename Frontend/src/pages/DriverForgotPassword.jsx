import { useState } from "react"
import { Link } from "react-router-dom"
import axiosClient from "../config/axiosClient"
import Alert from "../components/Alert"

const DriverForgotPassword = () => {
  const [email, setEmail] = useState("")
  const [alert, setAlert] = useState({})

  const alertDisapears = () => {
    setTimeout(() => {
      setAlert({})
    }, 3000)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if(email === "" || email.length<6){
      setAlert({
        msg:"Email is Required",
        error:true
      })
      alertDisapears()
      return
    }

    try {
      const {data} = await axiosClient.post('/api/users/forgot-password/driver',{email})
      setAlert({
        msg:data.msg,
        error:false
      })
      alertDisapears()
      setEmail("")
    } catch (error) {
      setAlert({
        msg:error.response.data.msg,
        error:true
      })
      alertDisapears()
    }
  }

  const { msg } = alert

  return (
    <>
      <h1 className="text-indigo-400 font-black text-6xl capitalize">Get Access Again and Don't Lose your <span className="text-indigo-600">Raites</span> </h1>
      {msg && <Alert alert={alert} />}
      <form
        onSubmit={handleSubmit}
        className="my-10 bg-white shadow roudned-lg p-10"
      >
        <div className="my-5">
          <label className="uppercase text-gray-600 block text-xl font-bold" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Ex perrito@gmail.com"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Send Instructions"
          className="bg-indigo-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-indigo-800 transition-colors"
        />
      </form>
      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-3 text-slate-500 uppercase text-sm"
          to="/"
        >
          Already Have an Account? Sign In</Link>
        <Link
          className="block text-center my-3 text-slate-500 uppercase text-sm"
          to="/signUp/driver"
        >
          Don't Have an Account? Sign Up</Link>
      </nav>
    </>
  )
}

export default DriverForgotPassword