import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import useRaites from "../hooks/useRaites"
import Alert from "./Alert"
import axiosClient from "../config/axiosClient"

const RaiteForm = () => {
    // /towns/get-towns
    const [idUpdate, setIdUpdate] = useState(null)
    const [start, setStart] = useState("")
    const [destination, setDestination] = useState("")
    const [option, setOption] = useState("")
    const [startHour, setStartHour] = useState("")
    const [date, setDate] = useState("")
    const [capacity, setCapacity] = useState("")
    const [completed, setCompleted] = useState(false)
    const [price, setPrice] = useState(0)
    const [towns, setTowns] = useState([])
    const [startingPoint, setStartingPoint] = useState("")
    const [arrivalPoint, setArrivalPoint] = useState("")
    // const selectedOption = ''

    const { id } = useParams()
    // console.log(start)
    // console.log(price)
    const { showAlert, alert, submitRaite, raite } = useRaites()
    useEffect(() => {
        const fetchTowns = async () => {
            try {
                const { data } = await axiosClient.get('/towns/get-towns')
                setTowns(data)
            } catch (error) {
                console.log(error)
            }
        }
        
        fetchTowns()
    }, [])

    useEffect(()=>{
        if(id){
            setIdUpdate(raite.id)
            setStart(raite.start)
            setDestination(raite.destination)
            setDate(raite.date.split('T')[0])
            setPrice(raite?.price)
            setCapacity(raite.capacity)
            setCompleted(raite.completed)
            setStartHour(raite.startHour)
            setStartingPoint(raite.startingPoint)
            setArrivalPoint(raite.arrivalPoint)
        }
    },[id])

    if(start!=="Guadalajara"){
        useEffect(()=>{
            console.log("Start", start);                        
            const matchingTown = towns.find(townActual => townActual.townName === start);
            console.log("matching town", matchingTown);
            setPrice(matchingTown?.price || 0); // Reset and update price
        },[start])
    }

    else if(start=="Guadalajara"){
        useEffect(()=>{
            console.log("Start", destination);                        
            const matchingTown = towns.find(townActual => townActual.townName === destination);
            console.log("matching town", matchingTown);
            setPrice(matchingTown?.price || 0); // Reset and update price
        },[destination])
    }
    else{
        console.log("Todo bien")
    }
    // useEffect(()=>{
    //     if(id && raite.start){
    //         setIdUpdate()
    //     }
    // },[id])

    const handleSubmit = async e => {
        e.preventDefault()
        if ([startHour, date, capacity, startingPoint, arrivalPoint].includes('')) {
            showAlert({
                msg: 'All fields are required',
                error: true
            })
            return
        }
        else if (capacity > 4) {
            showAlert({
                msg: 'The max capacity is 4',
                error: true
            })
            return
        }
        else if (capacity <= 0) {
            showAlert({
                msg: 'Choose a valid capacity',
                error: true
            })
            return
        }
        
        // Pass data to the provider
        const intCapacity = parseInt(capacity)
        const intPrice = parseInt(price)
        await submitRaite({id:idUpdate,startHour,date, start, startingPoint, destination, arrivalPoint, capacity:intCapacity,price:intPrice})
        setIdUpdate(null)
        setStartHour("")
        setDate("")
        setStart("")
        setStartingPoint("")
        setDestination("")
        setArrivalPoint("")
        setCapacity("")
        setPrice("")
    }

    
    
    const { msg } = alert
    return (
        <form
            className="bg-white py-10 px-5 md:w-1/2 lg:w-3/5 rounded-lg shadow"
            onSubmit={handleSubmit}
        >
            {msg && <Alert alert={alert} />}
            <div className=" text-center">
                <h2 className="font-bold text-xl uppercase text-center mb-5">Are you  going or leaving to GDL?</h2>
                <label className="mx-5 text-indigo-500 font-bold text-xl">
                    <input
                        type="radio"
                        name="travelOption"
                        className=""
                        value="voy"
                        onChange={e => setOption(e.target.value)}
                    />
                    Going
                </label>

                <label className="text-indigo-500 font-bold text-xl">
                    <input
                        type="radio"
                        name="travelOption"
                        className=""
                        value="salgo"
                        onChange={e => setOption(e.target.value)}
                    />
                    Leaving
                </label>
            </div>

            <div className="flex justify-between mt-5">
                {option == "voy" ? (
                    <>
                        
                        <div>
                            <p className="text-gray-700 uppercase font-bold text-sm mt-5 text-center">Select Your Origin</p>
                            {/* {setStart(e.target.value.townName);setPrice(e.target.value.price)} */}
                            <select onChange={ (e) => { 
                                    setDestination("Guadalajara")
                                    setStart(e.target.value);
                                    console.log(start)
                                }}
                                className="mb-5 border p-1 rounded-lg">
                                {towns.map(town => (

                                    <option key={town.id} value={town.name}>
                                        {town.townName}
                                    </option>

                                ))}
                            </select>
                        </div>
                    </>

                ) : (
                    <>
                        
                        <div>
                            <p className="text-gray-700 uppercase font-bold text-sm mt-5 text-center">Select your Destination</p>
                            <select 
                                  onChange={(e) => {
                                    
                                    console.log(e.target.value)
                                    setDestination(e.target.value);
                                    setStart("Guadalajara")
                                  }}
                            className="mb-5 border p-1 rounded-lg">
                                {towns.map(town => (
                                    <option key={town.id} value={town.townName}>
                                        {town.townName}
                                    </option>
                                ))}
                            </select>

                        </div>
                    </>
                )}
                <div>
                    <p className="text-gray-700 uppercase font-bold text-sm mt-5">Price</p>
                    <p>{price}</p>
                </div>
            </div>

            <div className="mb-5">
                <label htmlFor="capacity" className="text-gray-700 uppercase font-bold text-sm">Capacity</label>
                <input
                    id="capacity"
                    type="number"
                    className="border w-full p-2 mt-2 placeholder:gray-400 rounded-md"
                    placeholder="Ex. 5"
                    value={capacity}
                    onChange={e => setCapacity(e.target.value)}
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
                    onChange={e => setDate(e.target.value)}
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
                    onChange={e => setStartHour(e.target.value)}
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
                    onChange={e => setStartingPoint(e.target.value)}
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
                    onChange={e => setArrivalPoint(e.target.value)}
                />
            </div>
            <input
                type="submit"
                value={idUpdate ? 'Update Raite' : 'Create Raite'}
                className="bg-indigo-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-indigo-800 transition-colors"

            />
        </form>
    )
}

export default RaiteForm