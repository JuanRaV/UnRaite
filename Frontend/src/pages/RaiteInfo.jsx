import { useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import useRaites from "../hooks/useRaites"
import PassengerInfo from "../components/PassengerInfo"

const RaiteInfo = () => {
    const { id } = useParams()
    const { raite, getRaite } = useRaites()

    useEffect(() => {
        getRaite(id)
    }, [])

    raite.passengers.map(passenger=> console.log(passenger))
    // console.log()
    return (
        <>
            <div className="flex justify-center ">
                <h2 className=" text-white bg-slate-500 rounded-lg p-2 text-4xl font-bold">From: <span className="font-normal">{raite.start}</span> </h2>
                <h2 className=" text-white bg-slate-500 rounded-lg p-2 text-4xl font-bold mx-3">To: <span className="font-normal">{raite.destination}</span> </h2>
            </div>

            <div className="flex justify-center mt-10">
                {raite.startingPoint && (

                    <>
                        <p className="mx-3">Starting Point: {raite.startingPoint}</p>

                    </>
                )}
                {raite.arrivalPoint && (
                    <>
                        <p className="">Arrival Point: {raite.arrivalPoint}</p>
                    </>
                )}
            </div>

            <div className="mt-10 text-center">
                <p>Capacity: {raite.capacity}</p>
            </div>
            <div className="flex justify-center bg--white shadow mt-10 rounded-lg">
                {raite.passengers?.length ?
                    raite.passengers?.map(passenger => (
                        <PassengerInfo
                            key={passenger.passengerId}
                            passenger={passenger}
                        />
                     )) : <p>No Passengers for this Raite</p>
                }
            </div>
        </>
    )
}

export default RaiteInfo