import { useEffect, useState } from "react"
import axiosClient from "../config/axiosClient"
import useRaites from "../hooks/useRaitesPassenger"
import Alert from "../components/Alert"
import RaitePreviewPassenger from "../components/RaitePreviewPassenger"

const PassengerMain = () => {
    let { raites } = useRaites()
    const [towns, setTowns] = useState([])
    const [raitesFilter, setRaitesFilter] = useState([])
    const [option, setOption] = useState("")
    const [start, setStart] = useState("")
    const [destination, setDestination] = useState("")
    raites = raites.allRaites
    console.log(raites)
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
        const raitesFiltrados = raites.map(raite=>{
            // return raite.start == start && raite.destination==destination
            if(raite.start == start && raite.destination==destination)
                console.log("Hay match")
            else
                console.log("No hay match")
        })
        setRaitesFilter(raitesFiltrados)

        console.log(`Found ${raitesFiltrados?.length} matching raites`);
    },[])

    console.log(raitesFilter)
    // console.log("start", start)
    // console.log("destination", destination)
    // console.log(raites)
    const { msg } = alert
    return (
        <>
            <h1 className="text-4xl font-black">All Raites Available</h1>
            {msg && <Alert alert={alert} />}
            <div className=" text-center">
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

                <div className="flex justify-center mt-5">
                    {option == "voy" ? (
                        <>

                            <div>
                                <p className="text-gray-700 uppercase font-bold text-sm mt-5 text-center">Select Your Origin</p>
                                {/* {setStart(e.target.value.townName);setPrice(e.target.value.price)} */}
                                <select onChange={(e) => {
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
                </div>

            </div>
            <div className="bg-white shadow mt-10 rounded-lg">
                {raites.length ?
                    raites.map(raite => (
                        <RaitePreviewPassenger
                            key={raite.id}
                            raite={raite}
                            origin={origin}
                            destination={destination}
                        />
                    ))
                    : <p className="p-5 text-center text-gray-600 uppercase font-bold">No <span className="text-indigo-300">Raites</span> Available</p>
                }
            </div>
        </>
    )
}

export default PassengerMain