import { useEffect, useState } from "react";
import { useContext } from "react";
import useRaites from "../hooks/useRaitesPassenger";
import useAuth from "../hooks/useAuthPassenger";

const RideHistory = () => {
    const {auth} = useAuth()
    const {raites } = useRaites()
    const [raitesStory,setRaitesStory] = useState({})
    console.log(auth)
    useEffect(()=>{
        const raiteFilter = raites?.allRaites.filter(raite=>{
            if(raite.completed){
                raite.passengers.filter(passenger=>{
                    return passenger.passengerId==auth.passengerId
                })
            }
        })
        setRaitesStory(raiteFilter)
    },[])
    console.log(raitesStory)
    // useEffect(() => {
    //     fetchRideHistory();
    // }, []);

    return (
        <div>
            <h1 className="text-4xl font-black">Your Ride History</h1>
            <div className="bg-white shadow mt-10 rounded-lg">
                {/* {rideHistory.length ? (
                    rideHistory.map(raite => (
                        <div key={raite.id} className="border-b p-5 flex flex-col md:flex-row justify-between">
                            <div className="flex items-center gap-2 space-x-5">
                                <p className="font-bold">Start: <span className="font-normal">{raite.start}</span></p>
                                <p className="font-bold">Destination: <span className="font-normal">{raite.destination}</span></p>
                                <p className="font-bold">Date: <span className="font-normal">{raite.date}</span></p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="p-5 text-center text-gray-600 uppercase font-bold">No <span className="text-indigo-300">Rides</span> Found</p>
                )} */}
            </div>
        </div>
    );
};

export default RideHistory;
