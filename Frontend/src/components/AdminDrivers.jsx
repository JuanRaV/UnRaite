import React from 'react';
import axiosClient from '../config/axiosClient';
const DriverInfo = ({ driver }) => {
  const { name, email, phoneNumber, driverId, frontDriversLicence, backDriversLicence, frontStudentCredential, backStudentCredential } = driver;


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
    </div>
  );
};

export default DriverInfo;
