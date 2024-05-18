import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuthDriver"


const Header = () => {
    const {signOffAuth} = useAuth()

    const handleSignOff = () =>{
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
                <button
                    type="button"
                    className="font-bold uppercase"
                    
                >
                    Raites Story
                </button>
                

            </div>

        </div>

    </header>
  )
}

export default Header