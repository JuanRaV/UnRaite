import React from 'react'

const PassengerInfo = ({ passenger }) => {
  const { name, email, phoneNumber } = passenger.passenger
  return (
    <>
      <div className='border-b p-5 flex flex-col'>
        <h1>{name}</h1>
        <p>Email: {email}</p>
        <p>Phone Number: {phoneNumber}</p>
      </div>
    </>
  )
}

export default PassengerInfo