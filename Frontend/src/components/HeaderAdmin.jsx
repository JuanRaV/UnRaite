import {Link} from "react-router-dom"

const Header = () => {

    return (
        <header className="px-4 py-5 bg-white border-b">
            
                <h2 className="text-4xl text-indigo-600 font-black text-center mb-5">
                    <Link to='/raites/driver' className="text-4xl text-indigo-300 font-black text-center">
                        Un<span className="text-indigo-600">Raite </span>
                        <span className="text-gray-400 text-sm flex flex-col">For Admin</span>
                    </Link>
                </h2>

            

        </header>
    )
}

export default Header