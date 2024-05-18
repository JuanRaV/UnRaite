import { Outlet, Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuthPassenger'
import HeaderPassenger from '../components/HeaderPassenger'

const ProtectedRoutePassenger = () => {
    const { auth, loading } = useAuth()
    // console.log(auth)
    if (loading) return 'Loading...'
    console.log(auth)
    return (
        <>
            
            {auth.passengerId? (
                <div className="bg-gray-100">
                    <HeaderPassenger /> 
                    <div className="md:flex md:min-h-screen">
                        
                        <main className="flex-1 p-10">
                            <Outlet />
                        </main>
                    </div>
                </div>
            ):(
                 <Navigate to="/" />
            )}
           
        </>

    )
}

export default ProtectedRoutePassenger