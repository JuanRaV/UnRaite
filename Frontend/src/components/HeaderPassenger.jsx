import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuthPassenger"


const Header = () => {
    const { signOffAuth } = useAuth()

    const handleSignOff = () => {
        signOffAuth()

        localStorage.removeItem('token')
    }

    return (
        <header className="px-4 py-5 bg-white border-b">
            <div className="md:flex md:justify-between">
                <h2 className="text-4xl text-indigo-600 font-black text-center mb-5 md:mb-0">
                    <Link to='/passenger' className="text-4xl text-indigo-300 font-black text-center">
                        Un<span className="text-indigo-600">Raite</span>
                        <span className="text-gray-400 text-sm flex flex-col">For Passengers</span>
                    </Link>
                </h2>
                <div className="flex flex-col md:flex-row items-center gap-4">
                    {/* <Link
                        to="/passenger/raite-history"
                    >
                        <button
                            type="button"
                            className="font-bold uppercase"

                        >
                            Raites Story
                        </button>
                    </Link> */}

                    <button
                        type="button"
                        onClick={handleSignOff}
                        className="text-white text-sm bg-indigo-600 p-3 rounded-md uppercase font-bold hover:bg-indigo-800"
                    >
                        Sign Off

                    </button>


                </div>

            </div>

        </header>
    )
}

export default Header