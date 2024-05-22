import { useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { formateDate } from "../helpers/formateDate"
import useRaites from "../hooks/useRaitesPassenger"
import useAuth from "../hooks/useAuthPassenger"
import PassengerInfoP from "./PassengerInfoP"
import Alert from "./Alert"

const RaiteInfoPassenger = () => {

  const { id } = useParams()
  const { raite, getRaite, alert, reserveRaite, cancelReservation, reportDriver } = useRaites()
  const { auth } = useAuth()

  useEffect(() => {
    getRaite(id)
  }, [auth])

  // console.log(raite.driver.driverId)

  const passengerInCurrentRaite = () => {
    // Check if raite.passengers and auth.passengerId exist to avoid potential errors
    if (!raite.passengers || !auth.passengerId) {
      return false; // Or return null or any default value if necessary
    }

    // Use find() to find the matching passenger efficiently
    return raite.passengers.find(passenger => passenger.passengerId === auth.passengerId);
  };

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
        <p className="text-xl font-bold mx-5 text-gray-600">Total Price: <span className="text-green-400">${raite.price}</span>  </p>
        <p className=" text-gray-600 text-center text-xs">Divide this between total people travelling</p>
      </div>
      <p className="text-2xl font-bold mx-5 text-gray-600 text-center mt-3">Driver </p>
      <div className="bg-white shadow mt-3 rounded-lg ">

        <div className="border-b p-5 flex flex-col md:flex-row justify-between">
          <div className="flex items-center gap-2 space-x-5">
            <p className="  font-bold">
              Name: <span className="font-normal">{raite.driver?.name}</span>
            </p>
            <p className=" font-bold">
              Email: <span className="font-normal">{raite.driver?.email}</span>
            </p>
            <p className=" font-bold">
              Phone Number: <span className="font-normal">{raite.driver?.phoneNumber}</span>
            </p>
            {passengerInCurrentRaite() && (
              <button className='bg-red-600 p-2 rounded-lg text-white hover:bg-red-800'
                onClick={() => reportDriver(raite.driver?.driverId, id)}
              >
                Report
              </button>
            )}

          </div>
        </div>
      </div>
      <p className="text-2xl font-bold mx-5 text-gray-600 text-center mt-3">Passengers </p>
      <div className="bg-white shadow mt-3 rounded-lg ">

        {raite.passengers?.length ?
          raite.passengers?.map(passenger => (
            <PassengerInfoP
              key={passenger.passengerId}
              passenger={passenger.passenger}
              raite={raite}
            />
          )) : <p className="font-bold text-3xl text-center bg-gray-100 py-3">No Passengers for this Raite</p>
        }
      </div>

      <div className="flex flex-col lg:flex-row gap-2 mt-10 justify-center md:text-center">

        {passengerInCurrentRaite() ? (
          <button
            className={`${raite.completed ? 'bg-yellow-500 hover:text-black' : 'bg-red-500  hover:text-black'} px-4 py-3 text-white uppercase font-bold text-sm rounded-lg`}
            onClick={() => cancelReservation(raite.id)}
          >
            Cancel Raite
          </button>
        ) : (
          <>
            <button
              className={`${raite.completed ? 'bg-yellow-500 hover:text-black' : 'bg-green-500  hover:text-black'} px-4 py-3 text-white uppercase font-bold text-sm rounded-lg`}
              onClick={() => reserveRaite(raite.id)}
            >
              Reserve Raite
            </button>
          </>

        )}


      </div >
    </>
  )
}

export default RaiteInfoPassenger