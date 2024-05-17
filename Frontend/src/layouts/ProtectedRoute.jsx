import { Outlet, Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import HeaderPassenger from '../components/HeaderPassenger'
import HeaderDriver from '../components/HeaderDriver'
import Sidebar from '../components/Sidebar'

const ProtectedRoute = () => {
    const { auth, loading } = useAuth()
    // console.log(auth)
    if (loading) return 'Loading...'

    return (
        <>
            
            {auth.driverId && (
                <div className="bg-gray-100">
                    <HeaderDriver /> 
                    <div className="md:flex md:min-h-screen">
                        <Sidebar/>
                        <main className="flex-1 p-10">
                            <Outlet />
                        </main>
                    </div>
                </div>
            )}
            {auth.passengerId && (
                <div className="bg-gray-100">
                    <HeaderPassenger />
                    <div className="md:flex md:min-h-screen">
                        <main className="flex-1 p-10">
                            <Outlet />
                        </main>
                    </div>
                </div>
            )}


            {!auth.passengerId && !auth.driverId && <Navigate to="/" />}
        </>

    )
}

export default ProtectedRoute