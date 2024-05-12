import { BrowserRouter, Routes, Route } from 'react-router-dom'

import AuthLayout from './layouts/AuthLayout'
import ProtectedRoute from './layouts/ProtectedRoute'

import LogIn from './pages/LogIn'
import SignUp from './pages/SignUp'
import PassengerSignUp from './pages/PassengerSignUp'
import DriverSignUp from './pages/DriverSignUp'
import DriverMain from './pages/DriverMain'
import PassengerMain from './pages/PassengerMain'

import { AuthProvider } from './context/AuthProvider'


const App = ()=> {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Area */}
          <Route path='/' element={<AuthLayout/>}>
              <Route index element={<LogIn/>}/>
              <Route path='signUp' element={<SignUp/>}/>
              <Route path='signUp/passenger' element={<PassengerSignUp/>}/>
              <Route path='signUp/driver' element={<DriverSignUp/>}/>
          </Route>

          {/* Private Area */}
          <Route path='/raites' element={<ProtectedRoute/>}>
            <Route path='passenger' element={<PassengerMain/>}/>
            <Route path='driver' element={<DriverMain/>}/>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
