import React, { useState, useEffect } from 'react';
import axiosClient from "../config/axiosClient"
import UserInfo from '../components/UserInfo';

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
            <h2>Drivers List</h2>
            {drivers.map(driver => (
              <div key={driver.driverId} onClick={() => handleUserSelect(driver, { id: driver.driverId })}>
                <p>Name: {driver.name}</p>
                <p>Email: {driver.email}</p>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <h2>Passengers List</h2>
            {passengers.map(passenger => (
              <div key={passenger.passengerId} onClick={() => handleUserSelect(passenger, { id: passenger.passengerId })}>
                <p>Name: {passenger.name}</p>
                <p>Email: {passenger.email}</p>
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
  );
};

export default UserContainer;
