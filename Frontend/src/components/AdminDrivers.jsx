import React from 'react';
import axiosClient from '../config/axiosClient';

const DriverInfo = ({ driver }) => {
  const { name, email, phoneNumber, driverId } = driver;

  const handleAccept = async () => {
    try {
      await axiosClient.post(`/admin/accept-user/${driverId}/driver`)
      window.confirm('Driver accepted successfully.');
      
    } catch (error) {
      console.error('Error accepting driver:', error);
      alert('Failed to accept driver.');
    }
  };

  const handleDecline = async () => {
    try {
      await axiosClient.post(`/admin/decline-user/${driverId}/driver`);
      window.alert('Driver declined successfully.');
    } catch (error) {
      console.error('Error declining driver:', error);
      alert('Failed to decline driver.');
    }
  };

  return (
    <div className="border-b p-5 flex flex-col justify-between">
      <div className="flex items-center gap-2 space-x-5">
        <p className="font-bold">Name: <span className="font-normal">{name}</span></p>
        <p className="font-bold">Email: <span className="font-normal">{email}</span></p>
        <p className="font-bold">Phone Number: <span className="font-normal">{phoneNumber}</span></p>
      </div>
      <div className="flex flex-col mt-4 space-y-2">
        <div>
          <h3 className="font-bold">Front Student Credential:</h3>
          <img src={`http://localhost:3000/admin/get-image/${driverId}/driver/frontStudentCredential`} alt="Front Student Credential" />
        </div>
        <div>
          <h3 className="font-bold">Back Student Credential:</h3>
          <img src={`http://localhost:3000/admin/get-image/${driverId}/driver/backStudentCredential`} alt="Back Student Credential" />
        </div>
        <div>
          <h3 className="font-bold">Front Driver's Licence:</h3>
          <img src={`http://localhost:3000/admin/get-image/${driverId}/driver/frontDriversLicence`} alt="Front Driver's Licence" />
        </div>
        <div>
          <h3 className="font-bold">Back Driver's Licence:</h3>
          <img src={`http://localhost:3000/admin/get-image/${driverId}/driver/backDriversLicence`} alt="Back Driver's Licence" />
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <button className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-700" onClick={handleAccept}>Accept</button>
        <button className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-700" onClick={handleDecline}>Decline</button>
      </div>
    </div>
  );
};

export default DriverInfo;
