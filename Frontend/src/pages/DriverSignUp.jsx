import { useState } from "react"
import { Link } from "react-router-dom"
import Alert from '../components/Alert'
import axiosClient from "../config/axiosClient"
import axios from "axios"

const SignUp = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState(0)
  const [idFront, setIdFront] = useState(null)
  const [idBack, setIdBack] = useState(null)
  const [licenceFront, setLicenceFront] = useState(null)
  const [licenceBack, setLicenceBack] = useState(null)
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [alert, setAlert] = useState({})

  const alertDisapears = () => {
    setTimeout(() => {
      setAlert({})
    }, 3000)
  }
  const handleFrontImageChange = (event) => {
    const selectedFile = event.target.files[0];
    // Check if a file is actually selected
    if (!selectedFile) return;
    console.log(selectedFile)
    // Validate file type (optional)
    if (!selectedFile.type.match('image/*')) {
      setAlert({
        msg: "Invalid file type. Please select an image.",
        error: true
      })
      alertDisapears()
      return
    }
    
    setIdFront(selectedFile);
  };
  const handleBackImageChange = (event) => {
    const selectedFile = event.target.files[0];
    // Check if a file is actually selected
    if (!selectedFile) return;
    console.log(selectedFile)
    // Validate file type (optional)
    if (!selectedFile.type.match('image/*')) {
      setAlert({
        msg: "Invalid file type. Please select an image.",
        error: true
      })
      alertDisapears()
      return
    }
    
    setIdBack(selectedFile);
  };

  const handleFrontLicenceImageChange = (event) => {
    const selectedFile = event.target.files[0];
    // Check if a file is actually selected
    if (!selectedFile) return;
    console.log(selectedFile)
    // Validate file type (optional)
    if (!selectedFile.type.match('image/*')) {
      setAlert({
        msg: "Invalid file type. Please select an image.",
        error: true
      })
      alertDisapears()
      return
    }
    
    setLicenceFront(selectedFile);
  };
  const handleBackLicenceImageChange = (event) => {
    const selectedFile = event.target.files[0];
    // Check if a file is actually selected
    if (!selectedFile) return;
    console.log(selectedFile)
    // Validate file type (optional)
    if (!selectedFile.type.match('image/*')) {
      setAlert({
        msg: "Invalid file type. Please select an image.",
        error: true
      })
      alertDisapears()
      return
    }
    
    setLicenceBack(selectedFile);
  };
  const handleSubmit = async e => {
    e.preventDefault()
    if ([name, email, phoneNumber, idFront, idBack, password, repeatPassword].includes('')) {
      setAlert({
        msg: "All filed are required",
        error: true
      })
      alertDisapears()
      return
    }
    if (password !== repeatPassword) {
      setAlert({
        msg: "Passwords don't match",
        error: true
      })
      alertDisapears()
      return
    }
    if (password.length < 6) {
      setAlert({
        msg: "Password to short",
        error: true
      })
      alertDisapears()
      return
    }
    console.log(idFront)
    const formData = new FormData()
    formData.append("frontStudentCredential",idFront)
    formData.append("backStudentCredential",idBack)
    formData.append("frontDriversLicence",licenceFront)
    formData.append("backDriversLicence",licenceBack)
    formData.append("name",name)
    formData.append("email",email)
    formData.append("phoneNumber",phoneNumber)
    formData.append("password",password)

 
    try {
        await axiosClient.post('/api/users/signup/driver',formData,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      setAlert({
        msg:data.msg,
        error:false
      })
      setName('')
      setEmail('')
      setPhoneNumber('')
      setIdFront(null)
      setIdBack(null)
      setPassword('')
      setRepeatPassword('')
    } catch (error) {
      setAlert({
        msg: error.response,
        error: true
      })
    }
  }


  const { msg } = alert

  return (
    <>
      <h1 className="text-indigo-400 font-black text-6xl capitalize">Create an Account & Start Giving <span className="text-indigo-600">Raites</span></h1>
      {msg && <Alert alert={alert} />}
      <form
        className="my-10 bg-white shadow rounded-lg p-10"
        onSubmit={handleSubmit}
      >
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="name"
          >Name</label>
          <input
            id="name"
            type="text"
            placeholder="Ex. Juan Ramion"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="email"
          >Email</label>
          <input
            id="email"
            type="email"
            placeholder="Ex. juanito@example.com"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="phone"
          >Phone Number</label>
          <input
            id="phone"
            type="number"
            placeholder="Ex. 1133552244"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={phoneNumber}
            onChange={e => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="idFront"
          >
            Front ID Image
          </label>
          <input
            id="idFront"
            type="file" // Change type to "file" for image upload
            accept="image/*" // Restrict accepted file types (optional)
            placeholder="Select an image" // Placeholder text (optional)
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            onChange={handleFrontImageChange} // Handle file selection
          />
        </div>
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="idBack"
          >
            Back ID Image
          </label>
          <input
            id="idBack"
            type="file" // Change type to "file" for image upload
            accept="image/*" // Restrict accepted file types (optional)
            placeholder="Select an image" // Placeholder text (optional)
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            onChange={handleBackImageChange} // Handle file selection
          />
        </div>
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="idLFront"
          >
            Front Drivers Licence Image
          </label>
          <input
            id="idLFront"
            type="file" // Change type to "file" for image upload
            accept="image/*" // Restrict accepted file types (optional)
            placeholder="Select an image" // Placeholder text (optional)
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            onChange={handleFrontLicenceImageChange} // Handle file selection
          />
        </div>
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="idLBack"
          >
            Back Drivers Licence Image
          </label>
          <input
            id="idLBack"
            type="file" // Change type to "file" for image upload
            accept="image/*" // Restrict accepted file types (optional)
            placeholder="Select an image" // Placeholder text (optional)
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            onChange={handleBackLicenceImageChange} // Handle file selection
          />
        </div>
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="password"
          >Password</label>
          <input
            id="password"
            type="password"
            placeholder="Ex. Your super secret password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="repeat-password"
          >Repeat password</label>
          <input
            id="repeat-password"
            type="password"
            placeholder="Ex. Your super secret password * 2"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={repeatPassword}
            onChange={e => setRepeatPassword(e.target.value)}
          />
        </div>
        <input
          type="submit"
          value="Sign Up"
          className="bg-indigo-600 mb-5 w-full p-3 text-white uppercase font-bold rounded-lg hover:cursor-pointer hover:bg-indigo-800 transition-colors"
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
          to="/forgot-password"
        >
          Forgot my Password</Link>
      </nav>
    </>

  )
}

export default SignUp