import { useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { formateDate } from "../helpers/formateDate"
import useAuth from "../hooks/useAuth"
import useRaites from "../hooks/useRaites"
import PassengerInfo from "../components/PassengerInfo"
import Alert from "../components/Alert"

const RaiteInfo = () => {
    const { id } = useParams()
    const { raite, getRaite, completeRaite, deleteRaite, alert } = useRaites()

    useEffect(() => {
        getRaite(id)
    }, [])
    // console.log(raite)
    // raite.passengers.map(passenger=> console.log(passenger.passenger))
    // console.log(raite)
    const { msg } = alert
    return (
        <>
            {msg && <Alert alert={alert} />}
            <div className="flex justify-center ">
                <h2 className=" text-black  rounded-lg p-2 text-4xl font-bold">From: <span className="text-indigo-500">{raite.start}</span> </h2>
                <h2 className=" text-black  rounded-lg p-2 text-4xl font-bold mx-3">To: <span className="text-indigo-500">{raite.destination}</span> </h2>
            </div>

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
                <p className="text-xl font-bold text-gray-600">Hour: <span className="text-indigo-400">{raite?.startHour}</span></p>
            </div>
            <div className="mt-3 text-center flex justify-center ">
                <p className="text-xl font-bold mx-5 text-gray-600">Capacity: <span className="text-indigo-400">{raite.capacity}</span></p>
                <p className="text-xl font-bold text-gray-600">Status: {raite.completed ? <span className="text-green-500">Completed</span> : <span className="text-yellow-500">In Progress</span>}</p>
                <p className="text-xl font-bold mx-5 text-gray-600">Price: <span className="text-green-400">${raite.price}</span></p>
            </div>
            <div className="bg-white shadow mt-3 rounded-lg">
                {raite.passengers?.length ?
                    raite.passengers?.map(passenger => (
                        <PassengerInfo
                            key={passenger.passengerId}
                            passenger={passenger.passenger}
                            raite={raite}
                        />
                    )) : <p className="font-bold text-3xl text-center bg-gray-100 py-3">No Passengers for this Raite</p>
                }
            </div>

            <div className="flex flex-col lg:flex-row gap-2 mt-10 justify-center md:text-center">

                {raite.completed ? (
                    <input type="hidden" />
                ) : (
                    <>
                        <div className="flex items-center gap-2 text-white font-bold rounded-lg px-3 hover:text-black bg-yellow-500 md:py-3 text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                            </svg>
                            <Link to={`/driver/edit/${id}`} className="text-center">Edit</Link>
                        </div>
                        <button
                            className={`${raite.completed ? 'bg-yellow-500 hover:text-black' : 'bg-green-500  hover:text-black'} px-4 py-3 text-white uppercase font-bold text-sm rounded-lg`}
                            onClick={() => completeRaite(raite.id)}
                        >
                            {raite.completed ? 'Incomplete' : 'Complete'}
                        </button>
                        <button
                            className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg hover:text-black cursor-pointer"
                            onClick={() => deleteRaite(raite.id)}
                        >
                            Cancel Raite
                        </button>
                    </>

                )}


            </div >
        </>
    )
}

export default RaiteInfo