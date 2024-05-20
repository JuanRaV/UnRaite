import React from 'react';

const PassengerInfo = ({ passenger }) => {
  const { name, email, phoneNumber, passengerId, frontStudentCredential, backStudentCredential } = passenger;
 

  return (
    <div className="border-b p-5 flex flex-col md:flex-row justify-between">
      <div className="flex items-center gap-2 space-x-5">
        <p className="font-bold">Name: <span className="font-normal">{name}</span></p>
        <p className="font-bold">Email: <span className="font-normal">{email}</span></p>
        <p className="font-bold">Phone Number: <span className="font-normal">{phoneNumber}</span></p>
      </div>
      <div className="flex flex-col mt-4 space-y-2">
        <div>
          <h3 className="font-bold">Front Student Credential:</h3>
          <img src={`http://localhost:3000/admin/get-image/${passengerId}/passenger/frontStudentCredential`} alt="Front Student Credential" />
        </div>
        <div>
          <h3 className="font-bold">Back Student Credential:</h3>
          <img src={`http://localhost:3000/admin/get-image/${passengerId}/passenger/backStudentCredential`} alt="Back Student Credential" />
        </div>
      </div>
    </div>
  );
};

export default PassengerInfo;
