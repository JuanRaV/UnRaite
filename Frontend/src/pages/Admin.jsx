import React, { useState, useEffect } from 'react';
import axiosClient from "../config/axiosClient"
import UserInfo from '../components/UserInfo';
import Header from '../components/HeaderAdmin';

const UserContainer = () => {
  const [drivers, setDrivers] = useState([]);
  const [passengers, setPassengers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDriver, setIsDriver] = useState(true);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await axiosClient.get('/admin/get-drivers');
        console.log(response.data)
        setDrivers(response.data);
      } catch (error) {
        console.error('Error fetching drivers:', error);
      }
    };

    const fetchPassengers = async () => {
      try {
        const response = await axiosClient.get('/admin/get-passengers');
        setPassengers(response.data);
      } catch (error) {
        console.error('Error fetching passengers:', error);
      }
    };

    fetchDrivers();
    fetchPassengers();
  }, []);

  const handleUserSelect = (user, raite) => {
    setSelectedUser(user);
    
  };

  const toggleUserType = () => {
    setIsDriver(!isDriver);
  };

  return (
    <>
    <Header/>
    <div>
      <button
        className='bg-blue-500 p-2 rounded-lg text-white hover:bg-blue-700 mb-4'
        onClick={toggleUserType}
      >
        {isDriver ? 'Show Passengers' : 'Show Drivers'}
      </button>

      <div>
        {isDriver ? (
          <div>
            <h2 className='text-blue-500 text-2xl'>Drivers List</h2>

            {drivers.map(driver => (
              <div className='cursor-pointer bg-gray-200 p-4 rounded-lg  hover:bg-gray-300 m-5' key={driver.driverId} onClick={() => handleUserSelect(driver, { id: driver.driverId })}>
                <p className="font-bold">Name: <span className="font-normal">{driver.name}</span></p>
                <p className="font-bold">Email: <span className="font-normal">{driver.email}</span></p>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <h2 className='text-blue-500 text-2xl'>Passengers List</h2>
            {passengers.map(passenger => (
              <div className='cursor-pointer bg-gray-200 p-4 rounded-lg  hover:bg-gray-300 m-5' key={passenger.passengerId} onClick={() => handleUserSelect(passenger, { id: passenger.passengerId })}>
                <p className="font-bold">Name: <span className="font-normal">{passenger.name}</span></p>
                <p className="font-bold">Email: <span className="font-normal"> {passenger.email}</span></p>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedUser && (
        <UserInfo
          userType={isDriver ? 'driver' : 'passenger'}
          user={selectedUser}
          
        />
      )}
    </div>
    </>
    
  );
};

export default UserContainer;
