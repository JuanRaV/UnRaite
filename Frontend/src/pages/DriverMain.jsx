import { useEffect } from "react"
import useRaites from "../hooks/useRaites"
import Alert from "../components/Alert"
import RaitePreview from "../components/RaitePreview"

const DriverMain = () => {

    const {raites, alert} = useRaites()

    const {msg} = alert

    console.log(raites)
    return (
        <>
            <h1 className="text-4xl font-black">Raites</h1>
            {msg && <Alert alert={alert}/>}
            <div className="bg-white shadow mt-10 rounded-lg">
                {raites.length ?
                    raites.map(raite=>(
                        <RaitePreview
                            key={raite.id}
                            raite={raite}
                        />
                    ))
                    : <p className="p-5 text-center text-gray-600 uppercase font-bold">Start creating a <span className="text-indigo-300">Raite</span></p>
                }
            </div>
        </>
    )
}

export default DriverMain