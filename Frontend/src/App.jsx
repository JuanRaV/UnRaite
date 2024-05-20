import { BrowserRouter, Routes, Route } from 'react-router-dom'

import AuthLayout from './layouts/AuthLayout'
import ProtectedRouteDriver from './layouts/ProtectedRouteDriver'
import ProtectedRoutePassenger from './layouts/ProtectedRoutePassenger'



import Main from './pages/Main'
import PassengerLogIn from './pages/PassengerLogIn'
import DriverLogIn from './pages/DriverLogIn'
import PassengerSignUp from './pages/PassengerSignUp'
import DriverSignUp from './pages/DriverSignUp'
import DriverMain from './pages/DriverMain'
import PassengerMain from './pages/PassengerMain'
import RaiteInfo from './pages/RaiteInfo'
import CreateRaite from './pages/CreateRaite'
import EditRaite from './pages/EditRaite'
import DriverForgotPassword from './pages/DriverForgotPassword'
import DriverNewPassword from './pages/DriverNewPassword'
import PassengerForgotPassword from './pages/PassengerForgotPassword'
import PassengerNewPassword from './pages/PassengerNewPassword'
import RaiteInfoPassenger from './components/RaiteInfoPassenger'
import UserInfo from './pages/Admin'

import { DriverAuthProvider } from './context/DriverAuthProvider'
import { PassengerAuthProvider } from './context/PassengerAuthProvider'
import { RaitesDriverProvider } from './context/RaitesDriverProvider'
import { RaitesPassengerProvider } from './context/RaitesPassengerProvider'


const App = () => {

  return (
    <BrowserRouter>
      <DriverAuthProvider>
        <PassengerAuthProvider>
          <RaitesDriverProvider>
            <RaitesPassengerProvider>
              <Routes>
                {/* Public Area */}
                <Route path='/' element={<AuthLayout />}>
                  <Route index element={<Main />} />
                  <Route path='login/passenger' element={<PassengerLogIn />} />
                  <Route path='login/driver' element={<DriverLogIn />} />
                  <Route path='signUp/passenger' element={<PassengerSignUp />} />
                  <Route path='signUp/driver' element={<DriverSignUp />} />
                  <Route path='forgotPassword/driver' element={<DriverForgotPassword />} />
                  <Route path='forgotPassword/passenger' element={<PassengerForgotPassword />} />
                  <Route path='newPassword/passenger/:token' element={<PassengerNewPassword />} />
                  <Route path='newPassword/driver/:token' element={<DriverNewPassword />} />
                  <Route path='admin' element={<UserInfo />} />
                </Route>

                {/* Private Area for DRIVERS*/}
                <Route path='/driver' element={<ProtectedRouteDriver />}>
                  <Route index element={<DriverMain />} />
                  <Route path='create-raite' element={<CreateRaite />} />
                  <Route path='raite/:id' element={<RaiteInfo />} />
                  <Route path='edit/:id' element={<EditRaite />} />
                </Route>

                {/* Private area for PASSENGERS */}
                <Route path='/passenger' element={<ProtectedRoutePassenger />}>
                  <Route index element={<PassengerMain />} />
                  <Route path='raite/:id' element={<RaiteInfoPassenger />} />
                </Route>
              </Routes>
            </RaitesPassengerProvider>
          </RaitesDriverProvider>
        </PassengerAuthProvider>
      </DriverAuthProvider>
    </BrowserRouter>
  )
}

export default App
