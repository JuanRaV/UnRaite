import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import useRaites from "../hooks/useRaites"
import Alert from "./Alert"

const RaiteForm = () => {

    const [idUpdate, setIdUpdate] = useState(null)
    const [start,setStart] = useState("")
    const [destination, setDestination] = useState("")
    const [startHour, setStartHour] = useState("")
    const [date,setDate] = useState("")
    const [capacity, setCapacity] = useState("")
    const [price, setPrice] = useState("")
    const [startingPoint, setStartingPoint] = useState("")
    const [arrivalPoint, setArrivalPoint] = useState("")

    const {id} = useParams()

    const {showAlert, alert, submitRaite, raite} = useRaites()

    const handleSubmit = e =>{
        e.preventDefault()
    }

    const {msg} = alert
  return (
    <form 
        className="bg-white py-10 px-5 md:w-1/2 lg:w-3/5 rounded-lg shadow"
        onSubmit={handleSubmit}
    >
        {msg && <Alert alert={alert}/>}
        <div className="mb-5">
            <label htmlFor="capacity" className="text-gray-700 uppercase font-bold text-sm">Capacity</label>
            <input 
                id="capacity"
                type="number" 
                className="border w-full p-2 mt-2 placeholder:gray-400 rounded-md"
                placeholder="Ex. 5"
                value={capacity}
                onChange={e=>setCapacity(e.target.value)}
            />
        </div>

        <div className="mb-5">
            <label htmlFor="date" className="text-gray-700 uppercase font-bold text-sm">Date</label>
            <input 
                id="date"
                type="date" 
                className="border w-full p-2 mt-2 placeholder:gray-400 rounded-md"
                placeholder="Ex. Andares"
                value={date}
                onChange={e=>setDate(e.target.value)}
            />
        </div>
        <div className="mb-5">
            <label htmlFor="hour" className="text-gray-700 uppercase font-bold text-sm">Hour</label>
            <input 
                id="hour"
                type="time" 
                className="border w-full p-2 mt-2 placeholder:gray-400 rounded-md"
                placeholder="Ex. Andares"
                value={startHour}
                onChange={e=>setStartHour(e.target.value)}
            />
        </div>
        <div className="mb-5">
            <label htmlFor="startingPoint" className="text-gray-700 uppercase font-bold text-sm">Starting Point</label>
            <input 
                id="startingPoint"
                type="text" 
                className="border w-full p-2 mt-2 placeholder:gray-400 rounded-md"
                placeholder="Ex. Plaza de Armas"
                value={startingPoint}
                onChange={e=>setStartingPoint(e.target.value)}
            />
        </div>

        <div className="mb-5">
            <label htmlFor="arrivalPoint" className="text-gray-700 uppercase font-bold text-sm">Starting Point</label>
            <input 
                id="arrivalPoint"
                type="text" 
                className="border w-full p-2 mt-2 placeholder:gray-400 rounded-md"
                placeholder="Ex. Andares"
                value={arrivalPoint}
                onChange={e=>setArrivalPoint(e.target.value)}
            />
        </div>

    </form>
  )
}

export default RaiteForm