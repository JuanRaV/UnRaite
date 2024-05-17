import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const RaitePreview = ({ raite }) => {
    const { auth } = useAuth()
    const { id, start, destination, completed } = raite
    return (
        <div className="border-b p-5 flex flex-col md:flex-row justify-between">
            <div className="flex items-center gap-2">
                <p className="  font-bold">
                    From: <span className="font-normal">{start}</span>
                </p>
                <p className=" font-bold">
                    To: <span className="font-normal">{destination}</span>
                </p>
                {completed == true ? (
                    <p className="p-1 text-xs rounded-lg text-white bg-green-500 font-bold uppercase">
                        Completed
                    </p>
                ) : (
                    <p className="p-1 text-xs rounded-lg text-white bg-yellow-500 font-bold uppercase">
                        In Progress
                    </p>
                )
                }
            </div>
            <Link
                to={`${id}`}
                className="text-white uppercase text-sm font-bold bg-gray-600 rounded-lg p-1 hover:bg-gray-800"
            >
            See Raite</Link>
        </div>
    )
}

export default RaitePreview