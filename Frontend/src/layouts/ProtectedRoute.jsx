import { Outlet, Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const ProtectedRoute = () => {
    const { auth, loading } = useAuth()
    console.log(auth)
    if (loading) return 'Loading...'

    return (
        <>
            {auth.driverId || auth.passengerId ? (
                <div>ProtectedRoute</div>
            ) : <Navigate to='/'/>}
        </>
    )
}

export default ProtectedRoute