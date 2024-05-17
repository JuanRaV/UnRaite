import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const Sidebar = () => {
    const {auth} = useAuth()
  return (
    <aside className="md:w-1/3 ld:w-1/5 xl:w-1/6 px-5 py-10">
        <p className="text-xl font-bold text-center text-gray-400">
            Welcome back, <span className="text-gray-500">{auth.name}</span>
        </p>
        <Link
            to='driver/create-raite'
            className="bg-indigo-600 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg hover:bg-indigo-800"
        >
            Create Raite
        </Link>
    </aside>
  )
}

export default Sidebar