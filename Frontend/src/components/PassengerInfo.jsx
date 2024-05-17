import React from 'react'

const PassengerInfo = ({ passenger }) => {
  const { name, email, phoneNumber } = passenger
  return (
    <div className="border-b p-5 flex flex-col md:flex-row justify-between">
      <div className="flex items-center gap-2 space-x-5">
        <p className="  font-bold">
          Name: <span className="font-normal">{name}</span>
        </p>
        <p className=" font-bold">
          Email: <span className="font-normal">{email}</span>
        </p>
        <p className=" font-bold">
          Phone Number: <span className="font-normal">{phoneNumber}</span>
        </p>
      </div>
      <button className='bg-red-700 p-2 rounded-lg text-white hover:bg-red-900'>
        Report
      </button>
    </div>
  )
}

export default PassengerInfo