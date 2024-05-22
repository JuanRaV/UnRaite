import React from 'react';
import axiosClient from '../config/axiosClient';

const PassengerInfo = ({ passenger }) => {
  const { name, email, phoneNumber, passengerId, frontStudentCredential, backStudentCredential } = passenger;

  const handleAccept = async () => {
    try {
      await axiosClient.post(`/admin/accept-user/${passengerId}/passenger`);
      alert('Passenger accepted successfully.');
    } catch (error) {
      console.error('Error accepting passenger:', error);
      alert('Failed to accept passenger.');
    }
  };

  const handleDecline = async () => {
    try {
      await axiosClient.post(`/admin/decline-user/${passengerId}/passenger`);
      alert('Passenger declined successfully.');
    } catch (error) {
      console.error('Error declining passenger:', error);
      alert('Failed to decline passenger.');
    }
  };

  return (
<<<<<<< HEAD
    <div className="border-b p-5 flex flex-col flex-row justify-between">
      <div className="flex items-center gap-2 space-x-5">
=======
    <div className="border-b p-5 flex flex-col justify-between">
      <div className="flex items-center gap-2 space-x-5 bg-white p-4 rounded-lg shadow-md">
>>>>>>> 10b41b9ef64a8e7352787ff30b026bbde7d2b100
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
      <div className="flex justify-center mt-4">
        <button className="bg-green-500 text-white py-2 px-5 rounded-lg hover:bg-green-700 mr-5" onClick={handleAccept}>Accept</button>
        <button className="bg-red-500 text-white py-2 px-5 rounded-lg hover:bg-red-700" onClick={handleDecline}>Decline</button>
      </div>
    </div>
  );
};

export default PassengerInfo;
