import React, { useState } from 'react';
import axiosClient from '../config/axiosClient';
import Alert from './Alert';

const PassengerInfo = ({ passenger }) => {
  const { name, email, phoneNumber, passengerId, frontStudentCredential, backStudentCredential } = passenger;
  const [alert, setAlert] = useState({})
  const alertDisapears = () => {
    setTimeout(() => {
      setAlert({})
      window.location.reload()
    }, 3000)
  }
  const handleAccept = async () => {
    try {
      await axiosClient.post(`/admin/accept-user/${passengerId}/passenger`);
      // alert('Passenger accepted successfully.');
      // console.log("all good")
      setAlert({
        msg: "Passenger accepted successfully",
        error: false
      })
      alertDisapears()
    } catch (error) {
      console.error('Error accepting passenger:', error);
      // alert('Failed to accept passenger.');
      setAlert({
        msg: "Failed to accept passenger",
        error: true
      })
      alertDisapears()
    }
  };

  const handleDecline = async () => {
    try {
      await axiosClient.post(`/admin/decline-user/${passengerId}/passenger`);
      // alert('Passenger declined successfully.');
      setAlert({
        msg: "Passenger declined successfully",
        error: false
      })
      alertDisapears()
    } catch (error) {
      console.error('Error declining passenger:', error);
      // alert('Failed to decline passenger.');
      setAlert({
        msg: "Failed to declined passenger",
        error: true
      })
      alertDisapears()
    }
  };
  const { msg } = alert
  return (
    <>
      {msg && <Alert alert={alert} />}
      <div className="border-b p-5 flex flex-col justify-between">

        <div className="flex items-center gap-2 space-x-5 bg-white p-4 rounded-lg shadow-md">
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
    </>

  );
};

export default PassengerInfo;
