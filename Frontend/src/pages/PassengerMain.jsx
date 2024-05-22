import { useEffect, useState } from "react"
import axiosClient from "../config/axiosClient"
import useRaites from "../hooks/useRaitesPassenger"
import useAuth from "../hooks/useAuthPassenger"
import Alert from "../components/Alert"
import RaitePreviewPassenger from "../components/RaitePreviewPassenger"

const PassengerMain = () => {
    let { raites } = useRaites()
    const { auth } = useAuth()
    const [towns, setTowns] = useState([])
    const [raitesFilter, setRaitesFilter] = useState([])
    const [option, setOption] = useState("")
    const [start, setStart] = useState("")
    const [destination, setDestination] = useState("")
    const [currentRaite, setCurrentRaite] = useState({})
    raites = raites.allRaites
    console.log(auth.raite[0]?.raiteId)
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

    useEffect(() => {
        const raitesFiltrados = raites?.filter(raite => {
            return raite.start == start && raite.destination == destination
        })
        setRaitesFilter(raitesFiltrados)
    }, [start, destination])
    console.log( auth.raite[0]?.raiteId)
    // console.log(raites)
    useEffect(() => {
        const getCurrentRaite = () => {
            const currentId = auth.raite[0]?.raiteId
            const currentRaite =  raites?.filter(raite => {
                return raite.id == currentId
            })
            setCurrentRaite(currentRaite)
        }
        getCurrentRaite()
    }, [])
    if(currentRaite?.length)
        console.log(currentRaite[0])


    const seeAll = () => {
        setStart("")
        setDestination("")
    }
    console.log(raitesFilter)
    // console.log("start", start)
    // console.log("destination", destination)
    // console.log(raites)
    const { msg } = alert
    return (
        <>
            <h1 className="text-3xl font-bold mt-0 mb-2">Are you  going or leaving to GDL?</h1>
            {msg && <Alert alert={alert} />}
            <div className=" flex text-center">
                <div className="  text-center">
                    {/* <h2 className="font-bold text-xl uppercase text-center mb-2 mt-5">Are you  going or leaving to GDL?</h2> */}
                    <label className="mx-5 text-indigo-500 font-bold text-xl">
                        <input
                            type="radio"
                            name="travelOption"
                            className=""
                            value="all"
                            onChange={seeAll}
                        />
                        See all
                    </label>

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

                    <div className="flex-col justify-center mt-3">
                        {option == "voy" ? (
                            <>

                                <div>
                                    <p className="text-gray-700 uppercase font-bold text-sm mt-5 text-center">Select Your Origin</p>
                                    {/* {setStart(e.target.value.townName);setPrice(e.target.value.price)} */}
                                    <select onChange={(e) => {
                                        setDestination("Guadalajara")
                                        setStart(e.target.value);
                                        // console.log(start)
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

                                            // console.log(e.target.value)
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
                {start || destination ? (
                    <div className="flex flex-col w-1/2 justify-center">
                        <h2 className="text-gray-700 uppercase font-bold text-xl mt-5">From: <span className="text-indigo-500">{start}</span></h2>
                        <h2 className="text-gray-700 uppercase font-bold text-xl mt-5">To: <span className="text-indigo-500">{destination}</span></h2>
                    </div>
                ) : (
                    <input type="hidden"/>
                )}


            </div>
            <h2 className="text-gray-700 uppercase font-bold text-xl mt-5">Current Raite</h2>
            <div className="bg-white shadow mt-3 rounded-lg">
                {currentRaite?.length ? (
                    <RaitePreviewPassenger
                        key={currentRaite[0]?.id}
                        raite={currentRaite[0]}

                    />
                ) : (
                    <p className="p-5 text-center text-gray-600 uppercase font-bold">No <span className="text-indigo-300">Raites</span> Reserved</p>
                )}
            </div>
            <h2 className="text-gray-700 uppercase font-bold text-xl mt-8">Other Raites</h2>
            <div className="bg-white shadow mt-3 rounded-lg">
                {raitesFilter?.length ?
                    raitesFilter.map(raite => (
                        <RaitePreviewPassenger
                            key={raite.id}
                            raite={raite}
                            origin={origin}
                            destination={destination}
                        />
                    ))
                    : raitesFilter?.length == 0 && start != "" ? (
                        <p className="p-5 text-center text-gray-600 uppercase font-bold">No <span className="text-indigo-300">Raites</span> Available</p>
                    )
                        : raites?.length ?
                            raites.map(raite => (
                                <RaitePreviewPassenger
                                    key={raite.id}
                                    raite={raite}
                                    origin={origin}
                                    destination={destination}
                                />
                            )) : <p className="p-5 text-center text-gray-600 uppercase font-bold">No <span className="text-indigo-300">Raites</span> Available</p>
                }
            </div>
        </>
    )
}

export default PassengerMain