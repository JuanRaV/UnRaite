import { useState } from "react"
import { Link } from "react-router-dom"
import Alert from '../components/Alert'
import axiosClient from "../config/axiosClient"

const SignUp = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [idFront, setIdFront] = useState(null)
  const [idBack, setIdBack] = useState(null)
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

    // Validate file type (optional)
    if (!selectedFile.type.match('image/*')) {
      <Alert alert="Invalid file type. Please select an image."/>
      return;
    }
    setIdFront(selectedFile);
  };
  const handleBackImageChange = (event) => {
    const selectedFile = event.target.files[0];
    // Check if a file is actually selected
    if (!selectedFile) return;

    // Validate file type (optional)
    if (!selectedFile.type.match('image/*')) {
      setAlert({
        msg: "Invalid file type. Please select an image.",
        error: true
      })
      return;
    }
    setIdBack(selectedFile);
  };
  const handleSubmit = e => {
    e.preventDefault()
    if ([name, email, phoneNumber, idFront, idBack, password, repeatPassword].includes('')) {
      setAlert({
        msg: "All filed are required",
        error: true
      })
      alertDisapears()
      return
    }
  }

  const { msg } = alert

  return (
    <>
      <h1 className="text-indigo-400 font-black text-6xl capitalize">Create an Account & Start Booking <span className="text-indigo-600">Raites</span></h1>
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
            placeholder="1133552244"
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
      </form>
    </>

  )
}

export default SignUp