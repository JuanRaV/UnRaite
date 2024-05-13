import { useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { formateDate } from "../helpers/formateDate"
import useAuth from "../hooks/useAuth"
import useRaites from "../hooks/useRaites"
import PassengerInfo from "../components/PassengerInfo"

const RaiteInfo = () => {
    const { id } = useParams()
    const { raite, getRaite, handleModalEditRaite } = useRaites()

    useEffect(() => {
        getRaite(id)
    }, [])

    // raite.passengers.map(passenger=> console.log(passenger.passenger))
    console.log(raite)
    return (
        <>
            <div className="flex justify-center ">
                <h2 className=" text-black  rounded-lg p-2 text-4xl font-bold">From: <span className="text-indigo-500">{raite.start}</span> </h2>
                <h2 className=" text-black  rounded-lg p-2 text-4xl font-bold mx-3">To: <span className="text-indigo-500">{raite.destination}</span> </h2>
            </div>
            {/* TODO:Add Styles */}
            <div className="flex justify-center mt-5">
                {raite.startingPoint && (

                    <>
                        <p className="text-gray-600  rounded-lg p-2 text-2xl font-bold mx-3">Starting Point: <span className="text-indigo-400">{raite.startingPoint}</span> </p>

                    </>
                )}
                {raite.arrivalPoint && (
                    <>
                        <p className="text-gray-600  rounded-lg p-2 text-2xl font-bold">Arrival Point: <span className="text-indigo-400">{raite.arrivalPoint}</span> </p>
                    </>
                )}
            </div>
            <div className="mt-3 text-center flex justify-center ">
                <p className="text-xl font-bold mx-5 text-gray-600">Date: <span className="text-indigo-400">{formateDate(raite.date)}</span></p>
                <p className="text-xl font-bold text-gray-600">Hour: <span className="text-indigo-400">{ raite.startHour?.slice(11,16)}</span></p>
            </div>
            <div className="mt-3 text-center flex justify-center ">
                <p className="text-xl font-bold mx-5 text-gray-600">Capacity: <span className="text-indigo-400">{raite.capacity}</span></p>
                <p className="text-xl font-bold text-gray-600">Status: {raite.completed ? <span className="text-green-500">Completed</span>:<span className="text-yellow-500">In Progress</span>}</p>
            </div>
            <div className="bg-white shadow mt-3 rounded-lg">
                {raite.passengers?.length ?
                    raite.passengers?.map(passenger => (
                        <PassengerInfo
                            key={passenger.passengerId}
                            passenger={passenger.passenger}
                        />
                     )) : <p>No Passengers for this Raite</p>
                }
            </div>

            <div className="flex flex-col lg:flex-row gap-2 mt-10">
                <button 
                    className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg hover:bg-indigo-800 cursor-pointer"
                    onClick={()=>handleModalEditRaite(raite)}
                >
                    Edit Raite
                </button>
                <button 
                    className={ `${raite.completed? 'bg-green-500 hover:bg-green-700':'bg-yellow-500 hover:bg-yellow-700'} px-4 py-3 text-white uppercase font-bold text-sm rounded-lg`}
                    // onClick={()=>completeRaite(raite.id)}
                >
                    {raite.completed?'Complete' : 'Incomplete'}
                </button>
                <button 
                    className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg hover:bg-red-800 cursor-pointer"
                    // onClick={()=>handleModalDeleteRaite(raite)}
                >
                    Cancel Raite
                </button>
            </div>
        </>
    )
}

export default RaiteInfo