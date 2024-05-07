import { BrowserRouter, Routes, Route } from 'react-router-dom'

import AuthLayout from './layouts/AuthLayout'

import PassengerSignUp from './pages/PassengerSignUp'

import { AuthProvider } from './context/AuthProvider'


const App = ()=> {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Area */}
          <Route path='/' element={<AuthLayout/>}>
              <Route path='passenger-signup' element={<PassengerSignUp/>}/>
              {/* <Route path='login' element={<LogIn/>}/> */}
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
