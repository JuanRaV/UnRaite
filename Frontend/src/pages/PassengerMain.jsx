import useRaites from "../hooks/useRaitesPassenger"
import Alert from "../components/Alert"
import RaitePreviewPassenger from "../components/RaitePreviewPassenger"

const PassengerMain = () => {
  let {raites} = useRaites()
 
  raites = raites.allRaites
  
  console.log(raites)
  const {msg} = alert
  return (
    <>
    <h1 className="text-4xl font-black">All Raites Available</h1>
    {msg && <Alert alert={alert}/>}
    <div className="bg-white shadow mt-10 rounded-lg">
        {raites.length ?
            raites.map(raite=>(
                <RaitePreviewPassenger
                    key={raite.id}
                    raite={raite}
                />
            ))
            : <p className="p-5 text-center text-gray-600 uppercase font-bold">No <span className="text-indigo-300">Raites</span> Available</p>
        }
    </div>
</>
  )
}

export default PassengerMain