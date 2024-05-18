import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuthPassenger"

const RaitePreviewPassenger = ({raite}) => {
    const {auth} = useAuth()
    const {id, start, destination, date, startHour} = raite
  return (
    <div className="border-b p-5 flex flex-col md:flex-row justify-between">
    <div className=" flex items-center gap-2">
        <p className="  font-bold">
            From: <span className="font-normal">{start}</span>
        </p>
        <p className=" font-bold">
            To: <span className="font-normal">{destination}</span>
        </p>
        <p className=" font-bold">
            Date: <span className="font-normal">{date}</span>
        </p>
        <p className=" font-bold">
            Hour: <span className="font-normal">{startHour}</span>
        </p>

    </div>
    <div className="flex justify-center space-x-2">
        <Link
            to={`raite/${id}`}
            className="text-white uppercase text-sm font-bold bg-gray-600 rounded-lg p-1 hover:bg-gray-800"
        >
            See Raite</Link>
    </div>

</div>
  )
}

export default RaitePreviewPassenger